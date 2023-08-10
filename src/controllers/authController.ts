import { Response, Request, NextFunction } from 'express';
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { secret } = require('./auth.config.js');

import { User } from "../models/User.model";
import { Data } from '../models/Data.model';

const verifyUserToken = (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    return res.status(401).send("Unauthorized request");
  }
  const token = req.headers["authorization"].split(" ")[1];
  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }
  try {
    const decoded = jwt.verify(token, secret);
    next();
  } catch (err) {
    res.status(400).send("Invalid token.");
  }
};

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
        return;
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
        return;
      }

      const hashPassword = bcrypt.hashSync(password, 7);
      const dataCount = await Data.count();
      const data = await Data.create({favourites: null, cart: null});
      const user = await User.create({ username: username, password: hashPassword, data_id: dataCount + 1});
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
      const { username, password } = req.body;
      const user = await User.findOne({
        where: {
          username: username,
        }
      });

      if (!user) {
        res.statusCode = 400;
        res.send(`User ${username} not found!`);
        return;
      }

      const validPassword = bcrypt.compareSync(password, user.password);

      if (!validPassword) {
        res.statusCode = 400;
        res.send(`Incorrect password!`);
        return;
      }
    
      const token = jwt.sign({username: user.username}, secret, {expiresIn: '24h'});
      res.send({
        token
      });
    } catch (error) {
      console.log(error);
      res.statusCode = 400;
      res.send('Login error');
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