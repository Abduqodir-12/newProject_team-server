const categoryCtrl = require('../Controller/categoryCtrl');
const middlewear = require('../midleware/midleware');

const router = require('express').Router();

router.post('/', middlewear, categoryCtrl.addCategory);
router.delete('/:categoryId', middlewear, categoryCtrl.deleteCategory);
router.put('/:categoryId', middlewear, categoryCtrl.updateCategory);
router.get('/', categoryCtrl.getAllCategory)

module.exports = router