const SubCategory = require('../Model/subCategory');

const subCategoryCtrl = {
    addSubCategory: async (req, res) => {
        try {
            if (!req.body.title) {
                return res.status(404).send({ message: "Title is required!" });
            }

            if (req.userIsAdmin) {
                const newSubCategory = await SubCategory.create(req.body);
                return res.status(201).send({ message: "SubCategory created!", SubCategory: newSubCategory });
            } else {
                return res.status(403).send({ message: "Access denied. Admin privileges required." });
            }
        } catch (error) {
            res.status(503).send({ message: error.message });
            console.log(error.message);
        }
    },
    updateSubCategory: async (req, res) => {
        try {
            const { id } = req.params;
            const { title } = req.body;

            const subCategory = await SubCategory.findById(id);

            if (!subCategory) {
                return res.status(404).send({ message: "SubCategory not found!" });
            }

            if (req.userIsAdmin) {
                const updateSubCategory = await SubCategory.findByIdAndUpdate(
                    id,
                    { title },
                    { new: true }
                );

                return res.status(200).send({ message: "SubCategory updated!", subCategory: updateSubCategory });
            } else {
                return res.status(403).send({ message: "Access denied. Admin privileges required." });
            }
        } catch (error) {
            res.status(503).send({ message: error.message });
            console.log(error.message);
        }
    },
    deleteSubCategory: async (req, res) => {
        try {
            const { id } = req.params;

            const subCategory = await SubCategory.findById(id);

            if (!subCategory) {
                return res.status(404).send({ message: "SubCategory not found!" });
            }

            if (req.userIsAdmin) {
                await SubCategory.findByIdAndDelete(id);
                return res.status(200).send({ message: "SubCategory deleted successfully!" });
            } else {
                return res.status(403).send({ message: "Access denied. Admin privileges required." });
            }
        } catch (error) {
            console.log(error.message);
            res.status(503).send({ message: error.message });
        }
    },
    getOneSubCategory: async (req, res) => {
        try {
            const { subCategoryId } = req.params;
            const getOneSubCategory = await SubCategory.findOne({ _id: subCategoryId });
            if (!getOneSubCategory) {
                return res.status(404).send({ message: "SubCategory not found!" });
            }

            res.status(200).send({ message: "SubCategory found!", subCategory: getOneSubCategory });
        } catch (error) {
            console.log(error.message);
            res.status(503).send({ message: error.message });
        }
    },
    getAllSubCategory: async (req, res) => {
        try {
            const subCategories = await SubCategory.find();
            res.status(200).send({ message: "SubCategories retrieved!", subCategories });
        } catch (error) {
            console.log(error.message);
            res.status(503).send({ message: error.message });
        }
    }
};

module.exports = subCategoryCtrl;