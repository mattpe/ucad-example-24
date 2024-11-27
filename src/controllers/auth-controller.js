import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import {selectUserById, selectUserByUsername} from '../models/user-model.js';
import 'dotenv/config';
import {customError} from '../middlewares/error-handlers.js';

const postLogin = async (req, res, next) => {
  console.log('postLogin', req.body);
  const {username, password} = req.body;
  const user = await selectUserByUsername(username);
  if (!user) {
    return next(customError(`Username not found.`, 401));
  }
  const pwMatch = await bcrypt.compare(password, user.password);
  if (pwMatch) {
    const token = jwt.sign({user_id: user.user_id}, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    // DO not include password hash into response
    delete user.password;
    return res.json({...user, token});
  } else {
    return next(customError(`Password invalid.`, 401));
  }
};

const getMe = async (req, res, next) => {
  try {
    const user = await selectUserById(req.user.user_id);
    res.json({user_id: req.user.user_id, ...user});
  } catch (error) {
    console.error('getMe', error.message);
    return next(customError(error.message, 503));
  }  
};

export {postLogin, getMe};
