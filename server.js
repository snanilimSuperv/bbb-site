import express from 'express';
import path from 'path';
import logger from 'morgan';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';
import dotenv from 'dotenv';
import React from 'react';
import ReactDOM from 'react-dom/server';
import StaticRouter from 'react-router';
const Provider = require('react-redux').Provider;
import exphbs from 'express-handlebars';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import request from 'request';

// Load environment variables from .env file
dotenv.load();

// ES6 Transpiler
require('babel-core/register');
require('babel-polyfill');

// Models


// Controllers


// React and Server-Side Rendering
var routes = require('./app/routes');
var configureStore = require('./app/store/configureStore').default;

var app = express();


mongoose.connect(process.env.MONGODB);
mongoose.connection.on('error', function() {
  console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
});

var hbs = exphbs.create({
  defaultLayout: 'main',
  helpers: {
    ifeq: function(a, b, options) {
      if (a === b) {
        return options.fn(this);
      }
      return options.inverse(this);
    },
    toJSON : function(object) {
      return JSON.stringify(object);
    }
  }
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(function(req, res, next) {
    req.isAuthenticated = function() {
      var token = (req.headers.authorization && req.headers.authorization.split(' ')[1]) || req.cookies.token;
      try {
        return jwt.verify(token, process.env.TOKEN_SECRET);
      } catch (err) {
        return false;
      }
    };
  
    if (req.isAuthenticated()) {
      var payload = req.isAuthenticated();
      User.findById(payload.sub, function(err, user) {
        req.user = user;
        next();
      });
    } else {
      next();
    }
});

// app.get('/', (req, res) => {
//   res.render('layouts/main');
// });

// React server rendering
app.use(function(req, res) {
  var initialState = {
    auth: { token: req.cookies.token, user: req.user },
    messages: {}
  };

  var store = configureStore(initialState);

  const router = express.Router();
  router.get('*', (req, res) => {
    let context = {};
    const content = renderToString(
        <StaticRouter location={req.url} context={context}>
          {renderRoutes(routes)}
        </StaticRouter>
      );
      res.render('layouts/main', {
        html: html,
        initialState: store.getState()
      });
  });



//   Router.match({ routes: routes.default(store), location: req.url }, function(err, redirectLocation, renderProps) {
//     if (err) {
//       res.status(500).send(err.message);
//     } else if (redirectLocation) {
//       res.status(302).redirect(redirectLocation.pathname + redirectLocation.search);
//     } else if (renderProps) {
//       var html = ReactDOM.renderToString(React.createElement(Provider, { store: store },
//         React.createElement(Router.RouterContext, renderProps)
//       ));
//       res.render('layouts/main', {
//         html: html,
//         initialState: store.getState()
//       });
//     } else {
//       res.sendStatus(404);
//     }
//   });
});

// Production error handler
if (app.get('env') === 'production') {
  app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.sendStatus(err.status || 500);
  });
}

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;