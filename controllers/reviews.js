const Review = require('../models/reviews');
const Maker = require('../models/maker');

module.exports.createReview = async (req, res) => {
    const maker = await Maker.findById(req.params.id);
    const review = new Review(req.body.review);
    review.submittedBy = req.user._id;
    maker.reviews.push(review);
    // the reviews above refers to the array called reviews that we added to the maker properties in the model for Maker.
    await review.save();
    await maker.save();
    req.flash('thankyou', 'Thank you for leaving a review!');

    res.redirect(`/makers/${maker.id}`)
}

module.exports.deleteReveiw = async (req, res) => {
    const { id, reviewId } = req.params;
    await Maker.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })
    await Review.findByIdAndDelete(reviewId);
    req.flash('thankyou', 'Review was deleted. Thank you.');
    res.redirect(`/makers/${id}`);
}
