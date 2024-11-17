const Motorcycle = require('../Model/motoTechnicsModel');
const cloudinary = require('cloudinary');
const fs = require('fs');

// cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const removeTemp = (path) => {
    fs.unlinkSync(path);
};

const motoTechnicsCtrl = {
    addMoto: async (req, res) => {
        try {
            const { author_id, subCategoryId, bodyType, year, price, region, city, phoneNumber } = req.body;

            if (!author_id || !subCategoryId || !bodyType || !year || !price || !region || !city || !phoneNumber) {
                return res.status(400).send({ message: 'Please fill in all fields!' });
            }

            if (req.files && req.files.images) {
                const { images } = req.files;
                const uploadPromises = images.map(image =>
                    cloudinary.v2.uploader.upload(image.tempFilePath, { folder: "AvtoelonBeta" })
                );

                const result = await Promise.all(uploadPromises);

                images.forEach(image => removeTemp(image.tempFilePath));

                req.body.images = result.map(upload => ({
                    url: upload.secure_url,
                    public_id: upload.public_id
                }));
            }

            const addMoto = await Motorcycle.create(req.body);

            res.status(201).send({ message: 'Motorcycle created successfully', Moto: addMoto });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: error.message || 'Server error occurred' });
        }
    },

    getAllMoto: async (req, res) => {
        try {
            const motorcycles = await Motorcycle.find();
            res.status(200).send({ message: "All motorcycles", motorcycles });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: error.message || 'Server error occurred' });
        }
    },

    getOneMoto: async (req, res) => {
        try {
            const { id } = req.params;
            const motorcycle = await Motorcycle.findOne({ _id: id });

            if (!motorcycle) {
                return res.status(404).json({ message: "Motorcycle not found" });
            }

            res.status(200).json({ message: "Motorcycle info", motorcycle });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: error.message || 'Server error occurred' });
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
            console.error(error);
            res.status(500).send({ message: error.message || 'Server error occurred' });
        }
    }
};

module.exports = motoTechnicsCtrl;