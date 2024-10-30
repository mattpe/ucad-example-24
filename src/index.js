import express from 'express';
import {getItemById, getItems, postItem} from './media.js';
const hostname = '127.0.0.1';
const port = 3000;
const app = express();

app.use(express.json());

// Media resource endpoints
app.get('/api/media', (req, res) => {
  getItems(res);
});
app.get('/api/media/:id', (req, res) => {
  //console.log('req.params', req.params);
  //console.log('query params', req.query);
  getItemById(req, res);
});
app.post('/api/media', (req, res) => {
  postItem(req, res);
});
app.put('/api/media/:id', (req, res) => {
  // TODO: implement this endpoint
  res.status(501).json({message: 'Under construction'});
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});



