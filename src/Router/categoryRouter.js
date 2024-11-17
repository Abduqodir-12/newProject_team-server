const categoryCtrl = require('../Controller/categoryCtrl')
const middlewear = require('../midleware/midleware')

const router = require('express').Router()

router.post('/add', middlewear, categoryCtrl.addCategory)
router.delete('/delete', middlewear, categoryCtrl.deleteCategory)
// router.get('/all', categoryCtrl.getAll)

module.exports = router