import {addUser} from '../models/user-model.js';

const postUser = async (req, res) => {
  try {
    const newUserId = await addUser(req.body);
    res.json({message: 'new user added', user_id: newUserId});
  } catch (e) {
    console.error('postUser', e.message);
    res.status(503).json({error: 503, message: e.message});
  }
};

export {postUser};
