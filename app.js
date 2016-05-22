/**
 * Express configurations.
 *
 * @type {exports|module.exports}
 */
var Router = require('react-router');
var React = require('react/addons');
var express = require('express');
var Iso = require('iso');
var session = require('express-session');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

//Define Routes here
var posts = require('./routes/post.routes');
var routes = require('./src/routes.jsx');
var alt = require('./src/alt');
var app = express();

app.set('views', __dirname+'/views');
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'copy cat', resave: false, saveUninitialized: true}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit : '50mb'}));
app.use(cookieParser());

//use Routes here
app.use('/',posts);

app.use(function (req, res) {

    alt.bootstrap(JSON.stringify(res.locals.data || {}));

    var iso = new Iso();

    Router.run(routes, req.url, function (Handler) {

        var content = React.renderToString(React.createElement(Handler));

        iso.add(content, alt.flush());

        res.render('index',{content:iso.render()});
    });
});

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {

    if(!err.status || err.status !== 404){
        err.status = 500;
    }

    console.log(err);

    res.status(err.status);

    res.sendFile(path.resolve(__dirname+'/views/error/'+err.status+'.html'));

});

app.listen(9080, function () {
    console.log('Listening on localhost:9080');
});