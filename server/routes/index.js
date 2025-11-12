const { Router } = require("express");
const router = Router();
const passport = require('passport');
const connection = require('../auth/db');
const { genPassword } = require('../utils/passwordUtils');
const indexController = require('../controllers/indexController');
const queries = require('../lib/queries');


const renderLoginPage = (req, res) => {
    const { loginError } = req.query;
    res.render('login-page', { loginError, user: req.user });
};

// -------------- GET ROUTES ----------------
router.get('/', indexController.renderHomePage);

router.get('/register', (req, res) => {
    res.render('register-page');
})

router.get('/login', renderLoginPage);

router.get('/login-success', async (req, res, next) => {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
        return res.redirect('/login');
    }

    try {
        const posts = await queries.getAllPosts();
        return res.render('homepage', { user: req.user, posts });
    } catch (err) {
        return next(err);
    }
});


router.get('/login-failure', (req, res, next) => {
    res.render('login-failure');
});

// -------------- POST ROUTES ----------------

router.post(
    '/login',
    passport.authenticate('local', {
        successRedirect: '/login-success',
        failureRedirect: '/login?loginError=1'
    })
);

router.post('/register', async (req, res, next) => {
    try {
        const { firstname, lastname, email, password  } = req.body;

        if (!firstname || !lastname || !email || !password) {
            return res.status(400).send('All the fields are required');
        }

        const existingUser = await connection.query(
            'SELECT 1 FROM users WHERE email = $1' ,
            [email]
        );

        if (existingUser.rowCount > 0) {
            return res.status(409).send('This email is already used.');
        }

        const { salt, hash } = genPassword(password);

        await connection.query(
            'INSERT INTO users (first_name, last_name, email, hash, salt, is_admin, is_user, is_guest) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
            [firstname, lastname, email, hash, salt, false, true, false]
        );

        return res.redirect('/login');

    } catch (err) {
        return next(err);
    }
});


router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }

        req.session.destroy((sessionErr) => {
            if (sessionErr) {
                return next(sessionErr);
            }

            res.clearCookie('connect.sid');
            return res.redirect('/login');
        });
    });
});


module.exports = router; 
