const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../Model/userModel');

const userCtrl = {
    signup: async (req, res) => {
        try {
            const { name, surname, phoneNumber, password, role } = req.body;

            const existingUser = await User.findOne({ phoneNumber });
            if (existingUser) {
                return res.status(400).send({ message: "User already exists" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new User({
                name,
                surname,
                phoneNumber,
                password: hashedPassword,
                role,
            });

            const savedUser = await newUser.save();

            const token = JWT.sign({ userId: savedUser._id, role: savedUser.role }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
            res.status(201).send({message: "User registered successfully", token, user: savedUser});
        } catch (error) {
            console.log(error);
            res.status(503).send({ message: error.message });
        }
    }
};

module.exports = userCtrl;