import jwt from 'jsonwebtoken';
import {selectUserById, selectUserByUsernameAndPassword} from '../models/user-model.js';
import 'dotenv/config';
import {customError} from '../middlewares/error-handlers.js';

const postLogin = async (req, res, next) => {
  console.log('postLogin', req.body);
  const {username, password} = req.body;
  const user = await selectUserByUsernameAndPassword(username, password);
  if (user) {
    const token = jwt.sign({user_id: user.user_id}, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    res.json({...user, token});
  } else {
    return next(customError(`Username or password invalid.`, 401));
    //res.sendStatus(401);
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
