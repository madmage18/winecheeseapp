const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');
// const { number } = require('joi');

// below defined extension, method to use on client available text fields to sanitize html
const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': 'You cannot include HTML in the Add Maker form. Please try again.'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
});

const Joi = BaseJoi.extend(extension)

module.exports.makerSchema = Joi.object({
    maker: Joi.object({
        makername: Joi.string().required().escapeHTML(),
        makertype: Joi.string().required(),
        city: Joi.string().required().escapeHTML(),
        state: Joi.string().required().escapeHTML(),
        products: Joi.string().required().escapeHTML(),
        //image: Joi.string().required(),
        description: Joi.string().required().escapeHTML(),
        website: Joi.string().required()
        // submittedBy: Joi.string().required()
    }).required(),
    deleteImages: Joi.array()
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        body: Joi.string().required().escapeHTML()
    }).required()
})