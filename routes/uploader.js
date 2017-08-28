const
    router = require( 'express' ).Router(),
    BodyParser = require( 'body-parser' ),
    Joi = require( 'joi' ),
    Celebrate = require( 'celebrate' ),
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

    upload = multer ({ storage: storage }).array( 'userPhoto', 10 );


/**
 * upload module
 * @param app
 */

router.use( BodyParser.json() );

router.post( '/upload',Celebrate({
    headers: Joi.object({
        'content-length': Joi.number().integer().positive(),
        'origin': Joi.string().regex(/^[a-zA-Z0-9]/),
        'content-type': Joi.string().regex(/^[a-zA-Z0-9]/)
    }).unknown()
}), ( req, res, next ) => {
    if ( !req.user )
        return next( new Error( 'unauthorized' ) );
    upload( req, res, ( err ) => {
        if ( err )
            return next( new Error( 'error-upload-file' ) );
        res.end( 'File is uploaded' );
        next();
    } );
} );

router.use(Celebrate.errors());

module.exports = router;

