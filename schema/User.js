const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: {type: String, required: true },
        accessToken: { type: String, required: false },
        friends: { type: Array, required: false },
        events: { type: Array, required: false },
        pendingFriendRequests: { type: Array, required: false }
    }
)

module.exports = mongoose.model('user', userSchema)