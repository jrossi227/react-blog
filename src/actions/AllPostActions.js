var alt = require('../alt');
var request = require('superagent');
var config = require('../../config');

class AllPostActions {
    loadAllPosts(cb){
        var self = this;
        NProgress.start();
        request.get(config.baseUrl+'/ajax/posts',function(err,response){
            self.actions.updatePosts(response.body);
            setTimeout(function(){
                NProgress.done();
            },500);
            if(cb){
                cb();
            }
        });
    }

    updatePosts(posts){
        this.dispatch(posts);
    }

    updateActivePage(pageNum) {
        this.dispatch(pageNum);
    }
}


module.exports = alt.createActions(AllPostActions);