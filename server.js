
const
  express = require( 'express' ),
  session = require( 'express-session' ),
  parser = require( 'body-parser' ),
  // WebSocketServer = new require( 'ws' ),
  passport = require( 'passport' ),
  LocalStrategy = require( 'passport-local' ).Strategy,
  
  router = require( './routes/routes.js' ),
  webSocketServer = require( './ws/ws.js'),
  subscribersDb = require( './subscribers/subscribers-db.js' ),
  users = require( './storage/users.js' );

// express application
let app = express();

// serve static files
app.use( express.static( 'dist' ) );

// parse application/json
app.use( parser.json() );

// password authentication
passport.use( new LocalStrategy(
  ( username, password, done ) => {
    users.findOne( { email: username }, ( err, doc ) => {
      if ( err ) { return done( err ); }
      if ( !doc ) {
        return done( null, false, { message: 'Incorrect username.' } );
      }
      if ( doc.password != password ) {
        return done( null, false, { message: 'Incorrect password.' } );
      }
      return done( null, doc );
    } );
  }
) );
// use passport middleware
app.use( passport.initialize() );

passport.serializeUser( ( doc, done ) => {
  done( null, doc );
} );
passport.deserializeUser( ( doc, done ) => {
  done( null, doc );
} );
// use passport session
app.use( passport.session() );

// routes
app.post( '*', router );

// error handling
app.use( ( err, req, res, next ) => {
  console.error( err );
} );

// bind server on port
app.listen( 3000 );
