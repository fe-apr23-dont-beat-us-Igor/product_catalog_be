import { sliceIntoChunks } from "../helpers/sliceIntoChunks";
import { ProductService } from "../services/product.service";
import { Response, Request } from 'express';

export const getAllProductsController = async (req: Request, res: Response) => {
  const productService = new ProductService()

  const products = await productService.getAll();

  let page = Number(req.query.page);
  let count = Number(req.query.count);

  if (!page) {
    page = 1;
  }

  let paginatedProducts = sliceIntoChunks(products, count);

  res.send(paginatedProducts[page - 1]);
}