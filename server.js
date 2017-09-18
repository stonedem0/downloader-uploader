const
  express = require( 'express' ),
  parser = require( 'body-parser' );

// express application
let app = express();

// serve static files
app.use( express.static( 'dist' ) );

// parse application/json
app.use( parser.json() );

// error handling
app.use( ( err, req, res, next ) => {
  console.error( err );
} );

// bind server on port
app.listen( 3000 );