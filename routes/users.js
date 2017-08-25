const
    router = require( 'express' ).Router(),
    passport = require( 'passport' ),
    BodyParser = require( 'body-parser' ),
    Joi = require( 'joi' ),
    Celebrate = require( 'celebrate' );


router.post( '/upload', Celebrate({
    headers: Joi.object({
        'content-length': Joi.number().integer().positive(),
        'origin': Joi.string().regex(/^[a-zA-Z0-9]/),
        'content-type': Joi.string().valid('application/json').required()
    }).unknown()
}));

router.post( '/login', ( req, res, next ) => {
    passport.authenticate( 'local', ( err, user, info ) => {
        if ( err )
            return next( err );
        if ( !user )
            return next( new Error( 'user-not-found' ) );
        req.login( user, ( err ) => {
            if ( err ) return next( err );
            res.send( {
                success: true,
                user: user,
                details: info
            } )
        } );
    } )( req, res, next );
});


// router.get( '/test', ( req, res ) => {
//     res.send( { test:1, user: req.user } );
// } );

router.use(Celebrate.errors());

module.exports = router;

