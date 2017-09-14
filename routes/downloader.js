/**
 * download module
 * @param app
 */
const 
     router = require( 'express' ).Router(),
     fs = require( 'fs' ),
     db = require( '../db/dbConfig' ),
     celebrate = require( 'celebrate' ),
     schemas = {
        httpHeader: require( '../lib/schemas/http-schema' )
     };

// router.get( '/download', ( req, res ) => {
//    res.send( 'downloads' );
// });

router.get('/download/:id',
    celebrate({
        headers: schemas.httpHeader.mainSchema
    }),
    ( req, res, next ) => {
        let id = req.params.id;
        console.log( 'Recevied param: ', id );

        // error handling
        if ( !id )
            return next( new Error( 'No id specified' ) );
        // action
        db.findOne( {
            _id: id
        }, ( err, file ) => {

            console.log( 'Db result:', err, file );
            // console.log( 'Response with url: ', url );

            // error handling
            if ( err || !file )
                return next( new Error( 'Something wrong' ) );
            // action
            let filepath = __dirname + '/../upload/' + file.filename;
            res.setHeader( 'Content-disposition', 'attachment; filename=someFile.png' );
            res.setHeader( 'Content-type', 'image/' + file.filetype );
            fs.createReadStream( filepath ).pipe( res );
        } )
    });

router.use(celebrate.errors());

module.exports = router;