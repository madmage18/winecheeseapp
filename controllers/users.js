const User = require('../models/user');
const passport = require('passport');

module.exports.formToRegister = (req, res) => {
    res.render('users/register');
}

module.exports.submitFormToRegister = async (req, res) => {
    try {
        // res.send(req.body) //to check the route... verbose logging. 
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', `Your're all set! Welcome to the Wine and Cheese App ${user.username}!`);
            res.redirect('/makers');
        })
        // console.log(registeredUser);

    } catch (e) {
        req.flash('error', e.message);
        res.redirect('register');
    }
}

module.exports.toFormToLogin = (req, res) => {
    res.render('users/login');
}

module.exports.submitFormToLogin = (req, res) => {
    req.flash('success', 'Welcome back!');
    const redirectUrl = req.session.returnTo || '/makers';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

module.exports.toLogout = (req, res) => {
    req.logout();
    req.flash('thankyou', "Goodbye. You are now logged out.")
    res.redirect('/makers')
}
