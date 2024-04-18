process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
const cheerio = require("cheerio")
const fs = require("fs");
const { getDefaultHighWaterMark } = require("stream");
const url = "testp"




// npm set strict-ssl false



const books_data = []

async function getBooks() {
    
    const $ = cheerio.load(fs.readFileSync('./Supplies.html'))
    $('script').remove()
    const books = $("table")
   
    books.each(function() {
     
        all  = $(this).find("table.tableDiv tr td").text()
        //trommelstatusodd = trommelstatusodd.replace(/[\n\t\r]/g,"")
        //even  = $(this).find("table.tableDiv tr td").text().trim()
        

        books_data.push({url, all})
              
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

   /*
    const { writeFile } = require('fs');

    const path = './printers.json';
    const config =  books_data //{ ip: '192.0.2.1', port: 3000 };

    writeFile(path, JSON.stringify(config, null, 2), (error) => {
    if (error) {
        console.log('An error has occurred ', error);
        return;
    }
    console.log('Data written successfully to disk');
    }); */
}

  
getBooks()