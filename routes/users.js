const
    router = require( 'express' ).Router(),
    passport = require( 'passport' ),
    BodyParser = require( 'body-parser' ),
    Joi = require( 'joi' ),
    celebrate = require( 'celebrate' ),
    schemas = {
        http_header: require( '../lib/schemas/http-schema' ),
        login_data: require( '../lib/schemas/login-schema' )
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
    celebrate( { headers: schemas.http_header } ),
    celebrate( { body: schemas.login_data } ),
    // celebrate({
    //     headers: Joi.object({
    //         'content-length': Joi.number().integer().positive().greater(5),
    //         'origin': Joi.string().regex(/^[a-zA-Z0-9]/),
    //         'content-type': Joi.string().valid('application/x-www-form-urlencoded').required()
    //     }).unknown(),
    //     body: Joi.object({
    //          'user': Joi.string().alphanum().max(20).min(2).valid('test').required(),
    //           'secret': Joi.string().alphanum().max(20).min(2).valid('123').required()
    //     })
    // }),
    passpoortFunc ],
    ( req, res ) => {
         res.send(req.body);
    });

router.use( celebrate.errors() );

module.exports = router;
