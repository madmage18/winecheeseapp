const mongoose = require('mongoose');
const { reviewSchema } = require('../schemas');
const Review = require('./reviews')
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: String,
    filename: String
});

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
});

const opts = { toJSON: { virtuals: true } };

const MakerSchema = new Schema({
    makername: String,
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    images: [ImageSchema],
    makertype: String,
    city: String,
    state: String,
    products: String,
    image: String,
    // will be deleting this image key value pair after deleting it from joi!
    description: String,
    website: String,
    submittedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]

}, opts);

MakerSchema.virtual('properties.popUpMarkup').get(function () {
    return `<a href="/makers/${this.id}"> ${this.makername} </a><p>
    ${this.products.toLowerCase()}`;
});

MakerSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})
module.exports = mongoose.model('Maker', MakerSchema);
