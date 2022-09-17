const MasterList = require("../models/MasterList");
const Inventory = require("../models/Inventory");

module.exports = {
    getIndex: async (req, res) => {
        try {
            const lists = await MasterList.find({ userId: req.user.id });
            const entries = await Inventory.find({ userId: req.user.id });
            res.render("dashboard.ejs", {
                user: req.user,
                lists: lists,
                entries: entries,
            });
        } catch (error) {
            console.log(err);
        }
    },
};
