const mongoose = require('mongoose');

const transportSchema = new mongoose.Schema(
    {
        author_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        nameTransport: {
            type: String,
            required: true
        },
        year: {
            type: Number,
            required: true
        },
        price: {
            type: String,
            required: true
        },
        color: {
            type: String,
            required: true
        },
        images: {
            type: Object,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Transport', transportSchema);