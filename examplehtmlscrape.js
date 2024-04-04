// kilde: https://www.scrapingbee.com/webscraping-questions/cheerio/how-to-scrape-tables-with-cheerio/
const cheerio = require('cheerio');
const fs = require("fs");
const html = `
  <table>
    <tr>
      <th>Name</th>
      <th>Age</th>
      <th>Occupation</th>
    </tr>
    <tr>
      <td>Yasoob</td>
      <td>35</td>
      <td>Software Engineer</td>
    </tr>
    <tr>
      <td>Pierre</td>
      <td>28</td>
      <td>Product Manager</td>
    </tr>
  </table>
  `;

// Load the HTML content into a Cheerio object
//const $ = cheerio.load(html);
const $ = cheerio.load(fs.readFileSync('./printerhtml.html'))
$('script').remove()

// Select the table element
//const table = $('table');
const table = $("body > div.mainContentNoSideBar > div:nth-child(2) > div.tableBody > table > tbody")

// Initialize an empty array to store the table data
const tableData = [];

// Iterate over each row of the table using the find and each methods
table.find('tr').each((i, row) => {
    // Initialize an empty object to store the row data
    const rowData = {};

    // Iterate over each cell of the row using the find and each methods
    $(row).find('td, th').each((j, cell) => {
        // Add the cell data to the row data object
        rowData[$(cell).text()] = j;
    });

    // Add the row data to the table data array
    tableData.push(rowData);
});

// Print the table data
console.log(tableData);
