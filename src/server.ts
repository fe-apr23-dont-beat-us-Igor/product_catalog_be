import express from 'express';
import { initDB } from './initDB';
import { sliceIntoChunks } from './helpers/sliceIntoChunks';
const { Op } = require("sequelize");
import { ProductService } from './services/product.service';
import { getAllProductsController, getProductById } from './controllers/product.controllers';
import { Product } from './models/Product.model';

let cors = require('cors');

const availableSortBy = ['name', 'fullPrice', 'year'];
const availableCategories = ['phones', 'tablets', 'accessories']
const availableOrder = ['ASC', 'DESC', 'asc', 'desc'];

// postgres://products_db_74rl_user:O4Bzs9v7kCIbO7uiiSJhcXIpLhC8ivWs@dpg-cj3lk8tiuie55plnr410-a.frankfurt-postgres.render.com/products_db_74rl

const serverInit = async () => {
  const PORT = 5000;

  const app = express();

  app.use(cors());

  app.use(express.json())

  const sequelize = initDB();

  const res = await sequelize.authenticate();


  app.get('/products', getAllProductsController);

  app.get('/products/new', getAllProductsController);
  
  app.get('/products/:id', getProductById);

  app.get('/images/:link', function (req, res) {
    let link = req.params.link;

    res.sendFile(link, { root: './src/images' });
  });

  app.get('/info', async (req, res) => {
    const phones = await Product.count({
      where: {
        category: "phones"
      }
    });

    const tablets = await Product.count({
      where: {
        category: "tablets"
      }
    });

    const accessories = await Product.count({
      where: {
        category: "accessories"
      }
    });

    let result = {
      tablets,
      phones,
      accessories,
    }

    res.send(result);
  });

  app.post('/cart-items', async (req, res) => {
    let { ids } = req.body;

    let result = [];
    
    
    for (let id of ids) {
      let prod = await Product.findOne({
        where: {
          itemId: id
        },
        attributes: ['name' , 'image_catalog', 'capacity', 'ram', 'screen', 'fullPrice', 'price', 'category', 'itemId']
      })
    
      result.push(prod);
    }

    res.send(result);
  });

  app.get('/products/:id/recommended', async (req, res) => {
    const productService = new ProductService() 
  
    const {
      limit = 16,
      page = 1,
      sortby = 'fullPrice',
      category = 'phones',
      order = 'ASC',
    } = req.query;
  
    
    let id = req.params.id;
    
    const isSortByValid = typeof sortby === 'string' && availableSortBy.includes(sortby);
    const isLimitValid = !Number.isNaN(Number(limit));
    const isPageValid = !Number.isNaN(Number(page));
    const isCategoryValid = typeof category === 'string' && availableCategories.includes(category)
    const isOrderValid = typeof order === 'string' && availableOrder.includes(order);
   
    if (!isSortByValid || !isLimitValid || !isPageValid || !isCategoryValid || !isOrderValid) {
      res.sendStatus(400);
  
      return;
    }
  
  
    let offset = 0
    
    if (Number(page) !== 1) {
      offset = Number(page) * Number(limit) - Number(limit);
    }

    const product = await productService.getById(id);
  
    const results = await productService.findAndCountAll({
      category,
      limit: Number(limit),
      offset: offset,
      sortBy: sortby,
      order: order.toUpperCase(),
      product,
    });
  
    res.send(results);
  });

  app.listen(PORT, () => {
    console.log(`API is ready on http://localhost:${PORT}`);
  });
};

serverInit();
