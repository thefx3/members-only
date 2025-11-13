const { Router } = require("express");
const router = Router();

const postsController = require("../controllers/postsController");

// ----------- GET ROUTES --------------
router.get('/new-post', postsController.postPage);
router.get('/update-post/:id', postsController.updatePostPage);
router.get('/delete-post/:id', postsController.deleteSinglePost);

// ----------- POST ROUTES --------------
router.post('/new-post', postsController.createPost);
router.post('/update-post/:id', postsController.updatePost);
router.post('/delete-post/:id', postsController.deleteSinglePost);

module.exports = router;
