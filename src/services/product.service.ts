import { Product } from "../models/Product.model";

type CreateOptions = Pick<Product, 'name' | 'image_id'>;

interface FindAllOptions {
  limit?: number;
  offset?: number;
  sortBy?: string;
  category?: string;
  order?: string;
  newProducts?: boolean;
}

export class ProductService {
  create(options: CreateOptions) {
    return Product.create(options);
  }

  
   async findAndCountAll(options: FindAllOptions = {}) {
    const {
      category,
      limit,
      offset,
      sortBy = 'name',
      order = 'ASC',
      newProducts = false,
    } = options;

    console.log(sortBy)

    if (newProducts) {
      return await Product.findAndCountAll({
        where: {
          category: category,
          year: [2022 , 2023, 2021]
        },
        limit,
        offset,
        order: [[sortBy, order]],
      });
    }
    
    return await Product.findAndCountAll({
      where: {
        category: category
      },
      limit,
      offset,
      order: [[sortBy, order]],
    });
  }

  async getById(id: string) {
    return await Product.findOne({ where: { itemId: id } });
  }
}