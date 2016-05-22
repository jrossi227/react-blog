var alt = require('../alt');
var request = require('superagent');
var config = require('../../config');

class SinglePostActions {
    
    loadSinglePost(id,cb){
        var self = this;
        NProgress.start();
        request.get(config.baseUrl+'/ajax/post/'+id,function(err,response){
            self.actions.updateCurrentPost(response.body);
            setTimeout(function(){
                NProgress.done();
            },500);
            if(cb){
                cb();
            }
        });
    }

    updateCurrentPost(post){
        this.dispatch(post);
    }
}


module.exports = alt.createActions(SinglePostActions);