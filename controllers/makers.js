const Maker = require('../models/maker');
const maptilerClient = require("@maptiler/client");
maptilerClient.config.apiKey = process.env.MAPTILER_API_KEY;
const { cloudinary } = require("../cloudinary");

module.exports.index = async (req, res) => {
    const makers = await Maker.find({});
    res.render('makers/index', { makers })
}

module.exports.cheesemakerindex = async (req, res) => {
    const makers = await Maker.find({});
    res.render('makers/cheesemakerindex', { makers })
}

module.exports.winemakerindex = async (req, res) => {
    const makers = await Maker.find({});
    res.render('makers/winemakerindex', { makers })
}
module.exports.renderNewForm = (req, res) => {
    res.render('makers/new');
}

module.exports.createMaker = async (req, res, next) => {
    // Maptiler Implementation
    const geoData = await maptilerClient.geocoding.forward(`${req.body.maker.city}, ${req.body.maker.state}`, { limit: 1 });
    const maker = new Maker(req.body.maker);
    maker.geometry = geoData.features[0].geometry;
    maker.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    maker.submittedBy = req.user._id;
    await maker.save();
    // console.log(maker);
    req.flash('success', `Success! Check-out ${maker.makername}!`);

    res.redirect(`/makers/${maker._id}`)
}

module.exports.showMaker = async (req, res) => {
    const maker = await Maker.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'submittedBy'
        }
    }).populate('submittedBy');
    // the above populates the entire review. If storing huge number of reviews will need to change how the data is stored and populated.
    // console.log(maker); <-For verbose logging
    if (!maker) {
        req.flash('error', 'Apologies! We cannot find that maker! See some of our other makers.');
        return res.redirect('/makers');
    }
    res.render('makers/show', { maker });
}

module.exports.renderEdit = async (req, res) => {
    const { id } = req.params;
    const maker = await Maker.findById(id);

    if (!maker) {
        req.flash('error', 'Apologies! We cannot find that maker! See some of our other makers.');
        return res.redirect('/makers');
    }
    res.render('makers/edit', { maker });
}

module.exports.updateMaker = async (req, res) => {

    const { id } = req.params;
    // console.log(req.body); //for verbose logging

    const maker = await Maker.findByIdAndUpdate(id, { ...req.body.maker });
    /// MapTiller Implementation
    const geoData = await maptilerClient.geocoding.forward(`${req.body.maker.city}, ${req.body.maker.state}`, { limit: 1 });
    maker.geometry = geoData.features[0].geometry;

    const imgs = (req.files.map(f => ({ url: f.path, filename: f.filename })));
    maker.images.push(...imgs);
    // the above logic is to adds images via the edit page
    await maker.save();

    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await maker.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
        console.log(maker)
    }
    //The above deletes the image file from cloudinary with a for loop and then removes with $pull the image from the maker in the db.
    req.flash('updated', `Thank you for updating ${maker.makername}! Don't forget to leave a review!`);
    res.redirect(`/makers/${maker._id}`)
}

module.exports.deleteMaker = async (req, res) => {
    const { id } = req.params;
    await Maker.findByIdAndDelete(id);
    req.flash('deleted', 'You deleted the maker! Thank you for updating the Wine and Cheese App.');
    res.redirect('/makers');
}
