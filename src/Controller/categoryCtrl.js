const Category = require('../model/categoryModel');
const SubCategory = require('../model/subCategoryModel')
const Transport = require('../model/transportModel')
const SpacialConstruction = require('../model/spacialConstructionModel')
const RepairServices = require('../model/repairServices')
const SparePartsAndGoods = require('../model/SparePartsAndGoodsModel')
const Motorcycle = require('../model/MototechnicsModel')
const WaterTransport = require('../model/waterTransportModel')

const categoryCtrl = {
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

    getAllCategory: async (req, res) => {
        try {
            
        } catch (error) {
            console.log(error);
            res.status(503).send({message: error.message})            
        }
    },
    deleteCategory: async (req, res) => {
        try {
            const { categoryId } = req.params;
            const subCategories = await SubCategory.find({ categoryId: categoryId })
            if (subCategories) {
                if (req.userIsAdmin) {
                    subCategories.forEach(async subCategory => {
                        const deleteTransports = await Transport.find({ subCategoryId: subCategory._id });
                        const deleteSpacialConstructions = await SpacialConstruction.find({ subCategoryId: subCategory._id });
                        const deleteRepairServices = await RepairServices.find({ subCategoryId: subCategory._id });
                        const deleteSparePartsAndGoods = await SparePartsAndGoods.find({ subCategoryId: subCategory._id });
                        const deleteMotorcyclies = await Motorcycle.find({ subCategoryId: subCategory._id })
                        const deleteWaterTransports = await WaterTransport.find({ subCategoryId: subCategory._id })

                        deleteTransports.forEach(async deleteTransport => {
                            if (deleteTransport?.image?.public_id) {
                                await cloudinary.v2.uploader.destroy(
                                    car.image.public_id,
                                    async (err) => {
                                        if (err) {
                                            throw err;
                                        }
                                    }
                                );
                                await Transport.findByIdAndDelete(deleteTransport._id)
                            }
                        })

                        deleteSpacialConstructions.forEach(async deleteSpacialConstruction => {
                            if (deleteSpacialConstruction?.image?.public_id) {
                                await cloudinary.v2.uploader.destroy(
                                    car.image.public_id,
                                    async (err) => {
                                        if (err) {
                                            throw err;
                                        }
                                    }
                                );
                                await SpacialConstruction.findByIdAndDelete(deleteSpacialConstruction._id)
                            }
                        })

                        deleteRepairServices.forEach(async deleteRepairService => {
                            if (deleteRepairService?.image?.public_id) {
                                await cloudinary.v2.uploader.destroy(
                                    car.image.public_id,
                                    async (err) => {
                                        if (err) {
                                            throw err;
                                        }
                                    }
                                );
                                await RepairServices.findByIdAndDelete(deleteRepairService._id)
                            }
                        })

                        deleteSparePartsAndGoods.forEach(async deleteSparePartsAndGood => {
                            if (deleteSparePartsAndGood?.image?.public_id) {
                                await cloudinary.v2.uploader.destroy(
                                    car.image.public_id,
                                    async (err) => {
                                        if (err) {
                                            throw err;
                                        }
                                    }
                                );
                                await SparePartsAndGoods.findByIdAndDelete(deleteSparePartsAndGood._id)
                            }
                        })

                        deleteMotorcyclies.forEach(async deleteMotorcycly => {
                            if (deleteMotorcycly?.image?.public_id) {
                                await cloudinary.v2.uploader.destroy(
                                    car.image.public_id,
                                    async (err) => {
                                        if (err) {
                                            throw err;
                                        }
                                    }
                                );
                                await Motorcycle.findByIdAndDelete(deleteMotorcycly._id)
                            }
                        })

                        deleteWaterTransports.forEach(async deleteWaterTransports => {
                            if (deleteWaterTransports?.image?.public_id) {
                                await cloudinary.v2.uploader.destroy(
                                    car.image.public_id,
                                    async (err) => {
                                        if (err) {
                                            throw err;
                                        }
                                    }
                                );
                                await WaterTransport.findByIdAndDelete(deleteWaterTransports._id)
                            }
                        })

                        await Transport.deleteMany({ subCategoryId: subCategory._id });
                        await SpacialConstruction.deleteMany({ subCategoryId: subCategory._id });
                        await RepairServices.deleteMany({ subCategoryId: subCategory._id });
                        await SparePartsAndGoods.deleteMany({ subCategoryId: subCategory._id });
                        await Motorcycle.deleteMany({ subCategoryId: subCategory._id });
                        await WaterTransport.deleteMany({ subCategoryId: subCategory._id });
                    })


                    const deletedCategory = Category.deleteMany(categoryId)
                    return res.status(200).send({ message: "Deleted Category", category: deletedCategory })
                } else {
                    return res.status(405).send({ message: "Not allowed" });
                }
            } else {
                if (req.userIsAdmin) {
                    const deletedCategory = Category.deleteMany(categoryId)
                    return res.status(200).send({ message: "Deleted Category", category: deletedCategory })
                } else {
                    return res.status(405).send({ message: "Not allowed" });
                }
            }
        } catch (error) {
            res.status(503).send({ message: error.message });
            console.log(error.message);
        }
    }
}

module.exports = categoryCtrl;