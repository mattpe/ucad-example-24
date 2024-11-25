import express from 'express';
import mediaRouter from './routes/media-router.js';
import authRouter from './routes/auth-router.js';
import {errorHandler, notFoundHandler} from './middlewares/error-handlers.js';
const hostname = '127.0.0.1';
const port = 3000;
const app = express();

app.set('view engine', 'pug');
app.set('views', 'src/views');

app.use(express.json());
//app.use(express.urlencoded({extended: true}));

// Home page (client) as static html, css, js
app.use(express.static('public'));
// Uploaded media files
app.use('/uploads', express.static('uploads'));

// Api documentation page rendered with pug
app.get('/api', (req, res) => {
  res.render('index', {
    title: 'Media sharing REST API Documentation',
    version: process.env.npm_package_version,
    // exampleData: mediaItems,
  });
});


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
