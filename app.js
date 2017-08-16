const
    express = require( 'express' ),
    logger = require('morgan'),
    cookieParser  = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    passport = require('passport'),
    localStrategy = require('passport-local').Strategy,
    dbConfig = require('./db/db'),
    mongoose = require('mongoose');
    mongoose.connect(dbConfig.url);
    // initPassport = require('./passport/init');
    // initPassport(passport);


const app = express();


app.use( logger( 'dev' ) );
app.use(session({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());

// routes
const uploader = require( './routes/uploader' )( app );
const downloader = require( './routes/downloader' )( app );

// configure application
app.use( express.static(__dirname + '/public' ) );
app.use( ( err, req, res, next ) => {
    if ( res.finished )
        return next();
    res.json( {
        type: 'file',
        error: 'not found'
    } );
});



app.listen(3000, () => {
    console.log( "Working on port 3000" );
    });

module.exports = app;
