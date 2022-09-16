const MasterList = require("../models/MasterList");
const Inventory = require("../models/Inventory");

module.exports = {
    getIndex: async (req, res) => {
        const listId = req.params.listId;
        try {
            const list = await MasterList.findOne({ _id: listId });
            res.render("masterList.ejs", {
                list: list,
                user: req.user,
                listId: listId,
            });
        } catch (error) {
            console.log(error);
        }
    },
    addItem: async (req, res) => {
        console.log(req)
        const listId = req.params.listId;
        const name = req.body.itemName.toLowerCase();
        const price = +req.body.price;
        const countedBy = req.body.countedBy;
        const category = req.body.category;
        try {
            await MasterList.updateOne(
                { _id: listId, "items.name": { $ne: name } },
                {
                    $push: {
                        items: {
                            name: name,
                            price: price,
                            countedBy: countedBy,
                            category: category,
                            count: 0,
                        },
                    },
                }
            );
            await MasterList.findOneAndUpdate(
                { _id: listId },
                { updatedDate: new Date() }
            );
            res.redirect(`/masterList/${listId}`)
        } catch (error) {
            console.log(error);
        }
    },
};
