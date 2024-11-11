const transportCtrl = require('../Controller/transportCntrl')
const middlewear = require('../midleware/midleware')

const tranportRouter = require('express').Router()

tranportRouter.post('/', middlewear, transportCtrl.createTransport)

module.exports = tranportRouter