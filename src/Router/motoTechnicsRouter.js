const motoTechnicsCtrl = require('../Controller/motoTechnicsCtrl')
const middlewear = require('../midleware/midleware')

const motorcycleRouter = require('express').Router()

motorcycleRouter.post('/', middlewear, motoTechnicsCtrl.addMoto)
motorcycleRouter.get('/', motoTechnicsCtrl.getAllMoto)
motorcycleRouter.get('/:id', motoTechnicsCtrl.getOneMoto)

module.exports = motorcycleRouter