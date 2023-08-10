import { Response, Request } from 'express';
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { secret } = require('./auth.config.js');

import { User } from "../models/User.model";

const generateAccessToken = (username: any) => {
  const payload = {
    username,
  }

  return jwt.sign(payload, secret, {expiresIn: "24h"})
}

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
    
      const token = jwt.sign({id: user.id}, secret, {expiresIn: '24h'});
      res.send(token);
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