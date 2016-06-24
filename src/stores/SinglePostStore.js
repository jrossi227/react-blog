var alt = require('../alt');
var SinglePostActions = require('../actions/SinglePostActions');

class SinglePostStore{
    constructor(){
        var self = this;
        this.bindListeners({
            handleUpdateCurrentPost: SinglePostActions.UPDATE_CURRENT_POST
        });
        this.on('init', function(){
            self.currentPost = null;
            self.postsById = {};
        });
    }

    handleUpdateCurrentPost(post){
        this.currentPost = post;
        this.postsById[post.id] = post;
    }
}

module.exports = alt.createStore(SinglePostStore, 'SinglePostStore');