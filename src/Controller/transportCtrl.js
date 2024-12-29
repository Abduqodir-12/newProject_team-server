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
        if (err) throw err
    })
};

const transportCtrl = {
    createTransport: async (req, res) => {
        try {
            const { author_id, year, price, color, nameTransport } = req.body;
            const images = req.files?.images[0];
            console.log(req.files);
    
            if (!author_id || !year || !price || !color || !nameTransport) {
                return res.status(400).send({
                    message: "All required fields (author_id, year, price, color, nameTransport) must be filled.",
                });
            }
    
            if (!images || !images.tempFilePath) {
                return res.status(400).send({ message: "Images must be uploaded." });
            }
    
            const result = await cloudinary.v2.uploader.upload(images.tempFilePath, {
                folder: "Albom",
            });
    
            if (typeof removeTemp === "function") {
                removeTemp(images.tempFilePath);
            }
    
            const newTransport = new Transport({
                author_id,
                year,
                price,
                color,
                nameTransport,
                images: {
                    url: result.secure_url, 
                    public_id: result.public_id, 
                },
            });
    
            await newTransport.save();
    
            res.status(201).send({ message: "Successfully created", transport: newTransport });
        } catch (error) {
            console.error("Error in createTransport:", error);
            res.status(503).send({ message: "Server error: " + error.message });
        }
    },    

    getAllTransport: async (req, res) => {
        try {
            const transports = await Transport.find();
            res.status(200).send({ message: "Successfully fetched all transports", transports });
        } catch (error) {
            console.log(error);
            res.status(503).send({ message: error.message });
        }
    },

    getOneTransport: async (req, res) => {
        try {
            const { id } = req.params;
            
            const transport = await Transport.findById(id)
            res.status(200).send({ message: 'Get One', transport })
        } catch (error) {
            console.log(error);
            res.status(503).send({ message: error.message })
        }
    },

    deleteTransport: async (req, res) => {
        try {
            const { id } = req.params;

            const transport = await Transport.findById(id);

            if (!transport) {
                return res.status(404).send({ message: "Transport not found." });
            }

            if (transport.images?.public_id) {
                try {
                    await cloudinary.v2.uploader.destroy(transport.images.public_id);
                } catch (err) {
                    console.error("Error deleting image from Cloudinary:", err);
                }
            }

            const delTransport = await Transport.findByIdAndDelete(id);

            res.status(200).send({ message: "Transport deleted successfully.", transport: delTransport });
        } catch (error) {
            console.error("Error in deleteTransport:", error);
            res.status(503).send({ message: "Server error: " + error.message });
        }
    },

    updateTransport: async (req, res) => {
        try {
            const { id } = req.params;
            const { year, price, color, nameTransport } = req.body;
            const images = req.files?.images;

            const transport = await Transport.findById(id);
            

            if (!transport) {
                return res.status(404).send({ message: "Transport not found." });
            }

            if (images && images.tempFilePath) {
                if (transport.images?.public_id) {
                    try {
                        await cloudinary.v2.uploader.destroy(transport.images.public_id);
                    } catch (err) {
                        console.error("Error deleting image from Cloudinary:", err);
                    }
                }

                const result = await cloudinary.v2.uploader.upload(images.tempFilePath, {
                    folder: "Albom",
                });

                transport.images = {
                    url: result.secure_url,
                    public_id: result.public_id,
                };
            }

            if (year) transport.year = year;
            if (price) transport.price = price;
            if (color) transport.color = color;
            if (nameTransport) transport.nameTransport = nameTransport;

            await transport.save();

            res.status(200).send({ message: "Transport updated successfully.", transport });
        } catch (error) {
            console.error("Error in updateTransport:", error);
            res.status(503).send({ message: "Server error: " + error.message });
        }
    }
};

module.exports = transportCtrl;