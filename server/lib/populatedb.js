#! /usr/bin/env node
const pool = require('../lib/db');

async function initializePosts() {
  await pool.query (`
    CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
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
      { author: 'Bryan', title: 'HELLO', content: 'Hi my name is Bryan', date: new Date()},
      { author: 'Odin12', title: 'Holidays :', content: 'Merry Christmas', date: new Date()},
      { author: 'Damonxc90', title: 'Sad', content: 'I dont want to write anything', date: new Date()},
      { author: 'Alice', title: 'Hi', content: 'Hello everyone!', date: new Date()},
      { author: 'Jean', title: 'Test', content: 'Fucking test', date: new Date()},
      { author: 'Pierro', title: '31 October', content: 'Happy Halloween ', date: new Date()},
      { author: 'Alban', title: 'No title', content: 'I write shit and shit myself', date: new Date()},
      { author: 'Gertrude', title: 'Revolution', content: 'I dont like vegetables', date: new Date()},
      { author: 'Usex12', title: 'About me', content: 'Hi like eating food', date: new Date()},
      { author: 'Odin23', title: 'Not in the mood', content: 'Dont talk to me please', date: new Date()},
      { author: 'Userxp123', title: 'Shy', content: 'I am very shy...', date: new Date()},
      { author: 'Alou234', title: 'Introduction', content: 'Hey whats up ! My name is Alou', date: new Date()},
      { author: 'Bryanix90', title: 'Congrats', content: 'This website is awesome !!', date: new Date()},
      { author: 'Odin99', title: 'Test2', content: 'No', date: new Date()},
      { author: 'Darry4', title: 'Questions', content: 'What do you want in life ?', date: new Date()},
      { author: 'Alain3', title: 'Feeling...', content: 'I feel a bit weird. I have eaten tomatoes', date: new Date()},
    ];

    for (const post of defaultPosts) {
      await pool.query("INSERT INTO posts (author, title, content, date ) VALUES ($1, $2, $3, $4)", 
        [post.author, post.title, post.content, post.date]);
    }
    console.log("Default posts inserted successfully!");

  } else {
    console.log("Posts already exist in database.");
  }
}

module.exports = {
  initializePosts
};
