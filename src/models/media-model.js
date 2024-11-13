import promisePool from '../utils/database.js';


const fetchMediaItems = async () => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM MediaItems');
    return rows;
  } catch (e) {
    console.error('fetchMediaItems', e.message);
    throw new Error('Database error ' + e.message);
  }
};

/**
 * Fetch a media item from the database based on id
 * @param {number} id media item id
 * @returns {Promise<object>} media item details
 */
const fetchMediaItemById = async (id) => {
  try {
    const sql = 'SELECT * FROM MediaItems WHERE media_id = ?';
    const [rows] = await promisePool.query(sql, [id]);
    console.log('fetchMediaItemById', rows);
    return rows[0];
  } catch (e) {
    console.error('fetchMediaItemById', e.message);
    throw new Error('Database error ' + e.message);
  }
};

/**
 * Add a new media item to the database
 * @param {object} newItem media file details
 * @returns {Promise<number>} id of the new item
 */
const addMediaItem = async (newItem) => {
  // TODO: add try-catch
  const sql = `INSERT INTO MediaItems
                (user_id, title, description, filename, filesize, media_type)
                VALUES (?, ?, ?, ?, ?, ?)`;
  const params = [
    newItem.user_id,
    newItem.title,
    newItem.description,
    newItem.filename,
    newItem.filesize,
    newItem.media_type,
  ];
  const result = await promisePool.query(sql, params);
  console.log('addMediaItem', result);
  return result[0].insertId;
};

export {fetchMediaItems, fetchMediaItemById, addMediaItem};
