const Region = require("../Model/regionModel");

const regionCtrl = {
    addRegion: async (req, res) => {
        try {
            const { title } = req.body;

            if (!title) {
                return res.status(404).send({ message: "Title is required" })
            }

            if (req.userIsAdmin) {
                const newRegion = await Region.create(req.body)
                return res.status(201).send({ message: "Created region", region: newRegion })
            }
        } catch (error) {
            console.log(error.message);
            res.status(503).send({ message: error.message });
        }
    },
    updateRegion: async (req, res) => {
        try {
            const { id } = req.params;
            const { title } = req.body;

            if (!title) {
                return res.status(404).send({ message: "Title is required" })
            }

            const region = await Region.findById(id)

            if (!region) {
                return res.status(404).send({ message: "Not found region" })
            }

            if (req.userIsAdmin) {
                const updateRegion = await Region.findByIdAndUpdate(
                    id,
                    { title },
                    { new: true }
                )

                return res.status(200).send({ message: "Region updated!", region: updateRegion })
            }
        } catch (error) {
            console.log(error.message);
            res.status(503).send({ message: error.message });
        }
    },
    getOneRegion: async (req, res) => {
        try {
            const { regionId } = req.params
            const getOneRegion = await Category.findOne({ _id: regionId });
            if (!getOneRegion) {
                return res.status(404).send({ message: "Not found category!" })
            }

            res.status(200).send({ message: "Found region", region: getOneRegion })
        } catch (error) {
            console.log(error.message);
            res.status(503).send({ message: error.message });
        }
    },
    getAllRegion: async (req, res) => {
        try {
            const regions = await Region.find()
            res.status(200).send({ message: "Regions", regions })
        } catch (error) {
            console.log(error.message);
            res.status(503).send({ message: error.message });
        }
    }
}

module.exports = regionCtrl