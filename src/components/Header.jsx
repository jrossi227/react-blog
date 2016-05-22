var React = require('react/addons');
var RouteHandler = require('react-router').RouteHandler;
var Link = require('react-router').Link;
var AllPostActions = require('../actions/AllPostActions');

var Header = React.createClass({

    contextTypes: {
        router: React.PropTypes.func
    },

    showAllPosts : function(e){
        e.preventDefault();
        AllPostActions.loadAllPosts((function(){
           this.context.router.transitionTo('postListView');
        }).bind(this));
    },

    render : function() {
        return (
            <div className="header">
                <h1><a href="#" onClick={this.showAllPosts}>React Isomorphic Blog</a></h1>
            </div>
        )
    }
});

module.exports = Header;