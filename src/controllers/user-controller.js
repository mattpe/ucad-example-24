import {validationResult} from 'express-validator';
import {addUser} from '../models/user-model.js';

const postUser = async (req, res) => {
  // validation errors can be retrieved from the request object (added by express-validator middleware)
  const errors = validationResult(req);
  // check if any validation errors
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }
  try {
    const newUserId = await addUser(req.body);
    res.json({message: 'new user added', user_id: newUserId});
  } catch (e) {
    console.error('postUser', e.message);
    res.status(503).json({error: 503, message: e.message});
  }
};

export {postUser};
