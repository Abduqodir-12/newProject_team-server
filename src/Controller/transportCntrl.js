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
        if(err) throw err
    })
}

const transportCtrl = {
    createTransport: async (req, res) => {
        try {
            const { author_id, subCategoryId, marka, model, bodyType, year, price, negotiable, engineSize, transmission, mileage, color, paintCondition, exterior, lights, interior, carOptions, additionalInfo, extraInfo, city, region, active, contactNumber } = req.body;
            
            const {images} = req.files;

            const newTransport = new Transport({author_id, subCategoryId, marka, model, bodyType, year, price, negotiable, engineSize, transmission, mileage, color, paintCondition, exterior, lights, interior, carOptions, additionalInfo, extraInfo, city, region, active, contactNumber});
                

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

            const createTransport = await Transport.create({newTransport, image});

            res.status(201).send({message: 'Transport created successfully', transport: createTransport});
        } catch (error) {
            console.log(error);
            res.status(503).send({ message: error.message });
        }
    },

    getAllTransport: async (req, res) => {
        try {
            let transports = await Transport.find()

            transports = transports.map((user) => {
                const { password, ...otherDetails } = user._doc;
                return otherDetails;
            });

            res.status(200).send({ message: "All transports", transports })
        } catch (error) {
            console.log(error);
            res.status(503).send({ message: error.message });
        }
    }
}

module.exports = transportCtrl;