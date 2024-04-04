process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
const requests = require('request');
var Q = require('q');

//... where ever your function is
//start with an array of string urls
var urls = [ 'https://158.38.104.4/stat/consumables.php', 'https://158.38.104.7/stat/consumables.php'];

//store results in this array in the form:
//  { 
//       url: url, 
//       promise: <will be resolved when its done>, 
//       share:'code that you wanted'
//    }
var results = [];

//loop over each url and perform the request
urls.forEach(processUrl);

function processUrl(url) {
  //we use deferred object so we can know when the request is done
  var deferred = Q.defer();

  //create a new result object and add it to results
  var result = {
    url: url,
    promise: deferred.promise
  };
  results.push(result);
  console.log(result)


  //perform the request
  fetch(url, function (error, response, body) {
      if (!error) {
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
                console.log(printerArr)

            }

        })
 
        result.share = share;
        console.log(share)
      } else {

        //request failed, reject the promise to abort the chain and fall into the "catch" block
        deferred.reject(error)
        console.log("We've encountered an error: " + error);
      }
  });
}

//results.map, converts the "array" to just promises
//Q.all takes in an array of promises
//when they are all done it rull call your then/catch block.
Q.all(results.map(function(i){i.promise}))
    .then(sendResponse) //when all promises are done it calls this
    .catch(sendError);  //if any promise fails it calls this

 function sendError(error){
   res.status(500).json({failed: error});
 }
 function sendResponse(data){ //data = response from every resolve call
  //process results and convert to your response
  return res.send(results);
  console.log(result)
}