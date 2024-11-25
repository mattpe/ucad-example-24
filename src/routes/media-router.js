import express from 'express';
import {body} from 'express-validator';
import 'dotenv/config';
import {
  getItemById,
  getItems,
  postItem,
  putItem,
} from '../controllers/media-controller.js';
import {authenticateToken} from '../middlewares/authentication.js';
import upload from '../middlewares/upload.js';
import {validationErrorHandler} from '../middlewares/error-handlers.js';

const mediaRouter = express.Router();

mediaRouter
  .route('/')
  .get(getItems)
  .post(
    authenticateToken,
    upload.single('file'),
    body('title').trim().isLength({min: 3, max: 50}),
    body('description').trim().isLength({max: 255}),
    validationErrorHandler,
    postItem,
  );

mediaRouter.route('/:id').get(getItemById).put(authenticateToken, putItem);

export default mediaRouter;
