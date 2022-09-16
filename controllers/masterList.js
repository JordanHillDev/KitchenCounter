const MasterList = require("../models/MasterList");
const Inventory = require('../models/Inventory')

module.exports = {
    getIndex: async (req, res) => {
        try {
            const list = await MasterList.findOne({ _id: req.params.listId });
            res.render("masterList.ejs", {
                list: list,
                user: req.user,
                listId: req.query.listId,
            });
        } catch (error) {
            console.log(error)
        }
    },
}