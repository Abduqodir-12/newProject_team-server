const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../Model/userModel');

const userCtrl = {
    signup: async (req, res) => {
        try {
            const { name, surname, phoneNumber, role } = req.body;

            if(!name || !surname || !phoneNumber || !role || req.body.password) {
                res.status(403).send({message: 'fill in all the lines'})
            }

            const existingUser = await User.findOne({ phoneNumber });
            if (existingUser) {
                return res.status(400).send({ message: "User already exists" });
            }

            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            const newUser = new User.create({
                name,
                surname,
                phoneNumber,
                password: hashedPassword,
                role,
            });

            const {password, ...otherDetails} = newUser._doc

            const token = JWT.sign({ userId: savedUser._id, role: savedUser.role }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
            res.status(201).send({message: "User registered successfully", user: savedUser, token});
        } catch (error) {
            console.log(error);
            res.status(503).send({ message: error.message });
        }
    }
};

module.exports = userCtrl;