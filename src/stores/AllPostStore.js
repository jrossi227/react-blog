var alt = require('../alt');
var AllPostActions = require('../actions/AllPostActions');

class AllPostStore{
    constructor(){
        var self = this;
        this.bindListeners({
            handleUpdatePosts:  AllPostActions.UPDATE_POSTS,
            handleUpdateActivePage:  AllPostActions.UPDATE_ACTIVE_PAGE,
            handleNumberOfPosts: AllPostActions.UPDATE_NUMBER_OF_POSTS
        });
        this.on('init', function(){
            self.postsByPage = {};
            self.pageNum = 1;
            self.numberOfPosts = 0;
        });

    }

    handleNumberOfPosts(num) {
        this.numberOfPosts = num;
    }
    
    handleUpdatePosts(posts){
        this.postsByPage[this.pageNum + ''] = posts;
    }

    handleUpdateActivePage(pageNum) {
        this.pageNum = pageNum;
    }

}

module.exports = alt.createStore(AllPostStore, 'AllPostStore');