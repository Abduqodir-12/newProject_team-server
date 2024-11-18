const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        surname: {
            type: String,
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
            type: String,
            default: "User",
            enum: ["User", "Admin"]
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('User', userSchema);