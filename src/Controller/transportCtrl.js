const Transport = require('../Model/transportModel');
const cloudinary = require('cloudinary');
const fs = require('fs');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const removeTemp = (path) => {
    fs.unlink(path, err => {
        if (err) throw err;
    });
};

const transportCtrl = {
    createTransport: async (req, res) => {
        try {
            const {
                author_id, subCategoryId, marka, model, bodyType, year,
                price, color, city, region, active, contactNumber
            } = req.body;

            if (!author_id || !subCategoryId || !marka || !model || !bodyType || !year ||
                !price || !color || !city || !region || !active || !contactNumber) {
                return res.status(404).send({ message: "Fill in the gaps!" });
            }

            let imagesArray = [];
            if (req.files?.images) {
                const images = Array.isArray(req.files.images) ? req.files.images : [req.files.images];

                for (const image of images) {
                    const uploadResult = await cloudinary.v2.uploader.upload(image.tempFilePath, {
                        folder: "AvtoelonBeta"
                    });

                    imagesArray.push({
                        url: uploadResult.secure_url,
                        public_id: uploadResult.public_id
                    });
                    removeTemp(image.tempFilePath);
                }
            }

            req.body.images = imagesArray;
            const createTransport = await Transport.create(req.body);

            res.status(201).send({ message: 'Transport created successfully', transport: createTransport });
        } catch (error) {
            console.error(error);
            res.status(503).send({ message: error.message });
        }
    },

    getAllTransport: async (req, res) => {
        try {
            const transports = await Transport.find();
            res.status(200).send({ message: "All transports", transports });
        } catch (error) {
            console.error(error);
            res.status(503).send({ message: error.message });
        }
    },

    getOneTransport: async (req, res) => {
        try {
            const { id } = req.params;
            const transport = await Transport.findById(id);

            if (!transport) {
                return res.status(404).json({ message: "Not found" });
            }

            res.status(200).json({ message: "Transport info", transport });
        } catch (error) {
            console.error(error);
            res.status(503).send({ message: error.message });
        }
    },

    deleteTransport: async (req, res) => {
        try {
            const { id } = req.params;

            const transport = await Transport.findById(id);
            if (!transport) {
                return res.status(404).send({ message: "Transport not found" });
            }

            if (transport.images && transport.images.length > 0) {
                for (const image of transport.images) {
                    await cloudinary.v2.uploader.destroy(image.public_id);
                }
            }

            await Transport.findByIdAndDelete(id);

            res.status(200).send({ message: "Transport deleted successfully" });
        } catch (error) {
            console.error(error);
            res.status(503).send({ message: error.message });
        }
    },

    updateTransport: async (req, res) => {
        try {
            const { id } = req.params;
            const {
                author_id, subCategoryId, marka, model, bodyType, year,
                price, color, city, region, active, contactNumber
            } = req.body;

            if (!author_id || !subCategoryId || !marka || !model || !bodyType || !year ||
                !price || !color || !city || !region || !active || !contactNumber) {
                return res.status(400).send({ message: "Fill in all required fields!" });
            }

            const transport = await Transport.findById(id);
            if (!transport) {
                return res.status(404).send({ message: "Transport not found" });
            }

            let updatedImages = transport.images;

            if (req.files?.images) {
                const newImages = Array.isArray(req.files.images) ? req.files.images : [req.files.images];

                for (const image of transport.images) {
                    await cloudinary.v2.uploader.destroy(image.public_id);
                }

                updatedImages = [];
                for (const image of newImages) {
                    const uploadResult = await cloudinary.v2.uploader.upload(image.tempFilePath, {
                        folder: "AvtoelonBeta"
                    });

                    updatedImages.push({
                        url: uploadResult.secure_url,
                        public_id: uploadResult.public_id
                    });

                    removeTemp(image.tempFilePath);
                }
            }

            const updatedTransport = await Transport.findByIdAndUpdate(id, req.body, { new: true });

            res.status(200).send({ message: "Transport updated successfully", transport: updatedTransport });
        } catch (error) {
            console.error(error);
            res.status(503).send({ message: error.message });
        }
    }
};

module.exports = transportCtrl;