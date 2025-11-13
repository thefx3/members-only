const connection = require('./db');


async function getAllPosts() {
    const { rows } = await connection.query(
        'SELECT id, idpost, email, title, content, author, date AS created_at FROM posts ORDER BY date DESC'
    );
    return rows;
}

async function createPost({ idpost, email, author, title, content }) {
    await connection.query(
        'INSERT INTO posts (idpost, email, author, title, content, date) VALUES ($1, $2, $3, $4, $5, NOW())',
        [idpost, email, author, title, content]
    );
}


//Login and Registration Queries
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





module.exports = {
    getAllPosts, 
    createPost,
    addNewUser,
    findUserByEmail
}
