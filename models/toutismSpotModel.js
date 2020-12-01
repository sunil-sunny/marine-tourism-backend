const mongoose = require('mongoose');

const tourismSpotSchema = new mongoose.Schema({
    owner: {
        type: String,
        required: true
    },
    owner_id: {
        type: String,
        required: true
    },
    firm_name: {
        type: String,
        required: true

    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    photos: [{
        photo: {
            type: String,
            required: false
        }
    }]
})

const TourismSpot = mongoose.model('TourismSpot', tourismSpotSchema);

module.exports = TourismSpot;