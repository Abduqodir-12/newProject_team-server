const SubCategory = require('../model/subCategoryModel');

const subCategoryCtrl = {
    addCategory: async (req, res) => {
        try {
            if (!req.body.title) {
                return res.status(404).send({ message: "Title is required!" })
            }

            if (req.userIsAdmin) {
                const newCategory = await Category.create(title);
                return res.status(201).send({ message: "Category created!", category: newCategory })
            }
        } catch (error) {
            res.status(503).send({ message: error.message });
            console.log(error.message);
        }
    },
}

module.exports = subCategoryCtrl