const 
  router = require('express').Router(),
  passport = require('passport'),
  LocalStrategy = require( 'passport-local' ).Strategy,
  validator = require( 'validator' ),
  session = require( 'express-session' ),
  subscribersDb = require('../subscribers/subscribers-db' ),
  subscribersSpreadsheet = require('../subscribers/subscribers-spreadsheet' );

  // let users = new subscribersDb();


// router.post( '/login', 
//   passport.authenticate( 'local' ),
//   ( req, res ) => {

//     let successful = true;
//     let data = req.body;
//     let email = data.username;
//     // let password = data.password;

//     if ( !email ) {
//       // new Erorr( 'empty ');
//       return res.send( { error: { email: 'absent' } } );
//     }
//     if ( !validator.isEmail( email ) ) {
//       // new Erorr( 'email not valid');
//       return res.send( { error: { email: 'incorrect' } } );
//     }

//     return successful
//       ? res.send( { success: { subscribe: 'done', email: email } } )
//       : res.send( { error: { subscribe: 'fail' } } );
//   } 
//  );


router.post('/login', ( req, res, next ) => {
  let data = req.body,
      email = data.username,
      password = data.password;
  passport.authenticate('local', ( err, user, info ) => {
    if (err) { return next(err); }
    if ( !user ) { return res.send( { error: { subscribe: 'fail' } } ); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.send( { success: { subscribe: 'done', email: email } } );
    });
  })(req, res, next);
});


module.exports = router;