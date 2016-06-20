var alt = require('../alt');
var AllPostActions = require('../actions/AllPostActions');

class AllPostStore{
    constructor(){
        var self = this;
        this.bindListeners({
            updatePosts:  AllPostActions.UPDATE_POSTS,
            updateActivePage:  AllPostActions.UPDATE_ACTIVE_PAGE
        });
        this.on('init', function(){
            self.posts = [];
            self.pageNum = 1;
        });
    }

    updatePosts(posts){
        this.posts = posts;
    }

    updateActivePage(pageNum) {
        this.pageNum = pageNum;
    }

}

module.exports = alt.createStore(AllPostStore, 'AllPostStore');