import {fetchMediaItems, addMediaItem, fetchMediaItemById} from "../models/media-model.js";

const getItems = async (req, res) => {
  try {
    res.json(await fetchMediaItems());
  } catch (e) {
    console.error('getItems', e.message);
    res.status(503).json({error: 503, message: 'DB error'});
  }
};

const getItemById = async (req, res) => {
  // TODO: implement try-catch for db errors
  const id = parseInt(req.params.id);
  console.log('getItemById', id);
  const item = await fetchMediaItemById(id);
  if (item) {
      res.json(item);
  } else {
    res.status(404).json({message: 'Item not found'});
  }
};

const postItem = async (req, res) => {
  // input validatation is done later
  // TODO: add try-catch for db errors
  console.log('post req body', req.body);
  console.log('post req file', req.file);
  const newMediaItem = {
    // user id is hardcoded for now
    user_id: 1,
    title: req.body.title,
    description: req.body.description,
    filename: req.file.filename,
    filesize: req.file.size,
    media_type: req.file.mimetype,
    created_at: new Date().toISOString(),
  };
  const id = await addMediaItem(newMediaItem);
  if (!id) {
    return res.status(400).json({message: 'Something went wrong. Item not added'});
  }
  res.status(201).json({message: 'Item added', id: id});
};



export {getItems, postItem, getItemById};
