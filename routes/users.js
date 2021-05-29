const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const users = require('../controllers/users');

router.route('/register')
    .get(users.formToRegister)
    .post(catchAsync(users.submitFormToRegister))

router.route('/login')
    .get(users.toFormToLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.submitFormToLogin)

router.get('/logout', users.toLogout)

module.exports = router;