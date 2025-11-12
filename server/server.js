require('dotenv').config();

console.log("Environment loaded:", process.env.DB_HOST, process.env.DB_DATABASE);

const path = require("node:path");
const { initializePosts} = require("./auth/populatedb");
const express = require('express');
const app = express();
const session = require('express-session');
const passport = require('passport');
const routes = require('./routes');
const connection = require('./auth/db');
const pgSession = require('connect-pg-simple')(session);

//Important to config the local strategy for passport
require('./auth/passport');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, 'public')));

//-------------- SESSION SETUP --------------------------

app.use(
    session({
      store: new pgSession({
        pool: connection,
        tableName: 'session',
        createTableIfMissing: true,
      }),
      secret: process.env.SESSION_SECRET || 'secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        secure: false,
      },
    })
  );



//-------------- PASSPORT AUTHENTICATION ----------------
 
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});


//-------------- ROUTES ---------------------------------

// Imports all of the routes from ./routes/index.js
app.use(routes);



// -------------- SERVER --------------------------------
 
const PORT = 3000;
(async () => {
  try {
    await initializePosts();
    app.listen(PORT, () => {
      console.log(`✅ App listening on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Database initialization failed:", err);
  }
})();


app.use((err, req, res, next) => {
  console.error(err);
  // We can now specify the `err.statusCode` that exists in our custom error class and if it does not exist it's probably an internal server error
  res.status(err.statusCode || 500).send(err.message);
});

