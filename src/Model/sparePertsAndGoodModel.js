const mongoose = require('mongoose');

const partsAndGoodsSchema = new mongoose.Schema(
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
        title: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        negotiable: Boolean,
        condition: String,
        marka: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Marka",
            required: false
        },
        model: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "MarkaModels",
            required: false
        },
        delivery: Boolean,
        additionalInfo: String,
        image: Array,
        region: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Region",
            required: true
        },
        city: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "City",
            required: true
        },
        active: {
            type: Boolean,
            default: true
        },
        contactNumber: {
            type: String,
            required: true
        },
        categoryType: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SubCategory",
            required: true
        },
        season: String,
        diameter: Number,
        width: Number
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('SparePartsAndGoods', partsAndGoodsSchema);