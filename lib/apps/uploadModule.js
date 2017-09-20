const
    router = require( 'express' ).Router(),
    fs = require( 'fs' ),
    db = require( '../../db/dbConfig' );


function uploader (readyBusboy, callback) {
    
    let safe_filename =  Math.random().toString( 16 ).substr( 2 );
    let safe_path = __dirname + '/../upload/' + safe_filename;
    readyBusboy.on( 'file', ( fieldname, file, filename ) => {
        console.log( 'Uploading: ' + filename );
        file.pipe( fs.createWriteStream( safe_path ) );
        db.insert({title: 'Sample file',
                   filename: safe_filename
                    }, (err) => {
            if (err) {
                return new Error()
            }
        });
    
        console.log(filename)
    });
    readyBusboy.on('finish', () => {
        // res.end( 'Uploaded' );
    });
}

module.exports = uploader