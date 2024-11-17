const regionCtrl = require('../controller/regionCtrl')
const middlewear = require('../middlewear/middleware')

const router = require('express').Router()

router.post('/add', middlewear, regionCtrl.addRegion);
router.put('/update', middlewear, regionCtrl.updateRegion);
router.get('/:regionId', regionCtrl.getOneRegion)
router.get('/all', regionCtrl.getAllRegion)

module.exports = router