const

    // param = require( '../../routes/downloader'),
    express = require( 'express' ),
    fs = require( 'fs' ), 
    db = require( '../../db/dbConfig' );

function downloader(id, callback) {
    console.log(id);
    console.log('Recevied param: ', id);
    if (id) {
        let request = {"_id": id};
        console.log('Request created: ' + request);
        // console.log('Request created: ' + JSON.stringify, request);

        db.findOne(request, (err, file) => {
            console.log('Db result:', err, file);

            if (err) {
                callback(err);
            } else {
                if (!file || !file.filename) {
                    callback(new Error('Not found'));
                } else {
                    let url = __dirname + '/upload/' + file.filename;
                    console.log('Found object with url: ', JSON.stringify(file), 'Url: ', url);
                    callback(null, url);
                }
            }
        })
    } else {
        callback(new Error('No id specified'));
    }
}

module.exports = downloader;