import {customError} from '../middlewares/error-handlers.js';
import {addUser} from '../models/user-model.js';

const postUser = async (req, res, next) => {
  try {
    const newUserId = await addUser(req.body);
    res.json({message: 'new user added', user_id: newUserId});
  } catch (e) {
    console.error('postUser', e.message);
    return next(customError(e.message, 503));
  }
};

export {postUser};
