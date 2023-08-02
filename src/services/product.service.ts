import { Product } from "../models/Product.model";

type CreateOptions = Pick<Product, 'name' | 'image_id'>;

interface FindAllOptions {
  limit?: number;
  offset?: number;
  sortBy?: string;
}

export class ProductService {
  create(options: CreateOptions) {
    return Product.create(options);
  }

  
  findAndCountAll(options: FindAllOptions = {}) {
    const {
      limit,
      offset,
      sortBy = 'id',
    } = options;

    console.log(sortBy)

    return Product.findAndCountAll({
      limit,
      offset,
      order: [[sortBy, 'ASC']],
    });
  }

  async getById(id: number) {
    return await Product.findByPk(id);
  }
}