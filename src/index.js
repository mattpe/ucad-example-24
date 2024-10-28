import express from 'express';
import {getItemById, getItems, postItem} from './items.js';
const hostname = '127.0.0.1';
const port = 3000;
const app = express();

app.use(express.json());

// /api/items resource endpoints
app.get('/api/items', (req, res) => {
  getItems(res);
});
app.get('/api/items/:id', (req, res) => {
  //console.log('req.params', req.params);
  //console.log('query params', req.query);
  getItemById(req, res);
});
app.post('/api/items', (req, res) => {
  postItem(req, res);
});
app.put('/api/items', (req, res) => {
  res.status(501).json({message: 'Under construction'});
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// Create a server object and bind a callback function
// to all request events
/* const server = http.createServer((req, res) => {
  const {url, method} = req;
  console.log('url:', url, 'method:', method);
  if (url === '/items' && method === 'GET') {
    getItems(res);
  } else if (url === '/items' && method === 'POST') {
    postItem(req, res);
  } else {
    // Generic not found response
    res.writeHead(404, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({error: '404', message: 'not found'}));
  }
}); */


