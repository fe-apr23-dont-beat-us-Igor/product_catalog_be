import express from 'express';

let products = require('./products.json')

const PORT = 5000;

const app = express();

app.get('/products', (request, response) => {
  response.send(products);
})

app.listen(PORT, () => {
  console.log(`API is ready on http://localhost:${PORT}`);
  })