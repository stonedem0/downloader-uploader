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

 db.insert( {pic1 :'./downloads/eva.png',
            pic2 : './downloads/genji.png',
            pic3 : './downloads/blame.png'
            
           } );

// router.get( '/download', ( req, res ) => {
//    res.send( 'downloads' );
// });

router.get('/download/:id',
    celebrate({
        headers: schemas.httpHeader.mainSchema
    }),
    ( req, res, next ) => {
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
    });

router.use(celebrate.errors());

module.exports = router;