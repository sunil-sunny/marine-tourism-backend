const express = require('express')
const router = express.Router()
const auth = require('../configuration/authMiddleware')

const { createSpot, viewSpots, deleteSpot, getSpot } = require('../controllers/spotManagementController')

router.post('/createSpot', auth, createSpot);

router.get('/getAllSpots', viewSpots);

router.delete('/deleteSpot/:id', deleteSpot);

router.get('/getSpot/:id', getSpot)

module.exports = router;