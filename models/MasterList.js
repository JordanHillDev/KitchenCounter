const mongoose = require('mongoose')

const MasterListSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    listName: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        required: true
    },
    updatedDate: {
        type: Date,
        required: true
    },
    items: [],
    categories: [{
        type: String
    }]
})

module.exports = mongoose.model('MasterList', MasterListSchema)