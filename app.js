const
    express = require('express'),
    app = express(),
    // routes
    uploader = require('./routes/uploader')( app ),
    downloader = require('./routes/downloader')( app );

app.use( express.static(__dirname + '/public'));
app.use(function(err, req, res, next) {
    console.log(err.stack);
    res.send( { error: err.message, test: false } );
    next();
    res.end();
    // TODO res.end
    // res.send(err.message || 'bleh, page not found');
});


app.listen(3000, () => {
    console.log("Working on port 3000");
});