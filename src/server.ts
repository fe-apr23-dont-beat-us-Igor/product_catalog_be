import express from 'express';
import { initDB } from './initDB';
import { sliceIntoChunks } from './helpers/sliceIntoChunks';
const { Op } = require("sequelize");

import { ProductService } from './services/product.service';
import { getAllProductsController, getProductById } from './controllers/product.controllers';
import { Product } from './models/Product.model';

let cors = require('cors');

// postgres://products_db_74rl_user:O4Bzs9v7kCIbO7uiiSJhcXIpLhC8ivWs@dpg-cj3lk8tiuie55plnr410-a.frankfurt-postgres.render.com/products_db_74rl

const serverInit = async () => {
  const PORT = 5000;

  const app = express();

  app.use(cors());

  app.use(express.json())

  const sequelize = initDB();

  const res = await sequelize.authenticate();


  app.get('/products', getAllProductsController);

  app.get('/products/new', async (req, res) => {
    let prods = await Product.findAll({
      where: {
        [Op.or]: [
          { year: 2023 },
          { year: 2022 },
          { year: 2021 },
        ]
      }
    });

    res.send(prods);
  });
  
  app.get('/products/:id', getProductById);

  app.get('/images/:link', function (req, res) {
    let link = req.params.link;

    res.sendFile(link, { root: './src/images' });
  });

  app.listen(PORT, () => {
    console.log(`API is ready on http://localhost:${PORT}`);
  });
};

serverInit();
