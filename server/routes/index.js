const { Router } = require("express");
const router = Router();
const connection = require('../auth/db');
const { genPassword } = require('../utils/passwordUtils');


// -------------- GET ROUTES ----------------
router.get('/', (req, res) => {
    res.render('homepage');
})

router.get('/register', (req, res) => {
    res.render('register-page');
})

router.get('/login', (req, res) => {
    res.render('homepage');
})

// -------------- POST ROUTES ----------------

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


module.exports = router; 
