import { sliceIntoChunks } from "../helpers/sliceIntoChunks";
import { ProductService } from "../services/product.service";
import { Response, Request } from 'express';

const availableSortBy = ['id', 'name'];

export const getAllProductsController = async (req: Request, res: Response) => {
  const productService = new ProductService()

  const {
    limit = 16,
    page = 1,
    sortBy = 'id',
  } = req.query;

  const isSortByValid = typeof sortBy === 'string' && availableSortBy.includes(sortBy)
  const isLimitValid = !Number.isNaN(Number(limit));
  const isPageValid = !Number.isNaN(Number(page));

  if (!isSortByValid || !isLimitValid || !isPageValid) {
    res.sendStatus(400);

    return;
  }

  let offset = 0
  
  if (Number(page) !== 1) {
    offset = Number(page) * Number(limit);
  }

  const results = await productService.findAndCountAll({
    limit: Number(limit),
    offset: offset,
    sortBy,
  });

  res.send(results);
}

export const getProductById = async (req: Request, res: Response) => {
  const productService = new ProductService();
  
  const { id } = req.params;
  
  const product = await productService.getById(Number(id));

  res.send(product);
} 