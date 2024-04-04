process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const { send } = require("q");

const app = express();
const PORT = process.env.PORT || 3001;

// Define your three URLs
const urls =  [
    'https://e24.no', 
    'https://dn.no',
    'https://tiot.home.blog'
];

// Scrape data from each URL
async function scrapeData(url) {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        // Example: Extracting titles
        const pageTitle = $("title").text();
        console.log(`Title for ${url}: ${pageTitle}`);
    } catch (error) {
        console.error(`Error fetching data from ${url}: ${error.message}`);
    }
  

}


// Loop through URLs and scrape data
urls.forEach((url) => {
    scrapeData(url);
});


// Add a simple route for testing
//app.get("/test", (req, res) => {
//    res.send("Test route is working!");
//});


app.get('/printers', async (req, res) => {

    try {
    
        const printersFeed = await forEach()
        return res.send
        //return res.status(200).json({
        //    result: printersFeed,
        //})
    } catch (err) {
        return res.status(500).json({
            err: err.toString(),
        })
    }    
 })


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});