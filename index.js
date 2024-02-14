const axios = require('axios');
const http = require('http');
const cron = require('node-cron');
const port = process.env.PORT || 7860;
const moment = require('moment-timezone');

//Add the URL array for 24-hour access
const urls = [
   'https://www.baidu.com', // You can enter a name here, for example: glitch
   'https://www.yahoo.com', // You can note the name here, for example: glitch
   'https://www.baidu.com', // You can enter a name here, for example: glitch
   'https://www.yahoo.com', // You can note the name here, for example: glitch
   'https://www.baidu.com', // You can enter a name here, for example: glitch
   'https://www.yahoo.com', // You can note the name here, for example: glitch
   'https://www.baidu.com', // You can enter a name here, for example: glitch
   'https://www.yahoo.com', // You can note the name here, for example: glitch
   //Add more URLs that can be accessed 24 hours a day
];

//Add an array of URLs that are suspended from 01:00 to 05:00 and accessed normally at other times
function visitWebsites() {
   const websites = [
     'https://www.google.com', // You can note the name here, for example: Back4app
     'https://www.google.com', // You can note the name here, for example: Back4app
     'https://www.google.com', // You can note the name here, for example: Back4app
     'https://www.google.com' // You can note the name here, for example: Back4app, there is no comma after the last url
     //Add more URLs accessed at a specified time
   ];

  // Traverse the web page array and send the request
   websites.forEach(async (url) => {
     try {
       const response = await axios.get(url);
       console.log(`${moment().tz('Asia/Karachi').format('YYYY-MM-DD HH:mm:ss')} Visited web successfully: ${url} - Status code: ${ response.status}\n`);
     } catch (error) {
       console.error(`Error visiting ${url}: ${error.message}\n`);
     }
   });
}

// Check and set the timer
function checkAndSetTimer() {
   const currentMoment = moment().tz('Asia/Karachi');
   const formattedTime = currentMoment.format('YYYY-MM-DD HH:mm:ss');
   if (currentMoment.hours() >= 1 && currentMoment.hours() < 5) {
     console.log(`Stop visit from 1:00 to 5:00 --- ${moment().tz('Asia/Karachi').format('YYYY-MM-DD HH:mm:ss')}` );
     clearInterval(visitIntervalId); // Clear timer
     const nextVisitTime = moment().tz('Asia/Karachi').add(0, 'day').hours(5).minutes(0).seconds(0);
     const nextVisitInterval = nextVisitTime.diff(currentMoment);
     setTimeout(() => {
       startVisits();
     }, nextVisitInterval);
   } else {
     startVisits();
   }
}

let visitIntervalId;
function startVisits() {
   clearInterval(visitIntervalId);
// visitWebsites();
   visitIntervalId = setInterval(() => {
     visitWebsites();
   }, 2 * 60 * 1000); // Perform an access every 2 minutes
}

function runScript() {
   const runScriptIntervalId = setInterval(() => {
     //console.log('Running script');
     checkAndSetTimer();
   }, 2 * 60 * 1000); // Check every 2 minutes
}
checkAndSetTimer();
runScript();

// 24 hours uninterrupted access
async function scrapeAndLog(url) {
   try {
     const response = await axios.get(url);
     console.log(`${moment().tz('Asia/Karachi').format('YYYY-MM-DD HH:mm:ss')} Web visited Successfully: ${url} - Status code: ${ response.status}\n`);
   } catch (error) {
     console.error(`${moment().tz('Asia/Karachi').format('YYYY-MM-DD HH:mm:ss')}: Web visited Error: ${url}: ${error. message}\n`);
   }
}
//Access every 2 minutes
cron.schedule('*/2 * * * *', () => {
   console.log('Running webpage access...');
   urls.forEach((url) => {
     scrapeAndLog(url);
   });
});

//Create HTTP service
const server = http.createServer((req, res) => {
   if (req.url === '/') {
     res.writeHead(200, {'Content-Type': 'text/plain'});
     res.end('Hello, World!\n');
   } else {
     res.writeHead(404, {'Content-Type': 'text/plain'});
     res.end('Not Found\n');
   }
});

server.listen(port, () => {
   console.log(`Server is running on port:${port}`);
});
