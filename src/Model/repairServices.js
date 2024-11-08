const mongoose = require('mongoose');

const repairServicesSchema = new mongoose.Schema(
    {
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
            type: String,
            enum: ['Ha', 'Yoq'],
            default: "Ha"
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
    }
)

module.exports = mongoose.model('RepairServices', repairServicesSchema);