const express = require("express")
const router =express.Router();
const userController = require('../cntrollers/UserController')
router.get('/test', userController.test)
router.post('/login', userController.validate)
router.post('/insert', userController.insert)
router.get('/registerUser', userController.registerUser)
router.get('/getUsers', userController.getUsers)


module.exports = router