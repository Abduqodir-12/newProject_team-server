const subCategoryCtrl = require('../Controller/subCategoryCtrl')
const middlewear = require('../midleware/midleware')

const router = require('express').Router()

router.post('/', middlewear, subCategoryCtrl.addSubCategory)
router.delete('/delete', middlewear, subCategoryCtrl.deleteSubCategory)
router.put('/update', middlewear, subCategoryCtrl.updateSubCategory)
router.get("/:subCategoryId", subCategoryCtrl.getOneSubCategory);
router.get('/', subCategoryCtrl.getAllSubCategory)

module.exports = router