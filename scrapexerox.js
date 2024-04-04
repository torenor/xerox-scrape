const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express"); // Import express

const app = express();
const PORT = process.env.PORT || 3000;

// Define your three URLs
const urls = [
    'https://e24.no',
    'https://dn.no',
    'https://tiot.home.blog',
    'https://en.wikipedia.org/wiki/All-time_Olympic_Games_medal_table'
];

// Scrape data from each URL
async function scrapeData(url) {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        // Example: Extracting titles
        const pageTitle = $("title").text();
        return pageTitle; // Return the extracted data
    } catch (error) {
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
});