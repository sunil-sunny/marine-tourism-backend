const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

UserSchema.statics.findByCredentials = async function (email, password) {

    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('User doesnt exists')
        } else {
            const isValidPassword = await bcrypt.compare(password, user.password)
            if (!isValidPassword) {
                throw new Error('Invalid User Credentials')
            } else {
                return user
            }
        }
    } catch (e) {
        throw new Error(e)
    }
}


UserSchema.methods.toJSON = function () {
    var obj = this.toObject();
    delete obj.password;
    return obj;
}

UserSchema.methods.getAuthToken = async function () {

    const user = this
    const token = await jwt.sign({ _id: user._id }, 'marine', { expiresIn: '1 day' })
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token

}

const User = mongoose.model('User', UserSchema);

module.exports = User;