# Xerox AltaLink Printer Scraper

This project contains a Node.js script that functions as a web scraping service to gather consumable status from a list of Xerox AltaLink printers.

## Description

The `xerox-altalink.js` script starts a web server that, upon request, fetches the consumables status page from a predefined list of printer URLs. It then parses the HTML of these pages to extract data about supplies like toner, drums, and fusers, and returns this data as a JSON object.

This is useful for monitoring the status of multiple printers from a single point.

## Features

- **Web Scraper**: Scrapes data from Xerox AltaLink printer web interfaces.
- **API Server**: Provides a simple REST API endpoint to trigger the scraping process and retrieve the data.
- **Concurrent Scraping**: Fetches data from all printers concurrently for efficiency.
- **JSON Output**: Formats the scraped data into a structured JSON array.
- **Error Handling**: Includes basic error handling for network requests and ignores self-signed SSL certificate errors common on local network devices.

## Technologies Used

- **Node.js**: The runtime environment for the script.
- **Express.js**: A web framework used to create the API server.
- **Axios**: A promise-based HTTP client for making requests to the printers.
- **Cheerio**: A fast and flexible HTML parser for scraping the data from the printer webpages.

## Prerequisites

- [Node.js](https://nodejs.org/) installed on your system.
- [npm](https://www.npmjs.com/) (Node Package Manager), which comes with Node.js.

## Installation

1.  Clone or download the repository.
2.  Navigate to the project directory.
3.  Install the required dependencies by running:

    ```bash
    npm install express axios cheerio
    ```

## Usage

1.  **Configure Printer URLs**: Open the `xerox-altalink.js` file and modify the `urls` array to include the IP addresses or hostnames of your Xerox AltaLink printers.

    ```javascript
    const urls = [
        'https://your-printer-1/stat/consumables.php',
        'https://your-printer-2/stat/consumables.php',
        // Add more printers here
    ];
    ```

2.  **Run the Server**: Start the server by running the following command in your terminal:

    ```bash
    node xerox-altalink.js
    ```

    The server will start and listen on port 3001 by default. You should see the message: `Server running on port 3001`.

3.  **Fetch Printer Data**: To get the consumables data, make a GET request to the `/altalink` endpoint. You can do this using a web browser, `curl`, or any API client.

    ```bash
    curl http://localhost:3001/altalink
    ```

## API Endpoint

### `GET /altalink`

Triggers the scraping process and returns the consumables status for all configured printers.

-   **Success Response (200 OK)**:

    Returns a JSON object containing the results. The `result` key holds an array where each element is another array of objects representing the consumables for a single printer.

    **Example JSON Output:**
    ```json
    {
      "result": [
        [
          {
            "component": "Black Toner Cartridge",
            "status": "OK",
            "liferemaining": "91 %",
            "estpages": "39000",
            "estdays": "878",
            "printerurl": "https://Lev-print-C4/stat/consumables.php",
            "timestamp": 1678886400000
          },
          {
            "component": "Drum Cartridge",
            "status": "OK",
            "liferemaining": "95 %",
            "estpages": "110000",
            "estdays": "2500",
            "printerurl": "https://printer1/stat/consumables.php",
            "timestamp": 1678886400000
          }
        ],
        [
          {
            "component": "Black Toner Cartridge",
            "status": "OK",
            "liferemaining": "50 %",
            "estpages": "21000",
            "estdays": "400",
            "printerurl": "https://printer2/stat/consumables.php",
            "timestamp": 1678886400000
          }
        ]
      ]
    }
    ```

-   **Error Response (500 Internal Server Error)**:

    If an error occurs during the scraping process, the server will respond with a 500 status code and a JSON object containing the error message.
