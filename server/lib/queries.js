const connection = require('../lib/db');

async function getAllPosts() {
    const { rows } = await connection.query(
        'SELECT id, title, content, author, date AS created_at FROM posts ORDER BY date DESC'
    );
    return rows;
}

async function addNewUser (firstname, lastname, email, hash, salt) {
    await connection.query(
        'INSERT INTO users (first_name, last_name, email, hash, salt, is_admin, is_user, is_guest) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
        [firstname, lastname, email, hash, salt, false, true, false]
    );
}

async function selectUserBy(value) {
    const { rows } = await connection.query(
        `SELECT * FROM users WHERE ${value} = $1`,
        [value]
    );
    return rows;
}

module.exports = {
    getAllPosts, 
    addNewUser,
    selectUserBy
}
