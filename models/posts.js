const { query } = require('../db/index');

//gets all posts regardless of user

async function getAllPosts() {
  const response = await query(
    `SELECT * FROM posts
      ORDER BY date;`
  );
  return response.rows;
}

module.exports = {
  getAllPosts,
};