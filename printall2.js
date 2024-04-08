
// sjekk: https://stackoverflow.com/questions/39649237/node-js-web-scraping-with-loop-on-array-of-urls
// https://stackoverflow.com/questions/39649237/node-js-web-scraping-with-loop-on-array-of-urls
//
// accept selft-signed certificate etc.
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
const cheerio = require("cheerio")
const express = require("express")



async function loopPrinters() {
    // Xerox® AltaLink® C8055
    //web-scraping stat/consumables.php pages for printer status
    const urlArray = ['https://158.38.104.4/stat/consumables.php', 'https://158.38.104.7/stat/consumables.php'];
    //const urlArray = ['https://158.38.104.4/stat/consumables.php'];

    url = urlArray
    const response = await fetch(url)
    const data = await response.text()
    const printerArr = []

    urlArray.forEach((url) => {
        const $ = cheerio.load(data)
        $('script').remove()
        $('table > tbody > tr.header').remove()
        const elemSelector = 'body > div.mainContentNoSideBar > div > div.tableBody > table > tbody > tr'
        //                    body > div.mainContentNoSideBar > div:nth-child(2) > div.tableBody > table > tbody > tr

        const keys = [

            'Component',
            'Status',
            'Life_Remaining',
            'Est_pages',
            'Est_days',
            'Printer_url',
            'Timestamp'

        ]



        $(elemSelector).each((parentIdx, parentElem) => {
            let keyIdx = 0
            //keyIdx[0] = siteUrl
            const printerObj = {}
            if (parentIdx <= 9) {
                $(parentElem).children().each((childIdx, childElem) => {
                    const tdValue = $(childElem).text().trim()
                    if (tdValue) {
                        //console.log(tdValue)
                        printerObj[keys[keyIdx]] = tdValue
                        keyIdx++

                    }
                }
                )
                printerObj['printer'] = url
                printerObj['timestamp'] = Date.now()
                printerArr.push(printerObj)
                //print to console
                //console.log(printerArr)

            }

        })

    })
   return printerArr
   console.log(printerArr)
    //return response.data
}



const getFeed = async () => {

    try {

        var res = await loopPrinters();
        console.log("Result" + res)
    } catch (err) {
        console.log(err);
    }
    return res
}


// server settings

const app = express()

app.get('/printers', async (req, res) => {

    try {

        const printersFeed = await getFeed()
        return res.status(200).json({
            result: printersFeed,
        })
    } catch (err) {
        return res.status(500).json({
            err: err.toString(),
        })
    }
})


app.listen(3001, () => {
    console.log("running server");
})

//test
