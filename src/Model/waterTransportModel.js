const mongoose = require('mongoose');

const waterTransportSchema = new mongoose.Schema({
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
    year: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    negotiable: {
        type: String,
    },
    description: {
        type: String,
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

module.exports = mongoose.model('WaterTransport', waterTransportSchema);