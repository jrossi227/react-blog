
var request = require('superagent'),
    config = require('../config'),
    IncludeHandler = require('../src/IncludeHandler');

exports.showAllPosts = function(req,res,next){
    request.get(config.baseUrl+'/static/posts.json',function(err,response){
        var itemsPerPage = config.itemsPerPage;
        res.locals.data = {
           "AllPostStore" : {
               "postsByPage" : {
                   '1': response.body.slice(0, itemsPerPage)
               }
           }
       }
       next();
    });
}

exports.loadPostsViaAjax = function(req,res){
    request.get(config.baseUrl+'/static/posts.json',function(err,response){
        res.json(response.body);
    });
}

exports.showSinglePost = function(req,res,next){
    var id = req.params.id;

    request.get(config.baseUrl+'/static/posts.json',function(err,response){

        var posts = response.body;

        var found = false;
        posts.forEach(function(post){
            if(post.id === parseInt(id,10)){
                found = true;

                res.locals.data = {
                    "SinglePostStore" : {
                        "currentPost" : post
                    }
                };

                res.locals.data.SinglePostStore.postsById = {};
                res.locals.data.SinglePostStore.postsById[post.id] = post;
                
                var includes = post.includes || [];
                var includeNum  = includes.length;

                if(includeNum > 0) {

                    res.locals.data.SinglePostStore.includes = [];
                    var includeCallback = function(type, data) {

                        res.locals.data.SinglePostStore.includes.push({
                           type: type,
                           value: data
                        });

                        includeNum --;
                        if(includeNum == 0) {
                            next();
                        }
                    };

                    var type, path;
                    for(var i=0; i<includes.length; i++) {
                        type = includes[i].type;
                        path = includes[i].path;
                        IncludeHandler.handleInclude(type, path, includeCallback);
                    }
                } else {
                    next();
                }
            }
        });

        if(!found) next();
    });
}

exports.loadSinglePostViaAjax = function(req,res){
    var id = req.params.id;
    request.get(config.baseUrl+'/static/posts.json',function(err,response){
        response.body.forEach(function(post){
            if(post.id === parseInt(id,10)){
                return res.json(post);
            }
        });
    });
}

exports.loadPostsByPage = function(req,res){
    var start = req.params.start;
    var end = req.params.end;
    request.get(config.baseUrl+'/static/posts.json',function(err,response){

        res.json(response.body.filter(function(post, index) {
            if(index >= start && index < end) {
                return true;
            }

            return false;
        }));
    });
}

exports.getNumberOfPosts = function(req,res){
    request.get(config.baseUrl+'/static/posts.json',function(err,response){

        res.json({
            numberOfPosts: response.body.length
        });
    });
}