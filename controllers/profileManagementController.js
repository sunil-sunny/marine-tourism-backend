const User = require('../models/userModel')
const bcrypt = require('bcryptjs')

const registerUser = async (req, res) => {

        try {
                const { fullname, email, password,type } = req.body;
                const hashedPassword = await bcrypt.hash(password, 8);
                const userModel = new User({ fullname, email, password: hashedPassword,type });
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
                res.status(200).json({ "result": "Success", "Email": user.email, token })
        } catch (e) {
                console.log(e)
                res.status(400).json({
                        "result": "Failed",
                        "Error": e.message
                })
        }
}

module.exports = { registerUser, loginUser }