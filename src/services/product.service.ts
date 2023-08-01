import { Product } from "../models/Product.model";

export class ProductService {
  async getAll( category: string) {
    return await Product.findAll({
      where: {
        category: category,
      }
    });
  }

  async getById(id: number) {
    return await Product.findByPk(id);
  }
}