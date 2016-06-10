var React = require('react/addons');
var AllPostStore = require('../stores/AllPostStore');
var PostPreview = require('./PostPreview.jsx');

var PostListView = React.createClass({

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
        this.setState(state);
    },

    getInitialState : function(){
        return AllPostStore.getState();
    },

    render : function() {
        var posts = this.state.posts.map(function(post){
           return (
               <PostPreview key={post.id} post={post} />
           )
        });
        return (
            <div>
                {posts}
            </div>
        )
    }
});

module.exports = PostListView;