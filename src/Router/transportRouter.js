const transportCtrl = require('../Controller/transportCtrl')
const middlewear = require('../midleware/midleware')

const tranportRouter = require('express').Router()

tranportRouter.post('/', middlewear, transportCtrl.createTransport)
tranportRouter.get('/', transportCtrl.getAllTransport)
tranportRouter.get('/:id', transportCtrl.getOneTransport)
tranportRouter.delete('/:id', middlewear, transportCtrl.deleteTransport)
tranportRouter.put('/:id', middlewear, transportCtrl.updateTransport)

module.exports = tranportRouter