var alt = require('../alt');
var AllPostActions = require('../actions/AllPostActions');

class AllPostStore{
    constructor(){
        var self = this;
        this.bindListeners({
            handleUpdatePosts:  AllPostActions.UPDATE_POSTS,
            handleNumberOfPosts: AllPostActions.UPDATE_NUMBER_OF_POSTS,
            handleUpdatePostListContent: AllPostActions.UPDATE_POST_LIST_CONTENT
        });
        this.on('init', function(){
            self.postsByPage = {};
            self.numberOfPosts = 0;
            self.postListContent = {
                header: '',
                content: ''
            };
        });

    }

    handleNumberOfPosts(num) {
        this.numberOfPosts = num;
    }
    
    handleUpdatePosts(obj){
        this.postsByPage[obj.pageNum] = obj.post;
    }

    handleUpdatePostListContent(postListContent) {
        this.postListContent = postListContent;
    }
}

module.exports = alt.createStore(AllPostStore, 'AllPostStore');