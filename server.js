//  =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+ Requirement Load Start  =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+ // 
const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const request = require('request');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

const React = require('react');
const ReactDOM = require('react-dom/server');
const Router = require('react-router');
const Provider = require('react-redux').Provider;
const exphbs = require('express-handlebars');
var sass = require('node-sass-middleware');
var webpack = require('webpack');


//  =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+ Requirement Load End  =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+ // 
// Load environment variables from .env file
dotenv.load();
require('babel-core/register');
require('babel-polyfill');

const app = express();
mongoose.connect(process.env.MongoDB);
mongoose.connection.on('error', function() {
    console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
    process.exit(1);
});



const hbs = exphbs.create({
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
app.use(sass({ src: path.join(__dirname, 'public'), dest: path.join(__dirname, 'public') }));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




//  =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+ Model Load Start  =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+ // 

//  =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+ Model Load End  =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+ // 


//  =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+ Controllers Load Start  =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+ // 

//  =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+ Controllers Load End  =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+ // 



//  =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+ Controllers Maping Start  =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+ // 

//  =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+ Controllers Maping End  =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+ //



// =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+
// BASE64 ENCODE
// =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+

// var base64 = require('base-64');
// var encoded = '';
// var decoded = base64.encode(encoded);
// var bytes = base64.decode(decoded);
// console.log(decoded);
// console.log(bytes);


// =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+




app.listen(app.get('port'), function(){
    console.log('App Start on ' + app.get('port'));
})




module.exports = app;