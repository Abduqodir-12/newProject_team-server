const Motorcycle = require('../Model/motoTechnicsModel');

const motoTechnicsCtrl = {
    addMoto: async (req, res) => {
        try {
            const {author_id, subCategoryId, bodyType, year, price, region, city, phoneNumber} = req.body;

            if(!author_id || !subCategoryId || !bodyType || !year || !price || !region || !city || phoneNumber) {
                return res.status(404).send({message: 'fill in all lines!'})
            }

            const addMoto = await Motorcycle.create(req.body)

            res.status(201).send({message: 'Created Moto Moto', Moto: addMoto})
        } catch (error) {
            console.log(error);
            res.status(503).send({message: error.message})            
        }
    },

    getAllMoto: async (req, res) => {
        try {
            let motorcycles = await Motorcycle.find()

            res.status(200).send({ message: "All motorcycles", motorcycles })
        } catch (error) {
            console.log(error);
            res.status(503).send({message: error.message})            
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
            res.status(503).send({message: error.message})
        }
    }
}

module.exports = motoTechnicsCtrl;