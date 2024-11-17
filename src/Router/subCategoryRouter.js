const subCategoryCtrl = require('../controller/subCategoryCtrl')
const middlewear = require('../middlewear/middleware')

const router = require('express').Router()

router.post('/add', middlewear, subCategoryCtrl.addSubCategory)
router.delete('/delete', middlewear, subCategoryCtrl.deleteSubCategory)
router.put('/update', middlewear, subCategoryCtrl.updateSubCategory)
router.get("/:subCategoryId", subCategoryCtrl.getOneSubCategory);
router.get('/all', subCategoryCtrl.getAllSubCategory)

module.exports = router