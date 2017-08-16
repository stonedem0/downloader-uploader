const localStrategy   = require('passport-local').Strategy,
      User = require('../models/user');


module.exports = (passport) =>{

    passport.use('login', new localStrategy({
            passReqToCallback : true
        },
        (req, username, password, done) => {
            User.findOne({ 'username' :  username },
                (err, user) => {

                    if (err)
                        return done(err);

                    if (!user){
                        console.log('User Not Found with username '+username);
                        return done(null, false, req.send('message', 'User Not found.'));
                    }

                    if (!password(user, password)){
                        console.log('Invalid Password');
                        return done(null, false, req.send('message', 'Invalid Password'));
                    }

                    return done(null, user);
                }
            );

        })
    );


    // let isValidPassword = (user, password) =>{
    //     return bCrypt.compareSync(password, user.password);
    // }

};
