const User = require('../models/user');

module.exports.formToRegister = (req, res) => {
    res.render('users/register');
}

module.exports.submitFormToRegister = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        // create new User using model
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        
        req.login(registeredUser, err => {
            if (err) return next(err);
            // login newly registered user
            req.flash('success', `Your're all set! Welcome to the Wine and Cheese App ${user.username}!`);
            res.redirect('/makers');
        })

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
    const redirectUrl = res.locals.returnTo || '/makers';
    res.redirect(redirectUrl);
}

module.exports.toLogout = (req, res) => {
    // passport update requires passing in a callback fn to req.logout() method
    req.logout((err) => {
        if (err) {
            return next(err)
        }
        req.flash('thankyou', "Goodbye. You are now logged out.");
        res.redirect('/makers')
    });
}
