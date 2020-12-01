const TourismSpot = require('../models/toutismSpotModel')

const createSpot = async (req, res) => {

    if (req.user.type == 'vendor') {
        try {
            const { owner, owner_id, firm_name, address, city } = req.body;
            if (owner.length > 0 || owner_id.length > 0 || firm_name.length > 0 || address.length > 0 || city.length > 0) {
                const spot = new TourismSpot({ owner: req.user.fullname, owner_id: req.user._id, firm_name, address, city });
                await spot.save()
                res.status(201).json({
                    "result": "Success"
                })
            } else {
                throw new Error('Tourism Spot details should not be empty')
            }
        } catch (e) {
            res.status(400).send({
                "message": e.message
            })
        }
    } else {
        res.status(401).send();
    }
}

const viewSpots = async (req, res) => {

    try {

        res.status(200).send(await TourismSpot.find({}))

    } catch (e) {
        res.status(400).send({
            "message": e.message
        })
    }

}

const getSpot = async (req, res) => {

    try {

        res.status(200).send(await TourismSpot.findOne({ '_id': req.params.id }))

    } catch (e) {
        res.status(400).send({
            "message": e.message
        })
    }

}

const deleteSpot = async (req, res) => {
    try {
        await TourismSpot.findByIdAndDelete(req.params.id)
        res.status(200).send({
            "status": "Deleted"
        })
    } catch (e) {
        res.status(400).send({
            "message": e.message
        })
    }
}

module.exports = { createSpot, viewSpots, deleteSpot, getSpot }