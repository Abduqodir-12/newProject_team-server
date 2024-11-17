const regionCtrl = require('../Controller/regionCtrl')
const middlewear = require('../midleware/midleware')

const router = require('express').Router()

router.post('/add', middlewear, regionCtrl.addRegion);
router.put('/update', middlewear, regionCtrl.updateRegion);
router.get('/:regionId', regionCtrl.getOneRegion)
router.get('/all', regionCtrl.getAllRegion)

module.exports = router