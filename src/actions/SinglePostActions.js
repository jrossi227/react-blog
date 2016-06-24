var alt = require('../alt');
var request = require('superagent');
var config = require('../../config');

class SinglePostActions {

    loadSinglePost(id,cb){
        var self = this;

        var SinglePostStore = require('../stores/SinglePostStore');
        var state = SinglePostStore.getState();
        if(!!state.postsById[id]) {
            this.actions.updateCurrentPost(state.postsById[id]);
            if(cb){
                cb();
            }
        } else {
            if(typeof window.NProgress != 'undefined') {
                NProgress.start();
            }
            request.get(config.baseUrl+'/ajax/post/'+id,function(err,response){
                self.actions.updateCurrentPost(response.body);
                setTimeout(function(){
                    if(typeof NProgress != 'undefined') {
                        NProgress.done();
                    }
                },500);
                if(cb){
                    cb();
                }
            });   
        }
    }

    updateCurrentPost(post){
        this.dispatch(post);
    }
}


module.exports = alt.createActions(SinglePostActions);