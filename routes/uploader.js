const
    router = require( 'express' ).Router(),
    // fs = require( 'fs' ),
    // path = require( 'path' ),
    // readChunk = require('read-chunk'),
    // fileType = require('file-type'),
    // db = require( '../db/dbConfig' ),
    celebrate = require( 'celebrate' ),
    Busboy = require('busboy'),
    uploader = require('../lib/apps/uploadModule');

    schemas = {
        httpHeader: require( '../lib/schemas/http-schema' )
    };


/**
 * upload module
 * @param app
 */

//
// router.get( '/list', ( req, res ) => {
//     db.find( {}, ( err, files ) => {
//         res.send( files.map( ( file ) => {
//             return {
//                 id: file._id,
//                 title: file.title,
//                 type: file.filetype
//             }
//         } ) );
//     } );
// } );


router.post( '/upload',
    celebrate({
        headers: schemas.httpHeader.mainSchema
    }),
    ( req, res ) => {
        if(req.user) {
            let busboy = new Busboy( { headers: req.headers } );
            // busboy.on( 'file', ( fieldname, file, filename, mimetype ) => {
                uploader( busboy, ( err ) => {
                    if ( err ) {
                        console.log(err);
                        return new Error()
                    }
                    else {
                        res.send( 'uploaded' );
                        console.log( 'maybe done' )
                    }
                });
            // });
            busboy.on( 'error', ( err ) => {
                ﻿res.send( 500, 'Unable upload file', err );
            });

         console.log( 'almost done' );
         return req.pipe( busboy );
        }
    }
);

router.use(celebrate.errors());

module.exports = router;


