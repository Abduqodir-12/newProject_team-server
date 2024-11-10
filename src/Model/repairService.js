const mongoose = require('mongoose');

const repairServicesSchema = new mongoose.Schema(
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
        bodyType: {
            type: String,
            required: true,
        },
        marka: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Marka',
            required: true
        },
        adName: {
            type: String,
            required: true
        },
        typeOfService: {
            type: String,
            required: true
        },
        thereIsLittle: {
            type: Boolean
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
            type: Boolean,
            default: true
        },
        type: {
            type: Boolean,
            default: true
        }
    }
)

module.exports = mongoose.model('RepairServices', repairServicesSchema);