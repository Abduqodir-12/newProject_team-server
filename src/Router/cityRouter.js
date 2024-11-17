const cityCtrl = require('../controller/cityCtrl');
const middlewear = require('../middlewear/middleware')

const router = require('express').Router()

router.post('/add', middlewear, cityCtrl.addCity);
router.put('/update', middlewear, cityCtrl.updateCity);
router.get('/:cityId', cityCtrl.getOneCity)
router.get('/all', cityCtrl.getAllCity)

module.exports = router