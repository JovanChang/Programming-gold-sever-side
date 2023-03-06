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

const data = require('./products.json');

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/search', (req, res) => {
  const query = req.query.q.toLowerCase().trim();
  const filteredData = data.filter(item => {
    const name = item.name.toLowerCase();
    const type = item.type.toLowerCase();
    return name.includes(query) || type.includes(query);
  });
  res.json(filteredData);
});