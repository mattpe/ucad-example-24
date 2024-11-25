import express from 'express';
import {body} from 'express-validator';
import {getMe, postLogin} from '../controllers/auth-controller.js';
import {authenticateToken} from '../middlewares/authentication.js';
import {postUser} from '../controllers/user-controller.js';
import {validationErrorHandler} from '../middlewares/error-handlers.js';

const authRouter = express.Router();

authRouter.route('/login').post(postLogin);
authRouter.route('/me').get(authenticateToken, getMe);
authRouter
  .route('/register')
  .post(
    body('username').trim().isAlphanumeric().isLength({min: 3, max: 20}),
    body('password').isLength({min: 8}),
    body('email').isEmail(),
    validationErrorHandler,
    postUser,
  );

export default authRouter;
