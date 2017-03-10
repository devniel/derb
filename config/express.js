/**
 * Configuración para el uso
 * del framework Express 4
 *
 * @author  devnieL
 *
 */

var express         = require('express');
var path            = require("path");
var logger          = require('morgan');
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');
var swig            = require('swig');
var env             = require("./env")[process.env.NODE_ENV || 'development'];

var cookieParser    = require('cookie-parser');
var cookieSession   = require('cookie-session')

var jwt = require('jsonwebtoken');

var subdomain       = require('subdomain');

module.exports = function(app, i18n) {

    app.locals.pretty = true;
    app.set('views', global.rootDirectory + "/public/dist");


    app.set('view engine', 'html');
    app.engine('html', swig.renderFile);

    /*app.set('view engine', 'js');

    app.engine('js', require('express-react-views').createEngine({
        beautify : false
    }));*/

    app.use(logger('dev'));

    app.use(methodOverride());
    app.use(cookieParser());

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(cookieSession({
      name: 'session',
      keys: ['key1', 'key2']
    }))

    app.use(subdomain({
        base : 'project.com', removeWWW : true
    }));    

    if(env.name == "development"){

        var webpackMiddleware = require("webpack-dev-middleware");
        var webpack = require("webpack");

        // Webpack Configuration

        var webpackConfig = require("./../webpack.development.config");
        var compiler = webpack(webpackConfig);

        app.use(webpackMiddleware(compiler, {
            publicPath: "/dist", // Same as `output.publicPath` in most cases.
        }));

        app.use(require("webpack-hot-middleware")(compiler));

    }

    app.use(express.static(global.rootDirectory + '/public'));

    /***************************************
    Express Route Configuration
    ****************************************/

    require("./routes")(app);

};
