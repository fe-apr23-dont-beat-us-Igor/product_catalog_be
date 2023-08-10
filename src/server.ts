import express from 'express';
import { initDB } from './initDB';
import { sliceIntoChunks } from './helpers/sliceIntoChunks';
const { Op } = require("sequelize");
import { ProductService } from './services/product.service';
import { getAllProductsController, getProductById } from './controllers/product.controllers';
import { Product } from './models/Product.model';
import { User } from './models/User.model';
import { Data } from './models/Data.model';
const controller = require('./controllers/authController');
const { check } = require('express-validator');

let cors = require('cors');

const availableSortBy = ['name', 'fullPrice', 'year'];
const availableCategories = ['phones', 'tablets', 'accessories']
const availableOrder = ['ASC', 'DESC', 'asc', 'desc'];

// postgres://products_db_74rl_user:O4Bzs9v7kCIbO7uiiSJhcXIpLhC8ivWs@dpg-cj3lk8tiuie55plnr410-a.frankfurt-postgres.render.com/products_db_74rl

const serverInit = async () => {
  const PORT = 5000;

  const app = express();

  app.use(cors({
    origin: '*',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
    credentials: true,
    exposedHeaders: ['Origin', 'X-Requested-With', 'ontent-Type', 'Accept', 'Authorization'],
  }));

  app.use(express.json())

  const sequelize = initDB();

  const res = await sequelize.authenticate();

  app.post('/registration', [
    check('username', 'Username cannot be empty').notEmpty(),
    check('password', 'Password has to be more than 4 and less than 10 symbols').isLength({ min: 4, max: 10 })
  ], controller.registration)

  app.get('/data/:username', async (req, res) => {
    let username = req.params.username;

    let user = await User.findOne({
      where: {
        username: username
      }
    });
    
    if (!user) {
      res.statusCode = 400;
      res.send('error...');
      return;
    }
    
    let data = await Data.findOne({
      where: {
        id: user?.data_id
      }
    });

    res.send(data);
  });

  app.patch('/data/:username', async (req, res) => {
    let username = req.params.username;

    let payload = req.body;

    let fav = payload.favourites.join(' ');
    let car = payload.cart.join(' ');
    
    let user = await User.findOne({
      where: {
        username: username
      }
    });
    
    if (!user) {
      res.statusCode = 400;
      res.send('error...');
      return;
    }
    
    let data = Data.update({ favourites: fav, cart: car }, {
      where: {
        id: user.data_id
      }
    })

    res.send(data);
  });

  app.post('/login', controller.login)

  app.get('/users', controller.getUsers)


  app.get('/products', getAllProductsController);

  app.get('/products/new', getAllProductsController);

  app.get('/products/:id', getProductById);

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

  app.get('/images/:link', function (req, res) {
    let link = req.params.link;

    res.sendFile(link, { root: './src/images' });
  });
  
  app.get('/discount', async (req, res) => {
    const {
      limit = 16,
      page = 1,
      sortby = 'fullPrice',
      category = 'phones',
      desc = 'false'
    } = req.query;

    const isSortByValid = typeof sortby === 'string' && availableSortBy.includes(sortby);
    const isLimitValid = !Number.isNaN(Number(limit));
    const isPageValid = !Number.isNaN(Number(page));
    const isCategoryValid = typeof category === 'string' && availableCategories.includes(category)

    if (!isSortByValid || !isLimitValid || !isPageValid || !isCategoryValid) {
      res.sendStatus(400);

      return;
    }


    let offset = 0

    if (Number(page) !== 1) {
      offset = Number(page) * Number(limit) - Number(limit);
    }

    let order = 'ASC';

    if (desc === 'true') {
      order = 'DESC';
    }

    let discounted = await Product.findAndCountAll({
      attributes: ['name', 'image_catalog', 'capacity', 'ram', 'screen', 'fullPrice', 'price', 'category', 'itemId'],
      where: {
        price: {
          [Op.ne]: null
        }
      },
      limit: Number(limit),
      offset: offset,
      order: [[sortby, order]],
    });

    res.send(discounted);
  });

  app.post('/cart-items', async (req, res) => {
    let { ids } = req.body;

    let result = [];


    for (let id of ids) {
      let prod = await Product.findOne({
        where: {
          itemId: id
        },
        attributes: ['name', 'image_catalog', 'capacity', 'ram', 'screen', 'fullPrice', 'price', 'category', 'itemId']
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
      desc = 'false'
    } = req.query;


    let id = req.params.id;

    const isSortByValid = typeof sortby === 'string' && availableSortBy.includes(sortby);
    const isLimitValid = !Number.isNaN(Number(limit));
    const isPageValid = !Number.isNaN(Number(page));
    const isCategoryValid = typeof category === 'string' && availableCategories.includes(category)

    if (!isSortByValid || !isLimitValid || !isPageValid || !isCategoryValid) {
      res.sendStatus(400);

      return;
    }


    let offset = 0

    if (Number(page) !== 1) {
      offset = Number(page) * Number(limit) - Number(limit);
    }

    let order = 'ASC';

    if (desc === 'true') {
      order = 'DESC';
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
