import express from 'express';
import { initDB } from './initDB';

import sequelize from 'sequelize-typescript';
import { Product } from './models/Product.model';

let cors = require('cors');

// postgres://products_db_74rl_user:O4Bzs9v7kCIbO7uiiSJhcXIpLhC8ivWs@dpg-cj3lk8tiuie55plnr410-a.frankfurt-postgres.render.com/products_db_74rl

const serverInit = async () => {
  const PORT = 5000;

  const app = express();

  app.use(cors());

  const sequelize = initDB();

  const products = await Product.findAll();

  const res = await sequelize.authenticate();

  app.get('/products', (request, response) => {
    response.send(products);
  });

  app.listen(PORT, () => {
    console.log(`API is ready on http://localhost:${PORT}`);
  });
}

serverInit();