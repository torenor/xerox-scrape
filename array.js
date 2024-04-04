process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
const requestPromise = require('request-promise');
const Promise = require('bluebird');
const cheerio = require('cheerio');
const express = require("express")
const fs = require("fs");
//const printerFeed = ''

//const urls = ['http://google.be', 'http://biiinge.konbini.com/series/au-dela-des-murs-serie-herve-hadmar-marc-herpoux-critique/?src=konbini_home']
const urls = ['https://158.38.104.4/stat/consumables.php', 'https://158.38.104.7/stat/consumables.php'];


async function getFeed() {
Promise.map(urls, requestPromise)
  .map((htmlOnePage, index) => {
    const $ = cheerio.load(htmlOnePage);
    $('script').remove()
    $('table > tbody > tr.header').remove()
    const share = $('body > div.mainContentNoSideBar > div > div.tableBody > table > tbody > tr').html();
    const elemSelector = 'body > div.mainContentNoSideBar > div > div.tableBody > table > tbody > tr'
    const keys = [
            
           
        'komponent',
        'status',
        'brukstid_igjen',
        'est_sider',
        'est_dager',
        'printer',
        'TimeStamp'

    ]

    const printerArr = []

    $(elemSelector).each((parentIdx, parentElem) => {
        let keyIdx = 0
        //keyIdx[0] = siteUrl
        const printerObj = {}
        if (parentIdx <= 9) {
            $(parentElem).children().each((childIdx, childElem) => {
                const tdValue = $(childElem).text().trim()
                if (tdValue){
                    //console.log(tdValue)
                    printerObj[keys[keyIdx]] = tdValue
                    keyIdx++
                    
                   }
                
            }
            )
       
        //add URL and timestamp to output array
        
        printerObj['printer'] = urls[index]
        printerObj['Tmestamp'] = Date.now()
        printerArr.push(printerObj) 
        
    }
})

    
//console.log(result)    
//global.printerRes = printerArr

      
 
    
  } 
  )
 
  //.then(console.log)
 .then(console.log)
 

  
  .catch((e) => console.log('hmmm an error' + e));
 //return(console.log) 
 // Logs countries array to the console
//console.dir(printerArr);
  
}


//getFeed()
  // server settings

const app = express()

app.get('/printers', async (req, res) => {
    //console.log(res)

    try {

        
        const printersFeed = await getFeed()
        //return res.send
        return res.json({
            result: global.printres,
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
