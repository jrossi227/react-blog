
var request = require('superagent'),
    config = require('../config');

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

        posts.forEach(function(post){
            if(post.id === parseInt(id,10)){
                res.locals.data = {
                    "SinglePostStore" : {
                        "currentPost" : post
                    }
                };
                next();
            }
        });

        next();
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