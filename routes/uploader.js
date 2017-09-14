const
    router = require( 'express' ).Router(),
    fs = require( 'fs' ),
    path = require( 'path' ),

    db = require( '../db/dbConfig' ),
    celebrate = require( 'celebrate' ),
    Busboy = require('busboy'),

    // multer = require( 'multer' ),
    // storage = multer.diskStorage({
    //     destination: ( req, file, callback ) => {
    //         callback( null, './upload' );
    //     },
    //     filename: ( req, file, callback ) => {
    //         callback( null, file.originalname );
    //         console.log( file) ;
    //     }
    // }),
    // upload = multer ({ storage: storage }).array( 'userPhoto', 10 ),

    schemas = {
        httpHeader: require( '../lib/schemas/http-schema' )
    };


/**
 * upload module
 * @param app
 */

// router.use( BodyParser.json() );
//
// router.post( '/upload',
//     celebrate({
//         headers: schemas.httpHeader.mainSchema
//     }),
//     ( req, res, next ) => {
//     if ( !req.user )
//         return next( new Error( 'unauthorized' ) );
//     upload( req, res, ( err ) => {
//         console.log(multer());
//         if ( err ) {
//             return next(new Error('error-upload-file'));
//         }
//         res.end( 'File is uploaded' );
//         next();
//     } );
// } );


router.get( '/list', ( req, res ) => {
    db.find( {}, ( err, files ) => {
        res.send( files.map( ( file ) => {
            return {
                id: file._id,
                title: file.title,
                type: file.filetype
            }
        } ) );
    } );
} );


router.post( '/upload',
    // celebrate({
    //     headers: schemas.httpHeader.mainSchema
    // }),
    ( req, res, next ) => {
        if ( !req.user )
            return next( new Error( 'unauthorized' ) );

        let safe_filename =  Math.random().toString( 16 ).substr( 2 );
        // let safe_path = path.join( os.tmpDir(), safe_filename );
        let safe_path = __dirname + '/../upload/' + safe_filename;

        let busboy = new Busboy( { headers: req.headers } );
        busboy.on( 'file', ( fieldname, file, filename ) => {
            console.log( 'Uploading: ' + filename );
            file.pipe( fs.createWriteStream( safe_path ) );
        });
        busboy.on('finish', () => {
            res.end( 'Uploaded' );
        });
        return req.pipe( busboy );
    }
);

// router.use(celebrate.errors());

module.exports = router;


