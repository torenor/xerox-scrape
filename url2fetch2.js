const urlsToFetch = [
    'http://localhost:3000',
    'http://localhost:3000',
];

// *****************************  ITERATION *****************************
// that array an in each iteration we are initiating an HTTP request and storing response into fetchPromises.
const fetchPromises = urlsToFetch.map(url => 
	fetch(url)
		.then(response => response.json())
);

Promise.all(fetchPromises)
	.then(responses => {
		const responseData = responses.map(response => response);
		console.log('Fetched data:', responseData);
	})
	.catch(error => console.error('Error fetching data:', error));
