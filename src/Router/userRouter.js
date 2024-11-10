const userCtrl = require('../Controller/userCtrl')
const middlewear = require('../middlewear/middleware')

const router = require('express').Router()

router.post('/signup', userCtrl.signup)
router.post('/login', userCtrl.login)
router.get('/users', userCtrl.getAll)
router.get("/:userId", userCtrl.getOneUser);
router.delete('/:userId', middlewear, userCtrl.deleteUser)

module.exports = router