import express from 'express';
import {getItemById, getItems, postItem} from '../controllers/media-controller.js';

const mediaRouter = express.Router();

mediaRouter.route('/').get(getItems).post(postItem);

mediaRouter
  .route('/:id')
  .get(getItemById)
  .put((req, res) => {
    // TODO: implement this endpoint
    res.status(501).json({message: 'Under construction'});
  });

export default mediaRouter;
