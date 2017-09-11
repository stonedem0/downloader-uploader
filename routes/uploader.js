const
    router = require( 'express' ).Router(),
    BodyParser = require( 'body-parser' ),
    Joi = require( 'joi' ),
    celebrate = require( 'celebrate' ),
    passport = require( 'passport' ),
    multer = require( 'multer' ),
    storage = multer.diskStorage({
        destination: ( req, file, callback ) => {
            callback( null, './upload' );
        },
        filename: ( req, file, callback ) => {
            callback( null, file.originalname );
            console.log( file) ;
        }
    }),
    upload = multer ({ storage: storage }).array( 'userPhoto', 10 ),
    
    schemas = {
    httpHeader: require( '../lib/schemas/http-schema' )
    };


/**
 * upload module
 * @param app
 */

router.use( BodyParser.json() );

router.post( '/upload',
    celebrate({
        headers: schemas.httpHeader.mainSchema
    }),
    ( req, res, next ) => {
    if ( !req.user )
        return next( new Error( 'unauthorized' ) );
    upload( req, res, ( err ) => {
        if ( err )
            return next( new Error( 'error-upload-file' ) );
        res.end( 'File is uploaded' );
        next();
    } );
} );


router.use(celebrate.errors());

module.exports = router;


