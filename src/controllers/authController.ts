import { Response, Request } from 'express';
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

import { User } from "../models/User.model";

class authController {
  async registration(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.statusCode = 400;
        res.send({
          message: 'Registration error',
          errors,
        })
      }
      const {username, password} = req.body;
      const candidate = await User.findOne({
        where: {
          username: username,
        }
      });

      if (candidate) {
        res.statusCode = 400;
        res.send('User with this username already exists');
      }

      const hashPassword = bcrypt.hashSync(password, 7);
      const user = await User.create({ username: username, password: hashPassword });
      res.send('User has been succesfully registered!');
      return;
    } catch (error) {
      console.log(error);
      res.statusCode = 400;
      res.send('Registration error!');
      return;
    }
  }

  async login(req: Request, res: Response) {
    try {
      
    } catch (error) {
      console.log(error);
      res.statusCode = 400;
      res.send('Login error!');
      return;
    }
  }

  async getUsers(req: Request, res: Response) {
    try {
      res.send('213123')
    } catch (error) {
      
    }
  }
}

module.exports = new authController();