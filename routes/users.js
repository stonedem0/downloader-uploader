const
    router = require('express').Router(),
    passport = require( 'passport' );

router.post('/login', (req, res, next) => {
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

router.get( '/test', ( req, res ) => {
    res.send( { test:1, user: req.user } );
} );


module.exports = router;

