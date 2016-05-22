/**
 * Created by Sandeep on 28/06/15.
 */

var express = require('express'),
    router = express.Router(),
    PostController = require('../controllers/post.controller');

router.route('/').get(PostController.showAllPosts);
router.route('/ajax/posts').get(PostController.loadPostsViaAjax);
router.route('/post/:id/:slug').get(PostController.showSinglePost);
router.route('/ajax/post/:id').get(PostController.loadSinglePostViaAjax);

module.exports = router;