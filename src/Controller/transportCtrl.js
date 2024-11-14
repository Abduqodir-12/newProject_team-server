const Transport = require('../Model/transportModel')
const cloudinary = require('cloudinary')
const fs = require('fs')

// cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

const removeTemp = (path) => {
    fs.unlink(path, err => {
        if (err) throw err
    })
}

const transportCtrl = {
    createTransport: async (req, res) => {
        try {
            const { author_id, subCategoryId, marka, model, bodyType, year, price, mileage, color, city, region, active, contactNumber } = req.body;

            const { images } = req.files;

            const newTransport = new Transport({ author_id, subCategoryId, marka, model, bodyType, year, price, mileage, color, city, region, active, contactNumber });


            const result = await cloudinary.v2.uploader.upload(
                images.tempFilePath,
                {
                    folder: "AvtoElon",
                },
                async (err, result) => {
                    if (err) {
                        throw err;
                    }

                    removeTemp(images.tempFilePath);

                    return result;
                }
            );

            const image = { url: result.secure_url, public_id: result.public_id };

            const createTransport = await Transport.create({ newTransport, image });

            res.status(201).send({ message: 'Transport created successfully', transport: createTransport });
        } catch (error) {
            console.log(error);
            res.status(503).send({ message: error.message });
        }
    },

    getAllTransport: async (req, res) => {
        try {
            let transports = await Transport.find()

            res.status(200).send({ message: "All transports", transports })
        } catch (error) {
            console.log(error);
            res.status(503).send({ message: error.message });
        }
    },

    getOneTransport: async (req, res) => {
        try {
            const { id } = req.params
            let transport = await Transport.findOne({ _id: id });

            if (!transport) {
                return res.status(404).json({ message: "Not found" });
            }

            res.status(200).json({ message: "Transport info", transport });
        } catch (error) {
            console.log(error);
            res.status(503).send({ message: error.message })
        }
    }
}

module.exports = transportCtrl;