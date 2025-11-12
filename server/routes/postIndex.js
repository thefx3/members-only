const { Router } = require("express");
const router = Router();

const postsController = require("../controllers/postsController");

// ----------- GET ROUTES --------------
router.get('/create-post', postsController.postPage);





// ----------- POST ROUTES --------------
router.post('/new-post', postsController.createPost);


module.exports = router;
