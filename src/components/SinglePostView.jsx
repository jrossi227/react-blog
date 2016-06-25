var React = require('react/addons');
var SinglePostStore = require('../stores/SinglePostStore');
var Glyphicon = require('react-bootstrap').Glyphicon;
var SinglePostActions = require('../actions/SinglePostActions');
var AllPostActions = require('../actions/AllPostActions');
var Link = require('react-router').Link;

var SinglePostView = React.createClass({

    contextTypes: {
        router: React.PropTypes.func
    },

    componentWillMount: function() {
        var self = this;
        SinglePostActions.loadSinglePost(this.props.params.id,function(){
            self.setState(SinglePostStore.getState());
        });
    },

    componentDidMount : function() {
        SinglePostStore.listen(this.onChange);
    },

    componentWillUnmount : function() {
        SinglePostStore.unlisten(this.onChange);
        SinglePostActions.reset();
    },

    onChange : function(state){
        this.setState(state);
    },

    getInitialState : function(){
        return SinglePostStore.getState();
    },

    render : function() {
        if(this.state.currentPost == null) {
            return (<div></div>);
        }

        var includes = this.state.includes || [];

        var htmlIncludes = [], jsIncludes = [];
        if(includes.length > 0) {
            var include;
            for(var i=0; i<includes.length; i++) {
                include = includes[i];
                switch(include.type) {
                    case 'html':
                        htmlIncludes.push(include.value);
                        break;
                }
            }
        }

        return (
            <div className="full-post">
                <div>
                    <Link to={`/`}><Glyphicon glyph="arrow-left" />&nbsp;Back</Link>
                </div>
                <h1 className="post-title">{this.state.currentPost.title}</h1>
                <div className="author-details">
                    <img src={this.state.currentPost.author.photo} className="author-photo"/>
                    <span className="author-name">{this.state.currentPost.author.name}</span>
                </div>
                <div className="post-content">
                    <div dangerouslySetInnerHTML={ {__html: this.state.currentPost.description || ''} }></div>
                    <div dangerouslySetInnerHTML={ {__html: htmlIncludes.join('')} }></div>
                </div>
            </div>
        )
    }
});

module.exports = SinglePostView;