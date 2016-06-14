var React = require('react/addons');
var SinglePostStore = require('../stores/SinglePostStore');
var Glyphicon = require('react-bootstrap').Glyphicon;
var SinglePostActions = require('../actions/SinglePostActions');

/** STATIC FILE INCLUDES **/
var ReasonsToUseReact  = require('../../public/static/jsx/reasons-to-use-react.jsx');

var SinglePostView = React.createClass({

    contextTypes: {
        router: React.PropTypes.func
    },

    componentDidMount : function() {
        SinglePostStore.listen(this.onChange);
    },

    componentWillUnmount : function() {
        SinglePostStore.unlisten(this.onChange);
    },

    onChange : function(state){
        this.setState(state);
    },

    getInitialState : function(){
        return SinglePostStore.getState();
    },

    render : function() {
        var includes = this.state.currentPost.includes || [];

        var htmlIncludes = [], jsIncludes = [];
        if(!!includes) {
            var include;
            var Template;
            for(var i=0; i<includes.length; i++) {
                include = includes[i];
                switch(include.type) {
                    case 'jsx':
                        Template = require(include.path);
                        htmlIncludes.push(<Template key={i}/>);
                        break;
                }
            }
        }

        return (
            <div className="full-post">
                <div>
                    <a href="/"><Glyphicon glyph="arrow-left" />&nbsp;Back</a>
                </div>
                <h1 className="post-title">{this.state.currentPost.title}</h1>
                <div className="author-details">
                    <img src={this.state.currentPost.author.photo} className="author-photo"/>
                    <span className="author-name">{this.state.currentPost.author.name}</span>
                </div>
                <div className="post-content">
                    {this.state.currentPost.description || ''}
                    {htmlIncludes}
                </div>
            </div>
        )
    }
});

module.exports = SinglePostView;