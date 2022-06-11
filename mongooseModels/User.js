const { default: mongoose } = require("mongoose")

var schema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    accessLevel: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    password: {
        type: String
    },
    token: {
        type: String
    }
})

module.exports = mongoose.model('User', schema)