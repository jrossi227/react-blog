/**
 * Created by Sandeep on 28/06/15.
 */
var Iso = require('iso');
var Router = require('react-router');
var React = require('react/addons');
var routes = require('./routes.jsx');
var alt = require('./alt');

window.onload = function(){
    Iso.bootstrap(function (state, meta, container) {
        alt.bootstrap(state);
        Router.run(routes, Router.HistoryLocation, function (Handler) {
            var node = React.createElement(Handler);
            React.render(node, container);
        });
    });
}