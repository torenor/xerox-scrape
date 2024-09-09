Web-scraping for Xerox printers
====================================================
see more info at: https://tiot.home.blog/2024/08/13/xerox-printer-webscrape-toner-status/

Models Xerox AltaLink:
- xerox-altalink.js
- localhost:3001/altalink


Models XEROX WorkCentre:
- xerox-workcentre.js
- localhost:3002/workcentre

Install:
npm install

to add more printers, update this section in the .js files:
// Define your three URLs
const urls = [
    'https://printer1/stat/consumables.php', 
    'https://printer2/stat/consumables.php',
    'https://anotherprinter/stat/consumables.php'
    
 

]

node-red flow
====================================================
The node-red flow use Dashboard 2.0 template node to present data in a table


SQL
====================================================
create table:

create table if not exists printerdata (
   id integer primary key autoincrement NOT NULL,
   component TEXT,
   status TEXT,
   liferemaining INTEGER,
   estpages INTEGER,
   estdays INTEGER,
   printerurl TEXT,
   epoch INTEGER,
   timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   ts TIMESTAMP DEFAULT (DATETIME('now')),
   ts2 integer(4) not null default (strftime('%s','now'))


);

Info: There are 4 columns for timestamp, that was created for test.



[Latest values for a printer]
msg.topic = "select MAX(timestamp), printerurl, component, estdays, status, liferemaining, estdays, estpages from printerdata group by printerurl, component";
return msg;

[First and last timestamp for a printer]
select printerurl, MIN(timestamp) as mintime, MAX(timestamp) as maxtime from printerdata group by printerurl;





JSONata
====================================================
Remove '%' from field liferemaining so that field can be an integer
payload.*. {
    "component": component,
    "status": status,
    "liferemaining": $replace(liferemaining,  /[^0-9]/,""),
    "estpages": estpages,
    "estdays": estdays,
    "printerurl": printerurl,
    "timestamp": timestamp
    
}


Query data by thresholds, such as:
payload.${
    "liferemainingcount":$count($[liferemaining < 10]),
    "estpagescount": $count($[estpages < 3000]),
    "estdayscount": $count($[estdays < 14]),
    "errorcount": $count($[status = "ERROR" ]),
    "reordercount" :$count($[status = "Reorder" ])
}



