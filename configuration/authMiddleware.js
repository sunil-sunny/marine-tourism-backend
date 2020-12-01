const jwt = require('jsonwebtoken');
const User = require('../models/userModel')

const auth = async (req, res, next) => {
    try {
        
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'marine')
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) {
            throw new error()
        } else {
            req.token = token
            req.user = user
            next()
        }

    } catch (e) {
        res.status(401).send({
            error: 'Invalid credentials'
        })
    }
}


module.exports = auth