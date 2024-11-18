import jwt from 'jsonwebtoken';
import {selectUserByUsernameAndPassword} from '../models/user-model.js';
import 'dotenv/config';

const postLogin = async (req, res) => {
  console.log('postLogin', req.body);
  const {username, password} = req.body;
  const user = await selectUserByUsernameAndPassword(username, password);
  if (user) {
    const token = jwt.sign(user, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    res.json({...user, token});
  } else {
    res.sendStatus(401);
  }
};

export {postLogin};
