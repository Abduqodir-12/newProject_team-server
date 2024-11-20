const Motorcycle = require('../Model/motoTechnicsModel');
const cloudinary = require('cloudinary');
const fs = require('fs');

// Cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const removeTemp = (path) => {
    fs.unlink(path, (err) => {
        if (err) console.error(`Failed to delete temporary file: ${path}`, err);
    });
};

const motoTechnicsCtrl = {
    addMoto: async (req, res) => {
        try {
            const { author_id, subCategoryId, bodyType, year, price, region, city, phoneNumber } = req.body;

            if (!author_id || !subCategoryId || !bodyType || !year || !price || !region || !city || !phoneNumber) {
                return res.status(400).send({ message: 'Please fill in all fields!' });
            }

            if (req.files && req.files.images) {
                let { images } = req.files;
                images = Array.isArray(images) ? images : [images];

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
            console.error('Error in addMoto:', error);
            res.status(500).send({ message: 'Failed to add motorcycle. Please try again later.' });
        }
    },

    getAllMoto: async (req, res) => {
        try {
            const motorcycles = await Motorcycle.find();
            res.status(200).send({ message: "All motorcycles", motorcycles });
        } catch (error) {
            console.error('Error in getAllMoto:', error);
            res.status(500).send({ message: 'Failed to fetch motorcycles. Please try again later.' });
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
            console.error('Error in getOneMoto:', error);
            res.status(500).send({ message: 'Failed to fetch motorcycle. Please try again later.' });
        }
    },

    deleteMoto: async (req, res) => {
        try {
            const { id } = req.params;

            const motorcycle = await Motorcycle.findById(id);

            if (!motorcycle) {
                return res.status(404).json({ message: "Motorcycle not found" });
            }

            if (motorcycle.images && motorcycle.images.length > 0) {
                const deletePromises = motorcycle.images.map(image =>
                    cloudinary.v2.uploader.destroy(image.public_id)
                );
                await Promise.all(deletePromises);
            }

            await Motorcycle.findByIdAndDelete(id);

            res.status(200).json({ message: "Deleted successfully", motorcycle });
        } catch (error) {
            console.error('Error in deleteMoto:', error);
            res.status(500).send({ message: 'Failed to delete motorcycle. Please try again later.' });
        }
    },

    updateMoto: async (req, res) => {
        try {
            const { id } = req.params;
            const { author_id, subCategoryId, bodyType, year, price, region, city, phoneNumber } = req.body;

            const motorcycle = await Motorcycle.findById(id);
            if (!motorcycle) {
                return res.status(404).json({ message: "Motorcycle not found" });
            }

            if (!author_id || !subCategoryId || !bodyType || !year || !price || !region || !city || !phoneNumber) {
                return res.status(400).json({ message: "Please fill in all required fields!" });
            }

            let updatedImages = motorcycle.images;
            if (req.files && req.files.images) {
                let { images } = req.files;
                images = Array.isArray(images) ? images : [images];

                if (motorcycle.images && motorcycle.images.length > 0) {
                    const deletePromises = motorcycle.images.map(image =>
                        cloudinary.v2.uploader.destroy(image.public_id)
                    );
                    await Promise.all(deletePromises);
                }

                const uploadPromises = images.map(image =>
                    cloudinary.v2.uploader.upload(image.tempFilePath, { folder: "AvtoelonBeta" })
                );
                const uploadResults = await Promise.all(uploadPromises);

                updatedImages = uploadResults.map(upload => ({
                    url: upload.secure_url,
                    public_id: upload.public_id
                }));

                images.forEach(image => removeTemp(image.tempFilePath));
            }

            const updatedMoto = await Motorcycle.findByIdAndUpdate(id, req.body, { new: true });

            res.status(200).json({ message: "Motorcycle updated successfully", motorcycle: updatedMoto });
        } catch (error) {
            console.error('Error in updateMoto:', error);
            res.status(500).send({ message: 'Failed to update motorcycle. Please try again later.' });
        }
    }
};

module.exports = motoTechnicsCtrl;