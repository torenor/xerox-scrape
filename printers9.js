// kilde: https://www.youtube.com/watch?v=5YCuUCRS_Ks

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
//const axios = require('axios')
const express = require("express");
//const app = express();
//const port = process.env.PORT || 5000;
const cheerio = require("cheerio")
const fs = require("fs");
const siteUrl = "https://158.38.104.4/stat/consumables.php"
//cont .17 
// lev-print-a104a.ad.nord.no, lev-print-b112.ad.nord.no, lev-print-b262.ad.nord.no, lev-print-c1122.ad.nord.no
// lev-print-c4-353.ad.nord.no

//const siteURL = ["https://158.38.104.4/stat/consumables.php", "https://158.38.104.7/stat/consumables.php"];

//for (var i = 0; i < siteURL.length; i++) {
async function getFeed() {
   /* try {
        const siteUrl = "https://158.38.104.16/stat/consumables.php"
        const {data} = await axios({
            method: "GET",
            url: siteUrl,
        })
*/
        const response = await fetch(siteUrl)
        const data = await response.text()
        //const $ = cheerio.load(fs.readFileSync('./printerhtml.html'))
        const $ = cheerio.load(data)
        $('script').remove()
        $('table > tbody > tr.header').remove()
                const elemSelector = 'body > div.mainContentNoSideBar > div > div.tableBody > table > tbody > tr'
                //                    body > div.mainContentNoSideBar > div:nth-child(2) > div.tableBody > table > tbody > tr
               
      
        const keys = [
            
           
            'komponent',
            'status',
            'brukstid_igjen',
            'est_sider',
            'est_dager',
            'printer'

        ]

        const coinArr = []

        $(elemSelector).each((parentIdx, parentElem) => {
            let keyIdx = 0
            //keyIdx[0] = siteUrl
            const coinObj = {}
            if (parentIdx <= 9) {
                $(parentElem).children().each((childIdx, childElem) => {
                    const tdValue = $(childElem).text().trim()
                    if (tdValue){
                        //console.log(tdValue)
                        coinObj[keys[keyIdx]] = tdValue
                        keyIdx++
                        
                       }
                    
                }
                )
            coinObj['printer'] = siteUrl
            console.log(coinObj)
            coinArr.push(coinObj)
            
        }
    })
    return coinArr
    //console.log(coinArr)
    // catch kommer som følge av try i toppen av funksjonen
    //} catch (err) {
    //    console.error(err)
    }
    
//}

   getFeed()

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


