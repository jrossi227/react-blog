var React = require('react/addons');
var RouteHandler = require('react-router').RouteHandler;
var Link = require('react-router').Link;
var Header = require('./Header.jsx');
var Grid = require('react-bootstrap').Grid;
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;

var App = React.createClass({

    render : function() {
        return (
            <Grid>
                <Row>
                    <Col className="body-container">
                        <Header/>
                        <RouteHandler />
                    </Col>
                </Row>
            </Grid>
        )
    }
});

module.exports = App;