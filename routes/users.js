const
    router = require( 'express' ).Router(),
    passport = require( 'passport' ),
    BodyParser = require( 'body-parser' ),
    Joi = require( 'joi' ),
    celebrate = require( 'celebrate' ),
    schemas = {
        httpHeader: require( '../lib/schemas/http-schema' ),
        loginData: require( '../lib/schemas/login-schema' )
    };

const passpoortFunc = ( req, res, next ) => {
    passport.authenticate('local', (err, user, info) => {
        if (err)
            return next(err);
        if (!user)
            return next(new Error('user-not-found'));
        req.login(user, (err) => {
            if (err) return next(err);
            res.send({
                success: true,
                user: user,
                details: info
            })
        })
    })(req, res, next)
};

﻿router.post( '/login',[
    celebrate( { headers: schemas.httpHeader.mainSchema } ),
    celebrate( { body: schemas.loginData } ),
    passpoortFunc ],
    ( req, res ) => {
         res.send( req.body );
    });

router.use( celebrate.errors() );

module.exports = router;
