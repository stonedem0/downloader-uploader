const
    express = require('express'),
    
    app = express(),
    // routes
    uploader = require('./routes/uploader')( app );

app.use( express.static(__dirname + '/public'));

app.get('/download', (req, res, next) =>{
    let file = __dirname + '/downloads/eva.png';
    console.log(file);
    res.download(file);
});

app.use(function(err, req, res, next) {
    console.log( 'ERR', err );
    res.send( { error: err.message, test: true } );
    // TODO res.end
    // res.send(err.message || 'bleh, page not found');
});


app.listen(3000, () => {
    console.log("Working on port 3000");
});