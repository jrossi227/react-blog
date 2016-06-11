var React = require('react/addons');
var AllPostStore = require('../stores/AllPostStore');
var PostPreview = require('./PostPreview.jsx');
var Pagination = require('react-bootstrap').Pagination;

var PostListView = React.createClass({

    itemsPerPage: 4,

    contextTypes: {
        router: React.PropTypes.func
    },

    componentDidMount : function() {
        AllPostStore.listen(this.onChange);
    },

    componentWillUnmount : function() {
        AllPostStore.unlisten(this.onChange);
    },

    onChange : function(state){
        state.activePage = 1;
        this.setState(state);
    },

    getInitialState : function(){
        var state = AllPostStore.getState();
        state.activePage = 1;

        return state;
    },

    handleSelect(event, data) {
        this.setState({
            activePage: data.eventKey
        });
    },

    getNumberOfPages: function() {
        return Math.ceil(this.state.posts.length / this.itemsPerPage);
    },

    generatePostsForPage: function() {
        var pageNum = (this.state.activePage - 1);

        var posts = [];
        var post;
        for(var i = pageNum * this.itemsPerPage; i < ((pageNum * this.itemsPerPage) + this.itemsPerPage); i++) {
            post = this.state.posts[i];
            if(!!post) {
                posts.push(post);
            }
        }

        return posts;
    },

    render : function() {
        var posts = this.generatePostsForPage().map(function(post){
                return (
                    <PostPreview key={post.id} post={post} />
                )
        });

        return (
            <div>
                <div className="post-list">
                    {posts}
                </div>

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
                    activePage={this.state.activePage}
                    onSelect={this.handleSelect} />
            </div>
        )
    }
});

module.exports = PostListView;