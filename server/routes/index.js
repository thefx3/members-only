const { Router } = require("express");
const router = Router();
const passport = require('passport');
const connection = require('../auth/db');


// -------------- GET ROUTES ----------------
router.get('/', (req, res) => {
    res.render('homepage');
})

router.get('/create-account', (req, res) => {
    res.render('create-account-page');
})

// -------------- POST ROUTES ----------------


module.exports = router; 