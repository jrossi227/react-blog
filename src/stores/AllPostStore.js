var alt = require('../alt');
var AllPostActions = require('../actions/AllPostActions');

class AllPostStore{
    constructor(){
        var self = this;
        this.bindListeners({
            handleUpdatePosts:  AllPostActions.UPDATE_POSTS,
            handleUpdateActivePage:  AllPostActions.UPDATE_ACTIVE_PAGE
        });
        this.on('init', function(){
            self.posts = [];
            self.pageNum = 1;
        });

        AllPostActions.loadAllPosts();
    }

    handleUpdatePosts(posts){
        this.posts = posts;
    }

    handleUpdateActivePage(pageNum) {
        this.pageNum = pageNum;
    }

}

module.exports = alt.createStore(AllPostStore, 'AllPostStore');