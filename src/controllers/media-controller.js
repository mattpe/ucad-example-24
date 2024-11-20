import {validationResult} from 'express-validator';
import {
  fetchMediaItems,
  addMediaItem,
  fetchMediaItemById,
  updateMediaItem,
} from '../models/media-model.js';

const getItems = async (req, res) => {
  try {
    res.json(await fetchMediaItems());
  } catch (e) {
    console.error('getItems', e.message);
    res.status(503).json({error: 503, message: 'DB error'});
  }
};

const getItemById = async (req, res) => {
  const id = parseInt(req.params.id);
  console.log('getItemById', id);
  try {
    const item = await fetchMediaItemById(id);
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({message: 'Item not found'});
    }
  } catch (error) {
    console.error('getItemById', error.message);
    res.status(503).json({error: 503, message: error.message});
  }
};

/**
 * Add media controller function for handling POST request and sending response
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @returns {object} response object
 */
const postItem = async (req, res) => {
  const errors = validationResult(req);
  console.log('post req file', req.file);
  console.log('post req body', req.body);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  } else if (!req.file) {
    return res.status(400).json({message: 'File required'});
  }
  // destructure title and description property values from req.body
  const {title, description} = req.body;
  
  const newMediaItem = {
    // user id read from token added by authentication middleware
    user_id: req.user.user_id,
    title,
    description,
    filename: req.file.filename,
    filesize: req.file.size,
    media_type: req.file.mimetype,
    created_at: new Date().toISOString(),
  };
  try {
    const id = await addMediaItem(newMediaItem);
    res.status(201).json({message: 'Item added', id: id});
  } catch (error) {
    return res
      .status(400)
      .json({message: 'Something went wrong: ' + error.message});
  }
};

/**
 * Update media file Controller function for handling PUT request and sending response
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @returns {object} response object
 */
const putItem = async (req, res) => {
  // destructure title and description property values from req.body
  const {title, description} = req.body;
  console.log('put req body', req.body);
  const newDetails = {
    title,
    description,
  };
  try {
    const itemsEdited = await updateMediaItem(
      req.params.id,
      req.user.user_id,
      newDetails,
    );
    // if no items were edited (id was not found in DB), return 404
    // TODO (optional): return 403 if user does not have permission to edit (user_id does not match the one in db)
    if (itemsEdited === 0) {
      return res.status(404).json({message: 'Media Item not found or no permission to edit'});
    } else if (itemsEdited === 1) {
      return res.status(200).json({message: 'Item updated', id: req.params.id});
    }
  } catch (error) {
    return res
      .status(500)
      .json({message: 'Something went wrong: ' + error.message});
  }
};

export {getItems, getItemById, postItem, putItem};
