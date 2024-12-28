const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')
const User = require('../Model/userModel')
const Transport = require('../Model/transportModel')

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const userCtrl = {
    signup: async (req, res) => {
        try {
            const { phoneNumber, role } = req.body;

            if (!phoneNumber || !req.body.password) {
                return res.status(404).send({ message: "Fill in the gaps!" })
            }

            const oldUser = await User.findOne({ phoneNumber })

            if (oldUser) {
                return res.status(404).send({ message: "This is Phone Number exits!" })
            }

            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            const newUser = await User.create({
                name: req.body.name,
                surname: req.body.surname,
                phoneNumber,
                password: hashedPassword,
                role
            });

            const { password, ...otherDetails } = newUser._doc
            const token = JWT.sign(otherDetails, JWT_SECRET_KEY);

            res.status(201).send({ message: "Sign Up Successfully!", user: otherDetails, token })
        } catch (error) {
            console.log(error.message);
            res.status(503).send({ message: error.message });
        }
    },
    login: async (req, res) => {
        try {
            const { phoneNumber } = req.body;
            if (!phoneNumber || !req.body.password) {
                return res.status(404).send({ message: "Fill in the gaps!" })
            }

            const findUser = await User.findOne({ phoneNumber })

            if (!findUser) {
                return res.status(404).send({ message: "PhoneNumber or password wrong!" })
            }

            const comparePassword = await bcrypt.compare(req.body.password, findUser.password);

            if (!comparePassword) {
                return res.status(404).send({ message: "PhoneNumber or password wrong!" })
            }
            const { password, ...otherDetails } = findUser._doc
            const token = JWT.sign(otherDetails, JWT_SECRET_KEY);
            res.status(200).send({ message: "Login Successfully!", user: otherDetails, token })
        } catch (error) {
            console.log(error.message);
            res.status(503).send({ message: error.message });
        }
    },
    getAll: async (req, res) => {
        try {
            let users = await User.find()

            users = users.map((user) => {
                const { password, ...otherDetails } = user._doc;
                return otherDetails;
            });

            res.status(200).send({ message: "All users", users })
        } catch (error) {
            console.log(error.message);
            res.status(503).send({ message: error.message });
        }
    },
    getOneUser: async (req, res) => {
        const { userId } = req.params;
        try {
            let user = await User.findById(userId);

            if (!user) {
                return res.status(404).json({ message: "Not found" });
            }

            const { password, ...otherDetails } = user._doc;

            res.status(200).json({ message: "User info", user: otherDetails });
        } catch (error) {
            res.status(503).json({ message: error.message });
        }
    },
    deleteUser: async (req, res) => {
        try {
            const { userId } = req.params;
    
            if (userId == req.user._id || req.userIsAdmin == "Admin") {
                const deletedUser = await User.findByIdAndDelete(userId);
    
                if (!deletedUser) {
                    return res.status(404).send({ message: "User not found" });
                }
    
                const userTransports = await Transport.find({ author_id: userId });
    
                for (const userTransport of userTransports) {
                    if (userTransport?.images?.public_id) {
                        try {
                            await cloudinary.v2.uploader.destroy(userTransport.image.public_id);
                        } catch (err) {
                            console.error("Error deleting image from Cloudinary:", err);
                        }
                    }
    
                    await Transport.findByIdAndDelete(userTransport._id);
                }
    
                return res.status(200).send({ message: "Deleted successfully", deletedUser });
            }
    
            res.status(405).send({ message: "Not allowed" });
        } catch (error) {
            console.error("Error in deleteUser:", error);
            res.status(503).send({ message: "Server error: " + error.message });
        }
    }    
}

module.exports = userCtrl