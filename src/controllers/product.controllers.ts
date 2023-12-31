import { sliceIntoChunks } from "../helpers/sliceIntoChunks";
import { Image } from "../models/Image.model";

import { ProductService } from "../services/product.service";
import { Response, Request } from 'express';

const availableSortBy = ['name', 'fullPrice', 'year'];
const availableCategories = ['phones', 'tablets', 'accessories']
const availableOrder = ['ASC', 'DESC', 'asc', 'desc'];

export const getAllProductsController = async (req: Request, res: Response) => {
  const productService = new ProductService()

  let newProducts  = false;

  let recommended = false;

  if (req.path.includes('new')) {
    newProducts = true;
  }

  let recProd  = null;
  
  if (req.path.includes('recommended')) {
    let id = req.params.id;
    
    recommended = true;

    recProd = await productService.getById(id);
  }


  const {
    limit = 16,
    page = 1,
    sortby = 'fullPrice',
    category = 'phones',
    desc = 'false',
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

  const results = await productService.findAndCountAll({
    category,
    limit: Number(limit),
    offset: offset,
    sortBy: sortby,
    order: order.toUpperCase(),
    newProducts,
  });

  res.send(results);
}

export const getProductById = async (req: Request, res: Response) => {
  const productService = new ProductService();
  
  const { id } = req.params;
  
  const product = await productService.getById(id);

  if (!product) {
    res.sendStatus(404);
    return;
  }

  const productLinks = await Image.findByPk(Number(product?.image_id));

  res.send({
    product,
    productLinks
  });
} 
