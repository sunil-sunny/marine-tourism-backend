const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    spot_id: {
        type: String,
        required: true
    },
    spot_name:{

    },
    user_id: {
        type: String,
        required: true
    },
    booking_name: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: false
    },
    count: {
        type: Number,
        required: true
    }

})

const Booking = mongoose.model('Booking', BookingSchema);

module.exports = Booking;