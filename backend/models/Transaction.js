const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
    "date":{
        type: Object
    },
    "desc":{
        type: String
    },
    "category":{
        type: String
    },
    "amount":{
        type: Number
    },
})

const Transaction = mongoose.model('Transaction', transactionSchema)
module.exports = Transaction