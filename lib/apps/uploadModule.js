const
    fs = require( 'fs' ),
    db = require( '../../db/dbConfig' );


function uploader (file, callback) {
    let safe_filename =  Math.random().toString( 16 ).substr( 2 );
    let safe_path = __dirname + '/../../upload/' + safe_filename;
    file.on( 'file', ( fieldname, file, filename, mimetype ) => {
        console.log('file: ' + filename, mimetype);
        file.pipe( fs.createWriteStream( safe_path ) );
        console.log('stream ok')
    });
    file.on( 'finish', () => {
        db.insert( { title: 'Sample file',
            filename: safe_filename
            },
            ( err, doc ) => {
            if ( err ) {
                callback( err, doc.doc )
            }
        });
    });
}

module.exports = uploader;



