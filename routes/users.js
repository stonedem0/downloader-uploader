const
    router = require( 'express' ).Router(),
    passport = require( 'passport' ),
    BodyParser = require( 'body-parser' ),
    Joi = require( 'joi' ),
    Celebrate = require( 'celebrate' );

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

﻿router.post( '/login',[Celebrate({
    headers: Joi.object({
        'content-length': Joi.number().integer().positive(),
        'origin': Joi.string().regex(/^[a-zA-Z0-9]/),
        'content-type': Joi.string().valid('application/x-www-form-urlencoded').required()
    }).unknown(),
    body: Joi.object({
         'user': Joi.string(),
          'secret': Joi.string()
    })

}), passpoortFunc],
     ( req, res ) => {
         res.send(req.body);
    });

router.use(Celebrate.errors());

module.exports = router;
