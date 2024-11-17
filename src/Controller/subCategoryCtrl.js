const SubCategory = require('../Model/subCategory');
const cloudinary = require('cloudinary')


cloudinary.config({
 cloud_name: process.env.CLOUT_NAME,
 api_key: process.env.CLOUT_API_KEY,
 api_secret: process.env.CLOUT_API_SECRET
})

const revomeTemp = (path) => {
 fs.unlink(path, err => {
  if (err) throw err
 })
}

const subCategoryCtrl = {
 addSubCategory: async (req, res) => {
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
 updateSubCategory: async (req, res) => {
  try {
   const { id } = req.params
   const { title } = req.body;

   const subCategory = await SubCategory.findById(id)

   if(!subCategory) {
    return res.status(404).send({message: "Not found SubCategory"})
   }

   if (req.userIsAdmin) {
    const updateSubCategory = await Category.findByIdAndUpdate(
     id,
     { title },
     { new: true }
    )

    return res.status(200).send({ message: "Sub category Updated!", subCategory: updateSubCategory })
   }
  } catch (error) {
   res.status(503).send({ message: error.message });
   console.log(error.message);
  }
 },
 deleteSubCategory: async (req, res) => {
  try {
   const { subCategoryId } = req.params;
   const subCategory = await SubCategory.findOne({ _id: subCategoryId });

   if (subCategory) {
    subCategory.forEach(async item => {
     if (item?.image?.public_id) {
      await cloudinary.v2.uploader.destroy(
       item.image.public_id,
       async (err) => {
        if (err) {
         throw err;
        }
       }
      );
      await subCategory.findByIdAndDelete(item._id)
     }
    })
   } else {
    return res.status(404).send({ message: "Not found category!" })
   }

   await subCategory.deleteMany({ _id: subCategoryId });

   res.status(200).send({ message: "Deleted sub category!", subCategory })
  } catch (error) {
   res.status(503).send({ message: error.message });
   console.log(error.message);
  }
 },
 getOneSubCategory: async (req, res) => {
  try {
   const { subCategoryId } = req.params
   const getOneSubCategory = await SubCategory.findOne({ _id: subCategoryId });
   if (!getOneSubCategory) {
    return res.status(404).send({ message: "Not found category!" })
   }

   res.status(200).send({ message: "Found Category", category: getOneSubCategory })
  } catch (error) {
   console.log(error.message);
   res.status(503).send({ message: error.message });
  }
 },
 getAllSubCategory: async (req, res) => {
  try {
   const subCategories = await SubCategory.find()
   res.status(200).send({message: "Categories", subCategories})
  } catch (error) {
   console.log(error.message);
   res.status(503).send({ message: error.message });
  }
 }
}

module.exports = subCategoryCtrl