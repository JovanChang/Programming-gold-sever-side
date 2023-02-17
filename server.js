//express template for routing
const express = require('express')
const app = express()

// Serve static files from the 'public' directory
app.use(express.static('client'));

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});

const fs = require('fs');
let pals = require('./Palindromes.json');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

app.post('/new', function (req, resp) {
  console.log('Got request');
  console.log(req.body);
  const palin = req.body.palin;
  const aboutp = req.body.aboutp;

  const pdrome = { 'name': palin,
                    'about': aboutp
                  };

  pals.push(pdrome);

fs.writeFile('./Palindromes.json', JSON.stringify(pals), function (err) {
  if (err) {
    console.log('Error writing file:', err);
    resp.status(500).send('Error writing file');
  } else {
    console.log('File written successfully');
    resp.send('Thanks for the palindrome');
  }
  });
});