/**
 * download module
 * @param app
 */
const 
     router = require( 'express' ).Router(),
     BodyParser = require( 'body-parser' ),
     fs = require( 'fs' ),
     // Datastore = require('nedb'),
     db = require('../db/dbConfig'),
     Joi = require( 'joi' ),
     celebrate = require( 'celebrate' ),
     schemas = {

        httpHeader: require('../lib/schemas/http-schema')
     };


 router.use(BodyParser.json());


 router.get('/download',
     celebrate({
      headers: schemas.httpHeader[0]
    }),
     ( req, res, next ) => {
         console.log(db);
        let file = db.find({pic1 :'./downloads/eva.png'}, (err, docs) =>{
            console.log(file);
        } );

        if ( !file ) {

            next( new Error( 'something wrong' ) );
        }
        else {
          
            fs.createReadStream(file).pipe(res);
            // res.download(file);
        }
    });

router.use(celebrate.errors());


// console.log(router);

module.exports = router;