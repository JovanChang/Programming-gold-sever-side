/* eslint-disable quote-props */
// express template for routing
const express = require('express');
const app = express();

// use the path module in node.js
const path = require('path');

// Serve static files from the 'public' directory
app.use(express.static('client'));
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

// // Start the server
// app.listen(3000, () => {
//   console.log('Server started on port 3000');
// });

// adding new product into the webpage
const data = require('./products.json');

// using the post method to get request from the client to modify the json file
app.post('/new', function (req, resp) {
  console.log('Got request');
  console.log(req.body);
  const prodName = req.body.prodName;
  const itemType = req.body.type;
  const itemPrice = req.body.price;
  const imgDir = req.body.imgDir;

  const newId = Math.max(...data.map(item => item.id)) + 1;

  const json = {
    'id': newId,
    'name': prodName,
    'type': itemType,
    'price': itemPrice,
    'image': imgDir
  };

  data.push(json);
  console.log('request done');
  resp.send(json);
});
const orders = [];
app.post('/orders', (req, resp) => {
    const newOrders = req.body;
    console.log(newOrders);
    orders.push(newOrders);
    resp.json(orders);
});

app.get('/getorders', (req, resp) => {
    resp.json(orders);
});
// search/filter list function

const fullpath = path.join(__dirname, 'index.html');

app.get('/', (req, res) => {
  res.sendFile(fullpath);
});

app.get('/search', (req, res) => {
  const query = req.query.q.toLowerCase();
  const filteredData = data.filter(item => {
    const name = item.name.toLowerCase();
    const type = item.type.toLowerCase();
    return name.includes(query) || type.includes(query);
  });
  res.json(filteredData);
});

module.exports = app;
