const 
  router = require('express').Router(),
  passport = require('passport'),
  LocalStrategy = require( 'passport-local' ).Strategy,
  validator = require( 'validator' ),
  session = require( 'express-session' ),
  subscribersDb = require('../subscribers/subscribers-db' ),
  subscribersSpreadsheet = require('../subscribers/subscribers-spreadsheet' );

  // let users = new subscribersDb();


router.post( '/login', 
  passport.authenticate( 'local' ),
  ( req, res ) => {

    let successful = true;
    let data = req.body;
    let email = data.username;
    // let password = data.password;

    if ( !email ) {
      // new Erorr( 'empty ');
      return res.send( { error: { email: 'absent' } } );
    }
    if ( !validator.isEmail( email ) ) {
      // new Erorr( 'email not valid');
      return res.send( { error: { email: 'incorrect' } } );
    }

    return successful
      ? res.send( { success: { subscribe: 'done', email: email } } )
      : res.send( { error: { subscribe: 'fail' } } );
  } 
 );



module.exports = router;
