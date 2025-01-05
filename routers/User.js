const express = require("express")
const router =express.Router();
const userController = require('../cntrollers/UserController')
console.log("User router loaded");

// router.get('/test', userController.test)
router.get('/test', (req, res) => {
    console.log("Test also checked....");
    res.send("Test route working!");
});
router.post('/login', userController.validate)
router.post('/insert', userController.insert)
router.get('/registerUser', userController.registerUser)
router.get('/getUsers', userController.getUsers)


module.exports = router