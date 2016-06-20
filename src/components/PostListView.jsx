var React = require('react/addons');
var AllPostStore = require('../stores/AllPostStore');
var AllPostActions = require('../actions/AllPostActions');
var PostPreview = require('./PostPreview.jsx');
var Pagination = require('react-bootstrap').Pagination;
var config = require('../../config');

var PostListView = React.createClass({

    itemsPerPage: config.itemsPerPage,

    contextTypes: {
        router: React.PropTypes.func
    },

    componentDidMount : function() {
        AllPostStore.listen(this.onChange);
        AllPostActions.getNumberOfPosts();
        AllPostActions.loadPage(this.state.pageNum);
    },

    componentWillUnmount : function() {
        AllPostStore.unlisten(this.onChange);
    },

    onChange : function(state){
        this.setState(state);
    },

    getInitialState : function(){
        var state = AllPostStore.getState();

        return state;
    },

    handleSelect: function(event, data) {
        AllPostActions.updateActivePage(data.eventKey);
    },

    getNumberOfPages: function() {
        return Math.ceil(this.state.numberOfPosts / this.itemsPerPage);
    },

    render : function() {
        var posts = this.state.posts[this.state.pageNum] || [];

        posts = posts.map(function(post){
                return (
                    <PostPreview key={post.id} post={post} />
                )
        });

        return (
            <div>
                <div className="post-list">
                    {posts}
                </div>

                <div className="pagination-wrapper">
                    <Pagination
                        className = "pagination-container"
                        prev
                        next
                        first
                        last
                        ellipsis
                        boundaryLinks
                        items={this.getNumberOfPages()}
                        maxButtons={5}
                        activePage={this.state.pageNum}
                        onSelect={this.handleSelect} />
                </div>
            </div>
        )
    }
});

module.exports = PostListView;