//express template for routing
const express = require('express')
const app = express()

// Serve static files from the 'public' directory
app.use(express.static('client'));

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});


//adding new product into the webpage
const fs = require('fs');
const data = require('./products.json');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));


//using the post method to get request from the client to modify the json file
app.post('/new', function (req, resp) {
  console.log('Got request');
  console.log(req.body);
  const prod_name = req.body.prod_name;
  const type = req.body.type;
  const price = req.body.price;
  const img_dir = req.body.img_dir;

  const new_id = Math.max(...data.map(item => item.id)) + 1;

  const json = { "id": new_id,
      "name": prod_name,
      "type": type,
      "price": price,
      "image": img_dir
                  };

  data.push(json);
  console.log("request done")
  resp.send("Successfully added the new product!")
 });


//search/filter list function
const e = require('express');

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