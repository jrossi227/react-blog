var alt = require('../alt');
var AllPostActions = require('../actions/AllPostActions');

class AllPostStore{
    constructor(){
        var self = this;
        this.bindListeners({
            updatePosts:  AllPostActions.UPDATE_POSTS
        });
        this.on('init', function(){
            self.posts = [];
        });
    }

    updatePosts(posts){
        this.posts = posts;
    }

}

module.exports = alt.createStore(AllPostStore, 'AllPostStore');