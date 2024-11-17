const cityCtrl = require('../Controller/cityCtrl');
const middlewear = require('../midleware/midleware')

const router = require('express').Router()

router.post('/add', middlewear, cityCtrl.addCity);
router.put('/update', middlewear, cityCtrl.updateCity);
router.get('/:cityId', cityCtrl.getOneCity)
router.get('/all', cityCtrl.getAllCity)

module.exports = router