const
    express = require( 'express' ),
    logger = require('morgan'),

    app = express(),
    
    // routes
    uploader = require( './routes/uploader' )( app ),
    downloader = require( './routes/downloader' )( app );


app.use(logger('dev'));

app.use( express.static(__dirname + '/public' ));

app.use( (req, res) => {
    res.status(404).send('Not found');
    });

app.listen(3000, () => {
    console.log( "Working on port 3000" );
    });