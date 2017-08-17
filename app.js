const
    express = require( 'express' ),
    logger = require('morgan'),
    cookieParser  = require('cookie-parser'),
    bodyParser = require('body-parser'),
    // session = require('express-session'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,

    dbConfig = require('./db/db');

const app = express();

app.use( logger( 'dev' ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( cookieParser() );


// configure application
app.use( express.static(__dirname + '/public' ) );
 


// app.use(session({
//     secret: 'secret',
//     saveUninitialized: true,
//     resave: true
// }));



let users = {
    'test': {
        id: 'a1',
        pass: '123',
        name: 'asya'
    }
};

// auth
passport.use( new LocalStrategy( {
        // POST { user: '', secret: '' }
        usernameField: 'user',
        passwordField: 'secret'
    },
    function( username, password, done ) {
        console.log( 'auth user', username, password );
        let user;
        if ( users[ username ] && users[ username ].pass === password){
            done( null, users[ username ], { } )
        }
        else {
            done(null, false, { message: 'bad password'});
        }
    }
));
app.use( passport.initialize() );


let storage = {};
passport.serializeUser( function(user, done) {
    console.log( 'serializeUser', user );
    let id = user.id;
    storage[ id ] = user;
    done( null, id );
});
passport.deserializeUser( function(id, done) {
    console.log( 'deserializeUser', id );
    done( null, storage[ id ] );
});
app.use( passport.session() );



// routes
app.use( require( './routes/uploader' ) );
app.use( require( './routes/downloader' ) );
app.use( require( './routes/users' ) );


// error handling
app.use( ( err, req, res, next ) => {
    res.status( 400 )
    res.send( {
        error: true,
        message: err.message,
        details: err
    } )
} );


app.listen( 3000, () => {
    console.log( "Working on port 3000" );
});

module.exports = app;
