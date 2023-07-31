import { Sequelize } from 'sequelize-typescript';
import { models } from './models';

const URI = 'postgres://products_db_74rl_user:O4Bzs9v7kCIbO7uiiSJhcXIpLhC8ivWs@dpg-cj3lk8tiuie55plnr410-a.frankfurt-postgres.render.com/products_db_74rl';

export const initDB = () => {
  return new Sequelize(
    URI,
    {
      models,
      dialectOptions: {
        ssl: true
      }
    }
  );

}