var alt = require('../alt');
var AllPostActions = require('../actions/AllPostActions');

class AllPostStore{
    constructor(){
        var self = this;
        this.bindListeners({
            handleUpdatePosts:  AllPostActions.UPDATE_POSTS,
            handleNumberOfPosts: AllPostActions.UPDATE_NUMBER_OF_POSTS
        });
        this.on('init', function(){
            self.postsByPage = {};
            self.numberOfPosts = 0;
        });

    }

    handleNumberOfPosts(num) {
        this.numberOfPosts = num;
    }
    
    handleUpdatePosts(obj){
        this.postsByPage[obj.pageNum] = obj.post;
    }
}

module.exports = alt.createStore(AllPostStore, 'AllPostStore');