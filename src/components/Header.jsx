var React = require('react/addons');
var RouteHandler = require('react-router').RouteHandler;
var Link = require('react-router').Link;
var AllPostActions = require('../actions/AllPostActions');
var PageHeader = require('react-bootstrap').PageHeader;

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
            <PageHeader className="header">
                <a href="#" onClick={this.showAllPosts}>React Isomorphic Blog</a>
            </PageHeader>
        )
    }
});

module.exports = Header;