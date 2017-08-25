/**
 * download module
 * @param app
 */
const 
     router = require( 'express' ).Router(),
     BodyParser = require( 'body-parser' ),
     Joi = require( 'joi' ),
     Celebrate = require( 'celebrate' );


 router.use(BodyParser.json());

 router.use(Celebrate({
    headers: Joi.object({
        'host': Joi.string().regex(/^[a-zA-Z0-9]/),
        'connection': Joi.string().regex(/^[a-zA-Z0-9]/),
        'cache-control': Joi.string().regex(/^[a-zA-Z0-9]/),
        'upgrade-insecure-requests': Joi.string().regex(/^[a-zA-Z0-9]/),
        'user-agent': Joi.string().regex(/^[a-zA-Z0-9]/),
        'accept': Joi.string().regex(/^[a-zA-Z0-9]/),
        'accept-encoding': Joi.string().regex(/^[a-zA-Z0-9]/),
        'accept-language': Joi.string().regex(/^[a-zA-Z0-9]/),
        'cookie': Joi.string().regex(/^[a-zA-Z0-9]/),
        'referer': Joi.string().regex(/^[a-zA-Z0-9]/)
    }).unknown()
}));

 router.get('/download', ( req, res, next ) => {
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

router.use(Celebrate.errors());



module.exports = router;