var React = require('react/addons');
var Route = require('react-router').Route;
var DefaultRoute = require('react-router').DefaultRoute;
var PostListView = require('./components/PostListView.jsx');
var SinglePostView = require('./components/SinglePostView.jsx');
var App = require('./components/App.jsx');

var routes = (
    <Route name='home' path="/" handler={App}>
        <Route name="postListView" path="/page/:pageNum" handler={PostListView}/>
        <Route name="singlePostView" path="/post/:id/:slug" handler={SinglePostView} />
        <DefaultRoute handler={PostListView} />
    </Route>
);

module.exports = routes;