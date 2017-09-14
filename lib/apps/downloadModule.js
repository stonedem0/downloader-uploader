let id = req.params.id;
console.log( req );
console.log( 'Recevied param: ', id );
if ( id ) {
    let request = {};
    request[id] = /png/;
    console.log( 'Request created: ' + JSON.stringify( request ));

    db.findOne( request, (err, file) => {
        console.log( 'Db result:', err, file );
        if (!file[id]) {
            next(new Error( 'Something wrong' ));
        }
        else {
            let url = file[id];
            console.log( 'Response with url: ', url );
            res.setHeader( 'Content-disposition', 'attachment; filename=someFile.png' );
            res.setHeader( 'Content-type', 'image/png' );
            fs.createReadStream(url).pipe(res);
        }
    })
}
else {
    next(new Error( 'No id specified' ));
}