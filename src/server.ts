import express from 'express';
import { initDB } from './initDB';
import { sliceIntoChunks } from './helpers/sliceIntoChunks';

import { ProductService } from './services/product.service';

let cors = require('cors');

// postgres://products_db_74rl_user:O4Bzs9v7kCIbO7uiiSJhcXIpLhC8ivWs@dpg-cj3lk8tiuie55plnr410-a.frankfurt-postgres.render.com/products_db_74rl

const serverInit = async () => {
  const PORT = 5000;

  const app = express();

  app.use(cors());

  app.use(express.json())

  const sequelize = initDB();

  const res = await sequelize.authenticate();
  

  app.post('/products' , async (request, response) => {
    const productService = new ProductService()
    
    const products = await productService.getAll();

    const { page, itemsOnPage } = request.body;

    let paginatedProducts = sliceIntoChunks(products, itemsOnPage);
    
    response.send(paginatedProducts[page - 1]);
  });

  app.listen(PORT, () => {
    console.log(`API is ready on http://localhost:${PORT}`);
  });
};

serverInit();
