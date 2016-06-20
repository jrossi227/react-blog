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

    loadPage(pageNum, cb) {
        var self = this;

        pageNum = pageNum -1;

        var end = (pageNum * config.itemsPerPage) + config.itemsPerPage;
        var start = (pageNum * config.itemsPerPage);

        NProgress.start();
        request.get(config.baseUrl+'/ajax/postsByPage/' + start + '/' + end,function(err,response){
            self.actions.updatePosts(response.body);
            setTimeout(function(){
                NProgress.done();
            },500);
            if(!!cb){
                cb();
            }
        });
    }

    getNumberOfPosts() {
        var self = this;

        request.get(config.baseUrl+'/ajax/getNumberOfPosts',function(err,response) {
            self.actions.updateNumberOfPosts(response.body.numberOfPosts);
        });
    }

    updateNumberOfPosts(num) {
        this.dispatch(num);
    }

    updatePosts(posts){
        this.dispatch(posts);
    }

    updateActivePage(pageNum) {
        this.dispatch(pageNum);
        this.actions.loadPage(pageNum);
    }
}


module.exports = alt.createActions(AllPostActions);