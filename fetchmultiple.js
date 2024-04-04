//kilde: https://stackoverflow.com/questions/64012652/fetch-an-array-of-urls-not-recieving-all-data
//const fetch = require('node-fetch');
//const jsdom = require("jsdom");
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
const cheerio = require("cheerio")
const express = require("express")
//const { JSDOM } = jsdom;
var chocolateList = [];
urlArray = ['https://158.38.104.4/stat/consumables.php', 'https://158.38.104.7/stat/consumables.php'];

urlArray.forEach((url) => {
    async function getFeed() {
             const response = await fetch(url)
             const data = await response.text()
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
                 coinObj['printer'] = url
                
                 coinArr.push(coinObj)
                 console.log(coinObj)
                 
             }
             //return coinArr
            }
         )
         
         return coinArr
        }
         //return coinArr
         //getFeed()
    }
    )
    //getFeed()
    //getFeed()


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


