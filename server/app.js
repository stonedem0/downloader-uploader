const
    express = require( 'express' ),
    logger = require('morgan'),
    cookieParser  = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    Joi = require('joi'),
    Celebrate = require('celebrate'),
    // dbConfig = require('./db/db');
    users = require( './storage/users.js' );

const app = express();



app.use( logger( 'dev' ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( cookieParser() );


// configure application
app.use( express.static( __dirname + '/../client/dist' ) );
 


app.use( session({
    secret: 'sloth',
    saveUninitialized: true,
    resave: true
}));


// let users = {
//     'test': {
//         id: 'a1',
//         pass: 'a',
//         name: 'aaa@ukr.net'
//     }
// };

// auth
passport.use( new LocalStrategy(
    // {
    //     // POST { user: '', secret: '' }
    //     usernameField: 'user',
    //     passwordField: 'secret'
    // // },
    ( username, password, done ) => {
        users.findOne( { email: username }, ( err, doc ) =>{
            console.log();
            // let user;
            if ( users[ username ] && users[ username ].pass === password){
                done( null, users[ username ], { } )
            }
            else {
                done(null, false, { message: 'bad password'});
            }
            console.log( 'auth user', username, password );
            return done( null, doc );
        });


    }
));
app.use( passport.initialize() );


let storage = {};

passport.serializeUser( (user, done) => {
    console.log( 'serializeUser', user );
    let id = user.id;
    storage[ id ] = user;
    done( null, id );
});
passport.deserializeUser( (id, done) => {
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
    res.status( 400 );
    res.send( {
        error: true,
        message: err.message,
        details: err
    } )
} );

process.stdout.write('A simple message\n');



if ( require.main === module )
    app.listen( 3000, () => {
        console.log( "Working on port 3000" );
    });

module.exports = app;
