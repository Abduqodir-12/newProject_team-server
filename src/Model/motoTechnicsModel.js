const mongoose = require('mongoose');

const motorcycleSchema = new mongoose.Schema({
    author_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    subCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory',
        required: true,
    },
    bodyType: {
        type: String,
        required: true,
    },
    marka: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    negotiable: {
        type: Boolean,
    },
    transmission: {
        type: String,
    },
    km: {
        type: Number,
    },
    region: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    images: {
        type: [String]
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        default: true,
    },
});

module.exports = mongoose.model('Motorcycle', motorcycleSchema);