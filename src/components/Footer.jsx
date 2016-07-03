var React = require('react/addons');

var Link = require('react-router').Link;

var Footer = React.createClass({

    contextTypes: {
        router: React.PropTypes.func
    },

    render : function() {
        return (
            <div className="footer">
                <Link to={`/`}>Home</Link>
            </div>
        )
    }
});

module.exports = Footer;