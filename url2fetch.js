process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

//kilde: https://www.geeksforgeeks.org/how-to-fetch-an-array-of-urls-with-promise-all/

const urlsToFetch = [
    'http://localhost:3000',
    'http://localhost:3000',
    ];
    
    // ***************  PARALELL   ***************
    // Function to fetch all of the URLs in parallel
    const fetchURLs = async (urls) => {
        try {
            const promises =
                urls.map(url => fetch(url));
    
            // Wait for all of the promises to resolve
            const responses =
                await Promise.all(promises);
    
            // Extract JSON data from responses
            const data = await
                //Promise.all(responses.map(response => response.json()));
                Promise.all(responses.map(response => response.json()));
    
            return data}
        catch (error) {
            throw new Error(`Failed to fetch data: ${error}`)}}
    
    fetchURLs(urlsToFetch)
        .then(data => {
            console.log('Fetched data:', data)})
        .catch(error => {
            console.error('Error fetching data:', error)});
    