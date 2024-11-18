import promisePool from '../utils/database.js';

const selectUserByUsernameAndPassword = async (username, password) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT * FROM Users WHERE username = ? AND password = ?',
      [username, password],
    );
    return rows[0];
  } catch (error) {
    console.error('selectUserByUsernameAndPassword', error.message);
    throw new Error('Database error ' + error.message);
  }
};

export {selectUserByUsernameAndPassword};
