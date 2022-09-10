const mongoose = require('mongoose')


const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    count: {
        type: Number
    },
    category: {
        type: String,
    },
    countedBy: {
        type: String,
        required: true
    }
})



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
    items: {
        type: [ItemSchema],
    },
    categories: [{
        type: String
    }]
})

const MasterList = mongoose.model('MasterList', MasterListSchema)
const Item = mongoose.model('Item', ItemSchema)
module.exports = { MasterList, Item }