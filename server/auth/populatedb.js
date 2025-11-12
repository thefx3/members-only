#! /usr/bin/env node
const pool = require('../auth/db');

async function initializePosts() {
  await pool.query (`
    CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    users VARCHAR(255),
    posts TEXT,
    added TIMESTAMP
    );
  `);

  const { rows } = await pool.query("SELECT COUNT(*) FROM posts;");
  const count = parseInt(rows[0].count);

  if (count === 0) {
    console.log("Inserting default posts...");
    const defaultPosts = [
      { users: 'Bryan', posts: 'Hi my name is Bryan', added: new Date()},
      { users: 'Odin12', posts: 'Merry Christmas', added: new Date()},
      { users: 'Damonxc90', posts: 'I dont want to write anything', added: new Date()},
      { users: 'Alice', posts: 'Hello everyone!', added: new Date()},
      { users: 'Jean', posts: 'Fucking test', added: new Date()},
      { users: 'Pierro', posts: 'Happy Halloween ', added: new Date()},
      { users: 'Alban', posts: 'I write shit and shit myself', added: new Date()},
      { users: 'Gertrude', posts: 'I dont like vegetables', added: new Date()},
      { users: 'Usersx12', posts: 'Hi like eating food', added: new Date()},
      { users: 'Odin23', posts: 'Dont talk to me please', added: new Date()},
      { users: 'Usersxp123', posts: 'I am very shy...', added: new Date()},
      { users: 'Alou234', posts: 'Hey whats up ! My name is Alou', added: new Date()},
      { users: 'Bryanix90', posts: 'This website is awesome !!', added: new Date()},
      { users: 'Odin99', posts: 'No', added: new Date()},
      { users: 'Darry4', posts: 'What do you want in life ?', added: new Date()},
      { users: 'Alain3', posts: 'I feel a bit weird. I have eaten tomatoes', added: new Date()},
    ];

    for (const post of defaultPosts) {
      await pool.query("INSERT INTO posts (users, posts, added ) VALUES ($1, $2, $3)", 
        [post.users, post.posts, post.added]);
    }
    console.log("Default posts inserted successfully!");

  } else {
    console.log("Posts already exist in database.");
  }
}

module.exports = {
  initializePosts
};
