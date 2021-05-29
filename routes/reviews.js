const express = require('express');
const router = express.Router({ mergeParams: true });
const { validateReview, isLoggedIn, isReviewSubmittedBy } = require('../middleware')
const reviews = require('../controllers/reviews');

const Maker = require('../models/maker');
const Review = require('../models/reviews');

const { reviewSchema } = require('../schemas.js');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');

router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))

router.delete('/:reviewId', isLoggedIn, isReviewSubmittedBy, catchAsync(reviews.deleteReveiw))

module.exports = router;