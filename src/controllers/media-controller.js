import {fetchMediaItems, addMediaItem, fetchMediaItemById} from "../models/media-model.js";

const getItems = async (req, res) => {
  try {
    res.json(await fetchMediaItems());
  } catch (e) {
    console.error('getItems', e.message);
    res.status(503).json({error: 503, message: 'DB error'});
  }
};

const postItem = (req, res) => {
  console.log('post req body', req.body);
  console.log('post req file', req.file);
  const newMediaItem = {
    title: req.body.title,
    description: req.body.description,
    filename: req.file.filename,
    filesize: req.file.size,
    media_type: req.file.mimetype,
    created_at: new Date().toISOString(),
  };
  const id = addMediaItem(newMediaItem);
  if (!id) {
    return res.status(400).json({message: 'Something went wrong. Item not added'});
  }
  res.status(201).json({message: 'Item added', id: id});
};

const getItemById = (req, res) => {
  const id = parseInt(req.params.id);
  const item = fetchMediaItemById(id);
  if (item) {
      res.json(item);
  } else {
    res.status(404).json({message: 'Item not found'});
  }
};

export {getItems, postItem, getItemById};
