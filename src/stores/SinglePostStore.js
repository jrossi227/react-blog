var alt = require('../alt');
var SinglePostActions = require('../actions/SinglePostActions');

class SinglePostStore{
    constructor(){
        var self = this;
        this.bindListeners({
            handleUpdateCurrentPost: SinglePostActions.UPDATE_CURRENT_POST,
            handleUpdateIncludes: SinglePostActions.UPDATE_INCLUDES
        });
        this.on('init', function(){
            self.currentPost = null;
            self.postsById = {};
            self.includes = [];
        });
    }

    handleUpdateCurrentPost(post){
        this.currentPost = post;
        this.postsById[post.id] = post;
    }

    handleUpdateIncludes(includes) {
        this.includes = includes;
    }
}

module.exports = alt.createStore(SinglePostStore, 'SinglePostStore');