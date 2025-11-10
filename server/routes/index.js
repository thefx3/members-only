const { Router } = require("express");
const router = Router();
const passport = require('passport');
const connection = require('../auth/db');


// -------------- GET ROUTES ----------------
router.get('/', (req, res) => {
    res.render('homepage');
})

router.get('/register', (req, res) => {
    res.render('register-page');
})

// -------------- POST ROUTES ----------------




router.post('/register', (req, res) => {

})




module.exports = router; 