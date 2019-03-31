const express = require('express');
const router = express.Router();
const PostsController = require('../controllers/posts');
const auth = require('../middleware/auth');
const extractFile = require('../middleware/file');
router.get('', PostsController.getPosts);
router.get('/:id', PostsController.getPost);
router.post('', auth, extractFile, PostsController.createPost);
router.put('/update/:id', auth, extractFile, PostsController.updatePost);
router.delete('/:id', auth, PostsController.deletePost);

module.exports = router;
