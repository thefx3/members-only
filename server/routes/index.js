const { Router } = require("express");
const router = Router();

const authIndex = require('../routes/authIndex');


// ----------- GET ROUTES --------------
// All the auth related routes are handled in authIndex
router.use('/', authIndex)


// -------------- POST ROUTES ----------------


module.exports = router; 
