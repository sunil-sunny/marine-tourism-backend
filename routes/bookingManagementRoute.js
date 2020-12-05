const express = require('express')
const router = express.Router()
const auth = require('../configuration/authMiddleware')

const { createBooking, viewUserBookings, viewVendorBookingList } = require('../controllers/bookingManagementController')

router.post('/createBooking', auth, createBooking);

router.get('/viewBooking', auth, viewUserBookings);

router.get('/viewVendorBooking', auth, viewVendorBookingList);

module.exports = router;