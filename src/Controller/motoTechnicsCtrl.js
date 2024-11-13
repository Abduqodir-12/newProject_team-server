const Motorcycle = require('../Model/motoTechnicsModel');

const motoTechnicsCtrl = {
    addMoto: async (req, res) => {
        try {
            const {author_id, subCategoryId, bodyType} = req.body;
        } catch (error) {
            console.log(error);
            res.status(503).send({message: error.message})            
        }
    }
}

module.exports = motoTechnicsCtrl;