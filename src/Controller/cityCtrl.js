const City = require("../Model/cityModel");

const cityCtrl = {
    addCity: async (req, res) => {
        try {
            const { regionId, title } = req.body;

            if (!regionId || !title) {
                return res.status(404).send({ message: "Title is required" });
            }

            if (req.userIsAdmin) {
                const newCity = await City.create(req.body);
                return res.status(201).send({ message: "Created city", city: newCity });
            }
        } catch (error) {
            console.log(error.message);
            res.status(503).send({ message: error.message });
        }
    },
    updateCity: async (req, res) => {
        try {
            const { id } = req.params;
            const { title } = req.body;

            if (!title) {
                return res.status(404).send({ message: "Title is required" });
            }

            const city = await City.findById(id);

            if (!city) {
                return res.status(404).send({ message: "Not found category" });
            }

            if (req.userIsAdmin) {
                const updateCity = await City.findByIdAndUpdate(
                    id,
                    { title },
                    { new: true }
                )

                return res.status(200).send({ message: "City updated!", city: updateCity });
            }
        } catch (error) {
            console.log(error.message);
            res.status(503).send({ message: error.message });
        }
    },
    getOneCity: async (req, res) => {
        try {
            const { cityId } = req.params
            const getOneCity = await Category.findOne({ _id: cityId });
            if (!getOneCity) {
                return res.status(404).send({ message: "Not found city!" });
            }

            res.status(200).send({ message: "Found city", city: getOneCity });
        } catch (error) {
            console.log(error.message);
            res.status(503).send({ message: error.message });
        }
    },
    getAllCity: async (req, res) => {
        try {
            const cities = await City.find();
            res.status(200).send({ message: "Cities", cities });
        } catch (error) {
            console.log(error.message);
            res.status(503).send({ message: error.message });
        }
    }
}

module.exports = cityCtrl