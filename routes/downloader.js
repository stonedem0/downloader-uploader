/**
 * download module
 * @param app
 */
const 
     router = require( 'express' ).Router(),
     BodyParser = require( 'body-parser' ),
     Joi = require( 'joi' ),
     celebrate = require( 'celebrate' );
     schemas = {

        httpHeader: require('../lib/schemas/http-schema')
     };


 router.use(BodyParser.json());


 router.get('/download',
     celebrate({
      headers: schemas.httpHeader[0]
    }),
     ( req, res, next ) => {
        let file = './downloads/eva.png';
        console.log();
        if ( !file ) {

            next( new Error( 'something wrong' ) );
        }
        else {
            console.log(res);
            console.log(file);
            res.download(file);
        }
    });

router.use(celebrate.errors());

module.exports = router;