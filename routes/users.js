const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const users = require('../controllers/users');
const { storeReturnTo } = require('../middleware');

router.route('/register')
    .get(users.formToRegister)
    .post(catchAsync(users.submitFormToRegister))

router.route('/login')
    .get(users.toFormToLogin)
    .post(
        // use storeReturnTo middleware to save the returnTo value from session to res.locals
        storeReturnTo,
        // passport.authenticate logs the user in and clears req.session
        passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), users.submitFormToLogin)

router.get('/logout', users.toLogout)

module.exports = router;