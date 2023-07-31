import express from 'express';

let cors = require('cors');

// postgres://products_db_74rl_user:O4Bzs9v7kCIbO7uiiSJhcXIpLhC8ivWs@dpg-cj3lk8tiuie55plnr410-a.frankfurt-postgres.render.com/products_db_74rl

let products = require('./products.json');

const PORT = 5000;

const app = express();

app.use(cors());

app.get('/products', (request, response) => {
  response.send(products);
})

app.listen(PORT, () => {
  console.log(`API is ready on http://localhost:${PORT}`);
  })