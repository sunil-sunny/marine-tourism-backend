const express = require('express')
const router = express.Router()
const auth = require('../configuration/authMiddleware')
const { registerUser, loginUser, getUserProfile, logoutUser, logoutAllUsers } = require('../controllers/profileManagementController')

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/getProfile', auth, getUserProfile);

router.post('/logout', auth, logoutUser);

router.post('/logoutAllUsers', auth, logoutAllUsers)

module.exports = router;