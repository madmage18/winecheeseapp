const { makerSchema, reviewSchema } = require('./schemas.js');
const ExpressError = require('./utils/ExpressError');
const Maker = require('./models/maker');
const Review = require('./models/reviews');

module.exports.isLoggedIn = (req, res, next) => {
    console.log("REQ.USER...", req.user);
    if (!req.isAuthenticated()) {        
        req.session.returnTo = req.originalUrl;        
        req.flash('error', 'You must be signed in first.');
        return res.redirect('/login');
    }
    next();
}

module.exports.validateMaker = (req, res, next) => {
    const { error } = makerSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.isSubmittedBy = async (req, res, next) => {
    const { id } = req.params;
    const maker = await Maker.findById(id);
    if (!maker.submittedBy.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!')
        return res.redirect(`/makers/${id}`);
    }
    next();
}
// confirms the current logged in user is the same user who submittedBy.

module.exports.isReviewSubmittedBy = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.submittedBy.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!')
        return res.redirect(`/makers/${id}`);
    }
    next();
}

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

// save the returnTo value from the session (req.session.returnTo) to res.locals so its accessible for redirect after login. 
// Required as passport.js now clears session after successful login.
module.exports.storeReturnTo = (req, res, next) => {
    console.log(`storeReturnTo is running!`);
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }    
    next();
}