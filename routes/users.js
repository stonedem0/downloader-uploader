const
    router = require('express').Router(),
    passport = require( 'passport' );

// router.get('/register', (req, res) => {
//     res.render('register');
// });

// router.post( '/login',
//     passport.authenticate( 'local' ),  //, { failureRedirect: '/login' } ),
//     function( req, res ) {
//         res.send( { success: true } );
//         // res.redirect('/');
//     } );

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
            
        }
        if (! user) {
            return res.send(401,{ success : false, message : 'authentication failed' });

        }
        req.login(user, (err) => {
            if(err){
                return next(err);
            }
            return res.send({ success : true, message : 'authentication succeeded' });
        });
    })(req, res, next);
});

router.get( '/test', ( req, res ) => {
    res.send( { test:1, user: req.user } );
} );

// router.post('/index', (req, res) => {
//     // let name = req.body.name;
//     let email = trq.body.email;
//     let password = req.body.password;
//
//     console.log(email);
// });

module.exports = router;