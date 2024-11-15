const Motorcycle = require('../Model/motoTechnicsModel');
const cloudinary = require('cloudinary')
const fs = require('fs')

// cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

const motoTechnicsCtrl = {
    addMoto: async (req, res) => {
        try {
            const { author_id, subCategoryId, bodyType, year, price, region, city, phoneNumber } = req.body;

            if (!author_id || !subCategoryId || !bodyType || !year || !price || !region || !city || phoneNumber) {
                return res.status(404).send({ message: 'fill in all lines!' })
            }

            if (req.files.images) {
                const { images } = req.files;
                const result = await cloudinary.v2.uploader.upload(
                    images.map(image => {
                        image.tempFilePath, { folder: "AvtoelonBeta" }, async (err, result) => {
                            if (err) {
                                throw err
                            }
                            revomeTemp(image.tempFilePath)
                            return { url: result.secure_url, public_id: result.public_id }
                        }
                    })
                )
                return result
            }

            req.body.images = result

            const addMoto = await Motorcycle.create(req.body)

            res.status(201).send({ message: 'Created Moto Moto', Moto: addMoto })
        } catch (error) {
            console.log(error);
            res.status(503).send({ message: error.message })
        }
    },

    getAllMoto: async (req, res) => {
        try {
            let motorcycles = await Motorcycle.find()

            res.status(200).send({ message: "All motorcycles", motorcycles })
        } catch (error) {
            console.log(error);
            res.status(503).send({ message: error.message })
        }
    },

    getOneMoto: async (req, res) => {
        try {
            const { id } = req.params
            let motorcycle = await Motorcycle.findOne({ _id: id });

            if (!motorcycle) {
                return res.status(404).json({ message: "Not found" });
            }

            res.status(200).json({ message: "Motorcycle info", motorcycle });
        } catch (error) {
            console.log(error);
            res.status(503).send({ message: error.message })
        }
    },

    deleteMoto: async (req, res) => {
        try {
            const { id } = req.params;

            const deletedMoto = await Motorcycle.findByIdAndDelete(id);

            if (!deletedMoto) {
                return res.status(404).json({ message: "Motorcycle not found" });
            }

            res.status(200).json({ message: "Deleted successfully", motorcycle: deletedMoto });
        } catch (error) {
            console.log(error);
            res.status(503).send({ message: error.message })
        }
    }
}

module.exports = motoTechnicsCtrl;