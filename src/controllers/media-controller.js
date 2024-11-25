import {customError} from '../middlewares/error-handlers.js';
import {
  fetchMediaItems,
  addMediaItem,
  fetchMediaItemById,
  updateMediaItem,
} from '../models/media-model.js';

const getItems = async (req, res, next) => {
  try {
    res.json(await fetchMediaItems());
  } catch (e) {
    console.error('getItems', e.message);
    return next(customError(e.message, 503));
  }
};

const getItemById = async (req, res, next) => {
  const id = parseInt(req.params.id);
  console.log('getItemById', id);
  try {
    const item = await fetchMediaItemById(id);
    if (item) {
      res.json(item);
    } else {
      return next(customError('Item not found', 404));
    }
  } catch (error) {
    console.error('getItemById', error.message);
    return next(customError(error.message, 503));
  }
};

/**
 * Add media controller function for handling POST request and sending response
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @returns {object} response object
 */
const postItem = async (req, res, next) => {
  console.log('post req file', req.file);
  console.log('post req body', req.body);

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
    return next(customError(error.message, 503));
  }
};

/**
 * Update media file Controller function for handling PUT request and sending response
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @returns {object} response object
 */
const putItem = async (req, res, next) => {
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
      return res
        .status(404)
        .json({message: 'Media Item not found or no permission to edit'});
    } else if (itemsEdited === 1) {
      return res.status(200).json({message: 'Item updated', id: req.params.id});
    }
  } catch (error) {
    return next(customError(error.message, 500));
  }
};

export {getItems, getItemById, postItem, putItem};
