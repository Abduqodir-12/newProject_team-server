const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true
        },
        surname: {
            type: String,
            require: true
        },
        phoneNumber: {
            type: String,
            require: true
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: Number,
            default: 100,
            enum: [100, 101]
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('User', userSchema);