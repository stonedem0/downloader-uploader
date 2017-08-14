const
    express = require( 'express' ),
    logger = require('morgan'),
    app = express();


app.use( logger( 'dev' ) );

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
