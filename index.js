const cheerio = require("cheerio")
const fs = require("fs")
const url = "https://books.toscrape.com/catalogue/category/books/historical-fiction_4/index.html"

/*async function getGenre(){
    try {
        const response = await fetch(url)
        const data = await response.text()
        
        const $ = cheerio.load(data)

        const genre = $("h1").text()
        console.log(genre)
    } catch (error) {
        console.error(error)
    }
}



getGenre() */

const books_data = []

async function getBooks() {
    const response = await fetch(url)
    const data = await response.text()
    const $ = cheerio.load(data)

    const books = $("article")
    books.each(function() {
        printer = url
        title = $(this).find("h3 a").text()
        price = $(this).find(".price_color").text()

        books_data.push({url, title, price})
              
    })



    console.log(books_data)
  
    // converting the JSON object to a string
    //const mydata = books_data;

    // writing the JSON string content to a file
    //fs.writeFile("mydata.json"), mydata, (error) => {
    // throwing the error
    // in case of a writing problem
    //    if (error) {
            // logging the error
    //        console.error(error);

    //        throw error;
    //    }

    //    console.log("mydata.json written correctly");

    //}

    const { writeFile } = require('fs');

    const path = './config.json';
    const config =  books_data //{ ip: '192.0.2.1', port: 3000 };

    writeFile(path, JSON.stringify(config, null, 2), (error) => {
    if (error) {
        console.log('An error has occurred ', error);
        return;
    }
    console.log('Data written successfully to disk');
    });
}

  
getBooks()