var React = require('react/addons');
var PostStore = require('../stores/PostStore');

var SinglePostView = React.createClass({

    contextTypes: {
        router: React.PropTypes.func
    },

    componentDidMount : function() {
        PostStore.listen(this.onChange);
    },

    componentWillUnmount : function() {
        PostStore.unlisten(this.onChange);
    },

    onChange : function(state){
        this.setState(state);
    },

    getInitialState : function(){
        return PostStore.getState();
    },

    render : function() {
        return (
            <div className="full-post">
                <h1 className="post-title">{this.state.currentPost.title}</h1>
                <div className="author-details">
                    <img src={this.state.currentPost.author.photo} className="author-photo"/>
                    <span className="author-name">{this.state.currentPost.author.name}</span>
                </div>
                <div className="post-content">
                    {this.state.currentPost.description}
                </div>
            </div>
        )
    }
});

module.exports = SinglePostView;