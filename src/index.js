import express from 'express';
import cors from 'cors';
import mediaRouter from './routes/media-router.js';
import authRouter from './routes/auth-router.js';
import {errorHandler, notFoundHandler} from './middlewares/error-handlers.js';
const hostname = '127.0.0.1';
const port = 3000;
const app = express();

app.set('view engine', 'pug');
app.set('views', 'src/views');

app.use(cors());
app.use(express.json());
//app.use(express.urlencoded({extended: true}));

// Home page (client) as static html, css, js
app.use(express.static('public'));
// Uploaded media files
app.use('/uploads', express.static('uploads'));
// Documentation website by Apidoc
app.use('/api', express.static('doc'));


// User authentication endpoints
app.use('/api/auth', authRouter);
// Media resource endpoints
app.use('/api/media', mediaRouter);

// User resource endpoints
// TODO: implement user resource
//app.use('/api/users', userRouter);

// default route, if none of the above matches
app.use(notFoundHandler);
// generic error handler for all errors
app.use(errorHandler);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
