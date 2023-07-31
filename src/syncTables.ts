import { Product } from "./models/Product.model";
import { initDB } from "./initDB"

let products = require('./products.json');

export const syncTables = async () => {
  initDB();
  
  await Product.sync({alter: true});

  console.log('Product Synced');
}

syncTables();