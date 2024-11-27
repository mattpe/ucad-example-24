import bcrypt from 'bcryptjs';
import {customError} from '../middlewares/error-handlers.js';
import {addUser} from '../models/user-model.js';

const postUser = async (req, res, next) => {
  const user = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(user.password, salt);
  console.log('hash', hashedPassword);
  user.password = hashedPassword;
  try {
    const newUserId = await addUser(user);
    res.json({message: 'new user added', user_id: newUserId});
  } catch (e) {
    console.error('postUser', e.message);
    return next(customError(e.message, 503));
  }
};

export {postUser};
