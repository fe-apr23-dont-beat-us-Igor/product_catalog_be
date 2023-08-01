import express from 'express';
import { initDB } from './initDB';
const { QueryTypes } = require('sequelize');

import sequelize from 'sequelize-typescript';
import { Product } from './models/Product.model';
import { models } from './models';

let cors = require('cors');

// postgres://products_db_74rl_user:O4Bzs9v7kCIbO7uiiSJhcXIpLhC8ivWs@dpg-cj3lk8tiuie55plnr410-a.frankfurt-postgres.render.com/products_db_74rl

const serverInit = async () => {
  const PORT = 5000;

  const app = express();

  app.use(cors());

  const sequelize = initDB();

  const res = await sequelize.authenticate();

  const { QueryTypes } = require('sequelize');
  const products = await sequelize.query('SELECT * FROM products', {
    type: QueryTypes.SELECT,
  });

  app.get('/products', (request, response) => {
    response.send(products);
  });

  app.listen(PORT, () => {
    console.log(`API is ready on http://localhost:${PORT}`);
  });
};

serverInit();
