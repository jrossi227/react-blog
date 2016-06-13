var React = require('react/addons');
var AllPostActions = require('../actions/AllPostActions');

var Navbar = require('react-bootstrap').Navbar;
var NavBrand = require('react-bootstrap').NavBrand;
var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;
var NavDropdown = require('react-bootstrap').NavDropdown;
var MenuItem = require('react-bootstrap').MenuItem;

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

    /*
    _handleSelect: function(eventKey) {
        console.log(eventKey);
    },
    */

    render : function() {
        return (
            <Navbar>
                <NavBrand><a href="/">React Blog</a></NavBrand>
                <Nav right>
                    <NavItem eventKey={1} href="/">Index</NavItem>
                </Nav>

                {/*<Nav right>
                    <NavItem eventKey={1} href="#" onSelect={this._handleSelect}>Link</NavItem>
                    <NavItem eventKey={2} href="#">Link</NavItem>
                    <NavDropdown eventKey={3} title="Dropdown" id="collapsible-navbar-dropdown">
                        <MenuItem eventKey={3.1}>Action</MenuItem>
                        <MenuItem eventKey={3.2}>Another action</MenuItem>
                        <MenuItem eventKey={3.3}>Something else here</MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey={3.4}>Separated link</MenuItem>
                    </NavDropdown>
                </Nav>*/}
            </Navbar>
            
        )
    }
});

module.exports = Header;