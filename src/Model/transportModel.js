const mongoose = require('mongoose');

const transportSchema = new mongoose.Schema(
    {
        author_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        subCategoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SubCategory",
            required: true
        },
        marka: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Marka",
            required: true
        },
        model: {
            type: String,
            ref: "MarkaModels",
            required: true
        },
        bodyType: {
            type: String
        },
        year: {
            type: Number,
            required: true
        },
        price: {
            type: String,
            required: true
        },
        negotiable: Boolean,
        engineSize: String,
        transmission: String,
        mileage: {
            type: Number,
            required: true
        },
        color: {
            type: String,
            required: true
        },
        paintCondition: String,
        exterior: String,
        lights: String,
        interior: String,
        carOptions: String,
        additionalInfo: String,
        extraInfo: String,
        images: {
            type: Array,
        },
        city: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "City",
            required: true
        },
        region: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Region",
            required: true
        },
        active: {
            type: Boolean,
            default: true
        },
        contactNumber: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Transport', transportSchema);