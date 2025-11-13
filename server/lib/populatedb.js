#! /usr/bin/env node
const pool = require('../lib/db');

async function initializePosts() {
  await pool.query (`
    CREATE TABLE IF NOT EXISTS posts (
    idpost INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    iduser INTEGER REFERENCES users(id),
    email TEXT,
    author VARCHAR(255),
    title VARCHAR(255),
    content TEXT,
    date TIMESTAMP
);
  `);

  const { rows } = await pool.query("SELECT COUNT(*) FROM posts;");
  const count = parseInt(rows[0].count);

  if (count === 0) {
    console.log("Inserting default posts...");
    const defaultPosts = [
      { email: 'default@test.fr', author: 'Bryan', title: 'HELLO', content: 'Hi my name is Bryan', date: new Date()},
      { email: 'default@test.fr', author: 'Odin12', title: 'Holidays :', content: 'Merry Christmas', date: new Date()},
      { email: 'default@test.fr', author: 'Damonxc90', title: 'Sad', content: 'I dont want to write anything', date: new Date()},
      { email: 'default@test.fr', author: 'Alice', title: 'Hi', content: 'Hello everyone!', date: new Date()},
      { email: 'default@test.fr', author: 'Jean', title: 'Test', content: 'Fucking test', date: new Date()},
      { email: 'default@test.fr', author: 'Pierro', title: '31 October', content: 'Happy Halloween ', date: new Date()},
      { email: 'default@test.fr', author: 'Alban', title: 'No title', content: 'I write shit and shit myself', date: new Date()},
      { email: 'default@test.fr', author: 'Gertrude', title: 'Revolution', content: 'I dont like vegetables', date: new Date()},
      { email: 'default@test.fr', author: 'Usex12', title: 'About me', content: 'Hi like eating food', date: new Date()},
      { email: 'default@test.fr', author: 'Odin23', title: 'Not in the mood', content: 'Dont talk to me please', date: new Date()},
      { email: 'default@test.fr', author: 'Userxp123', title: 'Shy', content: 'I am very shy...', date: new Date()},
      { email: 'default@test.fr', author: 'Alou234', title: 'Introduction', content: 'Hey whats up ! My name is Alou', date: new Date()},
      { email: 'default@test.fr', author: 'Bryanix90', title: 'Congrats', content: 'This website is awesome !!', date: new Date()},
      { email: 'default@test.fr', author: 'Odin99', title: 'Test2', content: 'No', date: new Date()},
      { email: 'default@test.fr', author: 'Darry4', title: 'Questions', content: 'What do you want in life ?', date: new Date()},
      { email: 'default@test.fr', author: 'Alain3', title: 'Feeling...', content: 'I feel a bit weird. I have eaten tomatoes', date: new Date()},
    ];

    for (const post of defaultPosts) {
      await pool.query(
        `INSERT INTO posts (iduser, email, author, title, content, date)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [null, post.email, post.author, post.title, post.content, post.date]
      );
      
    }
    console.log("Default posts inserted successfully!");

  } else {
    console.log("Posts already exist in database.");
  }
}

module.exports = {
  initializePosts
};
