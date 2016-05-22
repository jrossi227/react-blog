/**
 * Created by Sandeep on 28/06/15.
 */

var alt = require('../alt');
var request = require('superagent');
var config = require('../../config');

class PostActions {
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

    updatePosts(posts){
        this.dispatch(posts);
    }

    updateCurrentPost(post){
        this.dispatch(post);
    }
}


module.exports = alt.createActions(PostActions);