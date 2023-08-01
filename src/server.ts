import express from 'express';
import { initDB } from './initDB';
const { QueryTypes } = require('sequelize');

import sequelize from 'sequelize-typescript';
import { Product } from './models/Product.model';
import { models } from './models';

let cors = require('cors');

// postgres://products_db_74rl_user:O4Bzs9v7kCIbO7uiiSJhcXIpLhC8ivWs@dpg-cj3lk8tiuie55plnr410-a.frankfurt-postgres.render.com/products_db_74rl

function sliceIntoChunks(arr: any, chunkSize: number) {
  const res = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      res.push(chunk);
  }
  return res;
}

const serverInit = async () => {
  const PORT = 5000;

  const app = express();

  app.use(cors());

  app.use(express.json())

  const sequelize = initDB();

  const res = await sequelize.authenticate();
  

  app.post('/products' , async (request, response) => {
    const products = await Product.findAll();

    const { page, itemsOnPage } = request.body;

    let paginatedProducts = sliceIntoChunks(products, itemsOnPage);
    
    response.send(request.body);
  });

  app.listen(PORT, () => {
    console.log(`API is ready on http://localhost:${PORT}`);
  });
};

serverInit();
