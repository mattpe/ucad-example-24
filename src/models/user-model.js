import promisePool from '../utils/database.js';

const selectUserById = async (id) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT username, email, user_level_id FROM Users WHERE user_id = ?',
      [id],
    );
    return rows[0];
  } catch (error) {
    console.error('getUserBy id error', error.message);
    throw new Error('Database error ' + error.message);
  }
};

const selectUserByUsernameAndPassword = async (username, password) => {
  try {
    // TODO: return only user_id?
    const [rows] = await promisePool.query(
      'SELECT user_id, username, email, user_level_id, created_at FROM Users WHERE username = ? AND password = ?',
      [username, password],
    );
    return rows[0];
  } catch (error) {
    console.error('selectUserByUsernameAndPassword', error.message);
    throw new Error('Database error ' + error.message);
  }
};

export {selectUserByUsernameAndPassword, selectUserById};
