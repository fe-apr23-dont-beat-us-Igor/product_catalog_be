import express from 'express';
import { initDB } from './initDB';

let cors = require('cors');

// postgres://products_db_74rl_user:O4Bzs9v7kCIbO7uiiSJhcXIpLhC8ivWs@dpg-cj3lk8tiuie55plnr410-a.frankfurt-postgres.render.com/products_db_74rl

const serverInit = async () => {
  let products = require('./products.json');

  products = products.map((product: { name: any; capacity: any; priceRegular: any; priceDiscount: any; images: any; screen: any; ram: any; }) => {
    const {
      name,
      capacity,
      priceRegular,
      priceDiscount,
      screen,
      ram,
    } = product;
    
    return {
      name,
      capacity,
      priceRegular,
      priceDiscount,
      screen,
      ram,
    }
  });

  const PORT = 5000;

  const app = express();

  app.use(cors());

  const sequelize = initDB();

  const res = await sequelize.authenticate();

  app.get('/products', (request, response) => {
    response.send(products);
  });

  app.listen(PORT, () => {
    console.log(`API is ready on http://localhost:${PORT}`);
  });
}

serverInit();