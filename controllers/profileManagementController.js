const User = require('../models/userModel')
const bcrypt = require('bcryptjs')

const registerUser = async (req, res) => {

        try {
                const { fullname, email, password, type } = req.body;
                const hashedPassword = await bcrypt.hash(password, 8);
                const userModel = new User({ fullname, email, password: hashedPassword, type });
                await userModel.save()
                res.status(201).json({
                        "result": "Success"
                })
        } catch (e) {
                res.status(400).json({ "result": "Failed", "Error": e })
        }
};

const loginUser = async (req, res) => {
        try {
                const user = await User.findByCredentials(req.body.email, req.body.password);
                const token = await user.getAuthToken()
                res.status(200).json({ 'user':user, token })
        } catch (e) {
                console.log(e)
                res.status(400).json({
                        "Error": e.message
                })
        }
}

const getUserProfile = async (req, res) => {

        res.send(req.user)
}

const logoutUser = async (req,res) => {
        try {
                req.user.tokens = req.user.tokens.filter((token) => {

                        return token.token !== req.token
                })
                await req.user.save()
                res.status(200).send({
                        "success":"true"
                })
        } catch (e) {
                res.status(500).send('unable to logout')
        }
}

const logoutAllUsers = async (req,res) => {

        try {
                req.user.tokens = []
                await req.user.save()
                res.status(200).send({
                        "success":"true"
                })
        } catch (e) {
                res.send('Error while logging out all users');
        }
}

module.exports = { registerUser, loginUser, getUserProfile, logoutUser, logoutAllUsers }