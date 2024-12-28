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
            const images = req.files?.images;
    
            if (!author_id || !year || !price || !color || !nameTransport) {
                return res.status(400).send({ message: "All required fields (author_id, year, price, color, nameTransport) must be filled." });
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
            console.error(error);
            res.status(503).send({ message: error.message });
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
    }
};

module.exports = transportCtrl;