// Dummy mock data
const items = [
  {id: 1, name: 'Item1'},
  {id: 2, name: 'Item2'},
];

const getItems = (res) => {
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify(items));
};

const postItem = (req, res) => {
  let body = [];
  req
    .on('data', (chunk) => {
      body.push(chunk);
    })
    .on('end', () => {
      body = Buffer.concat(body).toString();
      // at this point, `body` has the entire request body stored in it as a string
      console.log('req body:', body);
      const item = JSON.parse(body);
      // TODO: check largest id in array and increment by 1
      item.id = items.length + 1; // NOT like this
      items.push(item);
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify({message: 'Item added'}));
    });
};

export {getItems, postItem};
