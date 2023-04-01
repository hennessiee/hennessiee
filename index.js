// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date",function(req,res){
  let input = req.params.date;
  if(input.length=0){
    let unixTimestamp=Date.now()

    const todayDateObj = new Date();
    todayDateObj.toUTCString();
    res.json({unix:unixTimestamp,utc:todayDateObj})
  }
  // Check if input is a Unix timestamp (i.e., all digits)
  if (/^\d+$/.test(input)) {
    input = parseInt(input);
  }
  
  const dateObj = new Date(input);
  const unixTimestamp = Date.parse(dateObj);
  
  if (isNaN(unixTimestamp)) {
    res.json({ error: "Invalid Date" });
  } else {
    const utcDateString = dateObj.toUTCString();
    res.json({ unix: unixTimestamp, utc: utcDateString });
  }
});
// Add new route for empty date parameter
app.get("/api", function(req, res) {
  const todayUnixTimestamp = Date.now();
  const todayDateObj = new Date();
  const todayUTCString = todayDateObj.toUTCString();
  
  res.json({ unix: todayUnixTimestamp, utc: todayUTCString });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
