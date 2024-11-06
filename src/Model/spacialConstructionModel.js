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
            require: true
        },
        price: {
            type: String,
            require: true
        },
        
    }
)