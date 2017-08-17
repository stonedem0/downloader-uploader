const
    router = require('express').Router(),
    passport = require( 'passport' ),
    multer = require( 'multer' ),
    storage = multer.diskStorage({
        destination: ( req, file, callback ) => {
            callback(null, './upload');
        },
        filename: ( req, file, callback ) => {
            callback( null, file.originalname );
            console.log(file);
        }
    }),

    upload = multer ({ storage: storage }).array( 'userPhoto', 10 );


/**
 * upload odule
 * @param app
 */

router.post( '/upload', ( req, res, next ) => {
    if ( !req.user )
        return next( new Error( 'unauthorized' ) );

    upload( req, res, ( err ) => {
        if ( err )
            return next( new Error( 'error-upload-file' ) );
        res.end( 'File is uploaded' );
        next();
    } );
} );

module.exports = router;
