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
  

  app.get('/products',express.json(), async (request, response) => {
    const products = await Product.findAll();

    const { page, itemsOnPage } = request.body;

    if (!page || !itemsOnPage) {
      response.send(products);
      return;
    }
    
    let i = 0;

    let paginatedProducts = [];

    while (i <= products.length) {
      let arr = [];
      for (let k = 0; k <= itemsOnPage; k++) {
        if (i === products.length) {
          break;
        }
        arr.push(i);
        i++;
      }
      paginatedProducts.push(arr);
    }
    
    response.send(paginatedProducts[page - 1]);
  });

  app.listen(PORT, () => {
    console.log(`API is ready on http://localhost:${PORT}`);
  });
};

serverInit();
