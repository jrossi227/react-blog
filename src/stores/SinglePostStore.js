var alt = require('../alt');
var SinglePostActions = require('../actions/SinglePostActions');

class SinglePostStore{
    constructor(){
        var self = this;
        this.bindListeners({
            updateCurrentPost: SinglePostActions.UPDATE_CURRENT_POST
        });
        this.on('init', function(){
            self.currentPost = null;
        });
    }

    updateCurrentPost(post){
        this.currentPost = post;
    }
}

module.exports = alt.createStore(SinglePostStore, 'SinglePostStore');