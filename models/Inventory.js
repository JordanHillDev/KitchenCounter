const mongoose = require("mongoose");

const InventorySchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    listName: {
        type: String,
        required: true,
    },
    createdDate: {
        type: Date,
        required: true,
    },
    items: [],
    categories: [
        {
            type: String,
        },
    ],
});

module.exports = mongoose.model("Inventory", InventorySchema);
