const mongoose = require('mongoose');

const spacialConstructionSchema = new mongoose.Schema(
    {
        authorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        subCategoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SubCategory',
            required: true
        },
        bodyType: {
            type: String,
            required: true,
        },
        marka: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Marka',
            required: true
        },
        model: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'MarkaModels',
            required: true
        },
        year: {
            type: String,
            required: true
        },
        price: {
            type: String,
            required: true
        },
        thereIsLittle: {
            type: String,
            enum: ['Ha', 'Yoq'],
            default: "Ha"
        },
        feulType: {
            type: String,
            required: true
        },
        typeOfSeats: {
            type: String,
            required: true
        },
        km: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: false
        },
        photo: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: Number,
            required: true
        },
        active: {
            default: true
        },
        type: {
            default: true
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('SpacialConstruction', spacialConstructionSchema);