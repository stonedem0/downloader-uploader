const express = require('express');
      router = express.Router();

const isAuthenticated = (req, res, next) => {

    if (req.isAuthenticated())
        return next();

    res.redirect('/');
};

module.exports = (passport) => {


    router.get('/', (req, res) => {

        res.render('index', { message: req.send('message') });
    });


    router.post('/login', passport.authenticate('login', {
        successRedirect: '/home',
        failureRedirect: '/'
        // failureFlash : true
    }));


    router.get('/signup', (req, res) => {
        res.render('register',{message: req.send('message')});
    });


    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/home',
        failureRedirect: '/signup'
        // failureFlash : true
    }));


    router.get('/home', isAuthenticated, (req, res) => {
        res.render('home', { user: req.user });
    });


    router.get('/signout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    return router;
};

