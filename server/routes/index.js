const { Router } = require("express");
const router = Router();

const authIndex = require('../routes/authIndex');
const postIndex = require('../routes/postIndex');

// ----------- GET ROUTES --------------
// All the auth related routes are handled in authIndex
router.use('/', authIndex);

router.use('/', postIndex);

// -------------- POST ROUTES ----------------


module.exports = router; 
