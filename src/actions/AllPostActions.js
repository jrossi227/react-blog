var alt = require('../alt');
var request = require('superagent');
var config = require('../../config');

class AllPostActions {

    loadPage(pageNum, cb) {
        var AllPostStore = require('../stores/AllPostStore');
        var state = AllPostStore.getState();
        if(!!state.postsByPage[pageNum + '']) {
            this.actions.updatePosts(state.postsByPage[pageNum])
        } else {
            var self = this;

            pageNum = pageNum -1;

            var end = (pageNum * config.itemsPerPage) + config.itemsPerPage;
            var start = (pageNum * config.itemsPerPage);

            if(typeof NProgress != 'undefined') {
                NProgress.start();
            }
            request.get(config.baseUrl+'/ajax/postsByPage/' + start + '/' + end,function(err,response){
                self.actions.updatePosts(response.body);
                setTimeout(function(){
                    if(typeof NProgress != 'undefined') {
                        NProgress.done();
                    }
                },500);
                if(!!cb){
                    cb();
                }
            });
        }
    }

    getNumberOfPosts() {
        var self = this;

        var AllPostStore = require('../stores/AllPostStore');
        var state = AllPostStore.getState();
        if(state.numberOfPosts == 0) {
            request.get(config.baseUrl+'/ajax/getNumberOfPosts',function(err,response) {
                self.actions.updateNumberOfPosts(response.body.numberOfPosts);
            });
        } else {
            this.actions.updateNumberOfPosts(state.numberOfPosts);
        }
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