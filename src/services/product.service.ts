import { Product } from "../models/Product.model";

export class ProductService {
  async getAll() {
    return await Product.findAll();
  }
}