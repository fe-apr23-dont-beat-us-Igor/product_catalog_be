import { Product } from "./models/Product.model";
import { initDB } from "./initDB"
import { Optional } from "sequelize";

let products = require('./products.json');

export const syncTables = async () => {
  let products = require('./products.json');

  products = products.map((product: { name: any; capacity: any; priceRegular: any; priceDiscount: any; screen: any; ram: any; }) => {
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

  initDB();

  await Product.sync({ alter: true });

  await Promise.all(products.map((product: { name: any; capacity: any; priceRegular: any; priceDiscount: any; screen: any; ram: any; }) => Product.create(product)));


  console.log('Product Synced');
}

syncTables();