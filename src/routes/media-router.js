import express from 'express';
import multer from 'multer';
import {body} from 'express-validator';
import 'dotenv/config';
import {
  getItemById,
  getItems,
  postItem,
  putItem,
} from '../controllers/media-controller.js';
import {authenticateToken} from '../middlewares/authentication.js';

const upload = multer({
  dest: 'uploads/',
  limits: {fileSize: 1024 * 1024 * process.env.MAX_UPLOAD_SIZE},
  fileFilter: (req, file, cb) => {
    // allow only images and videos
    if (
      file.mimetype.startsWith('image/') ||
      file.mimetype.startsWith('video/')
    ) {
      // accept file
      cb(null, true);
    } else {
      // reject file
      cb(null, false);
    }
  },
});

const mediaRouter = express.Router();

mediaRouter
  .route('/')
  .get(getItems)
  .post(
    authenticateToken,
    upload.single('file'),
    body('title').trim().isLength({min: 3, max: 50}),
    body('description').trim().isLength({max: 255}),
    postItem,
  );

mediaRouter.route('/:id').get(getItemById).put(authenticateToken, putItem);

export default mediaRouter;
