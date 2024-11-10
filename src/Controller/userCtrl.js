const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')
const User = require('../model/userModel')
const Transport = require('../model/transportModel')
const SpacialConstruction = require('../model/spacialConstructionModel')
const RepairServices = require('../model/repairServices')
const SparePartsAndGoods = require('../model/SparePartsAndGoodsModel')

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
    const userTransports = await Transport.find({ author_id: userId })
    const userSpacialConstructions = await SpacialConstruction.find({ author_id: userId })
    const userRepairServices = await RepairServices.find({ author_id: userId })
    const userSparePartsAndGoods = await SparePartsAndGoods.find({ author_id: userId })

    userTransports.forEach(async userTransport => {
     if (userTransport?.image?.public_id) {
      await cloudinary.v2.uploader.destroy(
       car.image.public_id,
       async (err) => {
        if (err) {
         throw err;
        }
       }
      );
      await Transport.findByIdAndDelete(userTransport._id)
     }
    })

    userSpacialConstructions.forEach(async SpacialConstruction => {
     if (SpacialConstruction?.image?.public_id) {
      await cloudinary.v2.uploader.destroy(
       car.image.public_id,
       async (err) => {
        if (err) {
         throw err;
        }
       }
      );
      await SpacialConstruction.findByIdAndDelete(SpacialConstruction._id)
     }
    })

    userRepairServices.forEach(async userRepairService => {
     if (userRepairService?.image?.public_id) {
      await cloudinary.v2.uploader.destroy(
       car.image.public_id,
       async (err) => {
        if (err) {
         throw err;
        }
       }
      );
      await RepairServices.findByIdAndDelete(userRepairService._id)
     }
    })

    userSparePartsAndGoods.forEach(async sparePartsAndGood => {
     if (sparePartsAndGood?.image?.public_id) {
      await cloudinary.v2.uploader.destroy(
       car.image.public_id,
       async (err) => {
        if (err) {
         throw err;
        }
       }
      );
      await RepairServices.findByIdAndDelete(sparePartsAndGood._id)
     }
    })

    if (!deletedUser) {
     return res.status(404).send({ message: "Not found" });
    }

    return res.status(200).send({ message: "Deleted succesfully", deletedUser });
   }
   res.status(405).send({ message: "Not allowed" });
  } catch (error) {
   res.status(503).send(error.message);
  }
 },
}

module.exports = userCtrl