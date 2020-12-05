const Booking = require('../models/bookingModel')
const TourismSpot = require('../models/toutismSpotModel')

const createBooking = async (req, res) => {

    try {

        const { spot_id, date, time, count } = req.body;
        const tourismSpot = await TourismSpot.findById({_id:spot_id});
        const booking = new Booking({ spot_id,spot_name:tourismSpot.firm_name, user_id: req.user._id, booking_name: req.user.fullname, date, time, count })
        await booking.save((err, data) => {
            if (err) {
                throw new Error(err)
            } else {
                res.status(201).send(data)
            }

        })
    } catch (e) {

        res.status(400).send({
            'result': false,
            'error': e
        })
    }


}


const viewUserBookings = async (req, res) => {
    try {

        res.status(200).send(await Booking.find({ user_id: req.user._id }))

    } catch (e) {

        res.status(400).send({
            'result': false,
            'error': e
        })
    }
}

const viewVendorBookingList = async (req, res) => {
    try {
        if (req.user.type === 'guest') {
            res.status(401).send({
                'message': 'unauthorized'
            })
        }
        const tourismSpot = await TourismSpot.findOne({ owner_id: req._id })
        res.status(200).send(await Booking.find({ spot_id: tourismSpot._id }))
    } catch (e) {
        res.status(400).send({
            'result': false,
            'error': e
        })
    }
}

module.exports = { createBooking, viewUserBookings, viewVendorBookingList }