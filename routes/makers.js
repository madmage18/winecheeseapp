const express = require('express');
const router = express.Router();
const makers = require('../controllers/makers');
const catchAsync = require('../utils/catchAsync');
const { makerSchema } = require('../schemas.js');
const { isLoggedIn, validateMaker, isSubmittedBy } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

const Maker = require('../models/maker');

router.route('/')
    .get(catchAsync(makers.index))
    .post(isLoggedIn, upload.array('image'), validateMaker, catchAsync(makers.createMaker))
// .post(upload.array('image'), (req, res) => {
//     console.log(req.body, req.files);
//     res.send("It worked?!")

router.route('/cheesemakers')
    .get(catchAsync(makers.cheesemakerindex))
    .post(isLoggedIn, upload.array('image'), validateMaker, catchAsync(makers.createMaker))

router.route('/winemakers')
    .get(catchAsync(makers.winemakerindex))
    .post(isLoggedIn, upload.array('image'), validateMaker, catchAsync(makers.createMaker))

router.get('/new', isLoggedIn, makers.renderNewForm)

router.route('/:id')
    .get(catchAsync(makers.showMaker))
    .put(isLoggedIn, isSubmittedBy, upload.array('image'), validateMaker, catchAsync(makers.updateMaker))
    .delete(isLoggedIn, isSubmittedBy, catchAsync(makers.deleteMaker))

router.get('/:id/edit', isLoggedIn, isSubmittedBy, catchAsync(makers.renderEdit));

module.exports = router;