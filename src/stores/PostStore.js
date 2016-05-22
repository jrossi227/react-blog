/**
 * Created by Sandeep on 28/04/15.
 */
var alt = require('../alt');
var PostActions = require('../actions/PostActions');

class PostStore{
    constructor(){
        var self = this;
        this.bindListeners({
            updateCurrentPost: PostActions.UPDATE_CURRENT_POST,
            updatePosts:  PostActions.UPDATE_POSTS
        });
        this.on('init', function(){
            self.posts = [];
            self.currentPost = null;
        });
    }

    updateCurrentPost(post){
        this.currentPost = post;
    }

    updatePosts(posts){
        this.posts = posts;
    }

}

module.exports = alt.createStore(PostStore, 'PostStore');