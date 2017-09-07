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

 db.insert({pic1 :'./downloads/eva.png'});

 router.use(BodyParser.json());


 router.get('/download',
     celebrate({
      headers: schemas.httpHeader[0]
    }),
     ( req, res, next ) => {
        db.findOne({pic1 :/png/}, (err, file) =>{
            console.log('THIS', file.pic1);
            console.log(db);
            if ( !file.pic1 ) {

                next( new Error( 'something wrong' ) );
            }
            else {
                res.setHeader('Content-disposition', 'attachment; filename=eva.png');
                res.setHeader('Content-type', 'image/png');
                fs.createReadStream(file.pic1).pipe(res);
                // res.download(file);
            }
        } );

    });

router.use(celebrate.errors());



// console.log(router);

module.exports = router;