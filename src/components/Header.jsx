var React = require('react/addons');
var AllPostActions = require('../actions/AllPostActions');

var Navbar = require('react-bootstrap').Navbar;
var NavBrand = require('react-bootstrap').NavBrand;
var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;
var NavDropdown = require('react-bootstrap').NavDropdown;
var MenuItem = require('react-bootstrap').MenuItem;
var Link = require('react-router').Link;

var Header = React.createClass({

    contextTypes: {
        router: React.PropTypes.func
    },

    /*
    _handleSelect: function(eventKey) {
        console.log(eventKey);
    },
    */

    render : function() {
        return (
            <Navbar>
                <NavBrand><Link to={`/`}>React Blog</Link></NavBrand>
                <Nav right>
                    <NavItem><Link to={`/`}>Index</Link></NavItem>
                </Nav>
            </Navbar>
            
        )
    }
});

module.exports = Header;