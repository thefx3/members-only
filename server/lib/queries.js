const connection = require('../auth/db');

async function getAllPosts() {
    const { rows } = await connection.query(
        'SELECT id, title, content, author, date AS created_at FROM posts ORDER BY date DESC'
    );
    return rows;
}

module.exports = {
    getAllPosts
}
