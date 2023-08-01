import { Product } from "../models/Product.model";

export class ProductService {
  async getAll() {
    return await Product.findAll();
  }

  async getById(id: number) {
    return await Product.findByPk(id);
  }
}