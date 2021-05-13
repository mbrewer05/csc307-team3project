const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    "name":{
        type: String
    },
    "username":{
        type: String
    },
    "password":{
        type: String
    },
    "budget":{
        type: Number
    },
    "time-interval":{
        type: Number
    },
    "spending-alert":{
        type: Boolean
    },
    "transaction-list":{
        type: []
    }
})

const User = mongoose.model('User', userSchema)
module.exports = User