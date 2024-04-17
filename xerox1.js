process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express"); // Import express

const app = express();
const PORT = process.env.PORT || 3000;

// Define your three URLs
const urls = [
    'https://Lev-print-C4/stat/consumables.php', 
    'https://158.38.104.7/stat/consumables.php', 
    'https://Lev-print-B112/stat/consumables.php',
    'https://Lev-print-B262/stat/consumables.php',
     'https://Lev-print-C4-353/stat/consumables.php',
    'https://Lev-print-G2222/stat/consumables.php',
    'https://Lev-print-G3117/stat/consumables.php',
    'https://Lev-print-pav3/stat/consumables.php',
    'https://Lev-print-G3217/stat/consumables.php',
    'https://158.38.104.3/stat/consumables.php',
    'https://Lev-print-A104A/stat/consumables.php'
    


   

]


// Scrape data from each URL
async function scrapeData(url) {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        // Example: Extracting titles
        //const pageTitle = $("title").text();
        //return pageTitle; // Return the extracted data

        $('script').remove()
        $('table > tbody > tr.header').remove()
        const elemSelector = 'body > div.mainContentNoSideBar > div > div.tableBody > table > tbody > tr'
        //                    body > div.mainContentNoSideBar > div:nth-child(2) > div.tableBody > table > tbody > tr

        const keys = [

            'component',
            'status',
            'liferemaining',
            'estpages',
            'estdays',
            'printerurl'
            //'Timestamp' - settes inn av DB

        ]

        const printerArr = []

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
                }
               
                printerObj['printerurl'] = url
                printerObj['timestamp'] = Date.now()
                printerArr.push(printerObj)
            }   
        )
                //print to console
                //console.log(printerArr)
                return printerArr

    } 
    catch (error) {
        console.error(`Error fetching data from ${url}: ${error.message}`);
        return null; // Return null or handle the error
    }

}
 

// Loop through URLs and scrape data
app.get('/printers', async (req, res) => {
    try {
        const scrapedTitles = await Promise.all(urls.map(scrapeData));
        // scrapedTitles now contains an array of titles from each URL
        res.status(200).json({ result: scrapedTitles });
    } catch (err) {
        res.status(500).json({ error: err.toString() });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})