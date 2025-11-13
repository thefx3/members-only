const { Router } = require("express");
const router = Router();

const postsController = require("../controllers/postsController");

// ----------- GET ROUTES --------------
router.get('/new-post', postsController.postPage);
router.get('/update-post/:id', postsController.updatePostPage);

// ----------- POST ROUTES --------------
router.post('/new-post', postsController.createPost);
router.post('/update-post/:id', postsController.updatePost);

module.exports = router;
