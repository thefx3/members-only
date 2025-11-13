const connection = require('./db');


async function getAllPosts() {
    const { rows } = await connection.query(
        'SELECT idpost, iduser, email, title, content, author, date AS created_at FROM posts ORDER BY date DESC'
    );
    return rows;
}

async function createPost({ iduser, email, author, title, content }) {
    await connection.query(
        'INSERT INTO posts (iduser, email, author, title, content, date) VALUES ($1, $2, $3, $4, $5, NOW())',
        [iduser, email, author, title, content]
    );
}

async function addNewUser (firstname, lastname, email, hash, salt) {
    await connection.query(
        'INSERT INTO users (first_name, last_name, email, hash, salt, role) VALUES ($1, $2, $3, $4, $5, $6)',
        [firstname, lastname, email, hash, salt, 'user']
    );
}

async function findUserByEmail(email) {
    const { rows } = await connection.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
    );
    return rows[0] || null;
}

async function getSinglePost(idpost) {
    return connection.query(
        `SELECT * FROM posts WHERE idpost = $1`,
        [idpost]
    );
}

async function updatePost({ idpost, iduser, title, content }) {
    const result = await connection.query(
        `
        UPDATE posts
        SET title = $3, content = $4
        WHERE idpost = $1 AND iduser = $2
        RETURNING *;
        `,
        [idpost, iduser, title, content]
    );

    return result.rows[0] || null;
}

async function deleteSinglePost(idpost) {
    await connection.query(
        `DELETE FROM posts WHERE idpost = $1`,
        [idpost]
    );
}


module.exports = {
    getAllPosts, 
    createPost,
    addNewUser,
    findUserByEmail,
    getSinglePost,
    updatePost,
    deleteSinglePost
}
