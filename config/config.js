const fs = require('fs');

const dbCredentials = {
  username: 'products_db_74rl_user',
  password: 'O4Bzs9v7kCIbO7uiiSJhcXIpLhC8ivWs',
  port: 5432,
  database: 'products_db_74rl',
  host: 'dpg-cj3lk8tiuie55plnr410-a.frankfurt-postgres.render.com'
}

const dialectConfig = {
  dialect: 'postgres',
  dialectOptions: {
    ssl: true,
  }
}

module.exports = {
  development: {
    ...dbCredentials,
    ...dialectConfig
  },
  test: {
    ...dbCredentials,
    ...dialectConfig
  },
  production: {
    ...dbCredentials,
    ...dialectConfig
  }
};