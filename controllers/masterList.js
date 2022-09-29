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
    createList: async (req, res) => {
        try {
            await MasterList.create({
                userId: req.user.id,
                listName: req.body.listName,
                createdDate: new Date(),
                updatedDate: new Date(),
            });
            res.redirect("/dashboard");
        } catch (error) {
            console.log(error);
        }
    },
    deleteList: async (req, res) => {
        const listId = req.params.listId
        try {
            await MasterList.deleteOne({ _id: listId })
            res.redirect("/dashboard")
        } catch (error) {
            console.log(error)
        }
    },
    addCategory: async (req, res) => {
        const categoryName = req.body.categoryName.toLowerCase();
        const listId = req.params.listId;
        try {
            await MasterList.updateOne(
                { _id: listId, categories: { $ne: categoryName } },
                { $push: { categories: categoryName } }
            );
            res.redirect(`/masterList/${listId}`);
        } catch (error) {
            console.log(error);
        }
    },
    removeCategory: async (req, res) => {
        const listId = req.params.listId;
        const category = req.query.category;
        try {
            await MasterList.updateOne(
                { _id: listId },
                { $pull: { categories: category } }
            );
            await MasterList.findOneAndUpdate(
                { _id: listId },
                { updatedDate: new Date() }
            );
            res.redirect(`/masterList/${listId}`);
        } catch (error) {
            console.log(error);
        }
    },
    addItem: async (req, res) => {
        const listId = req.params.listId;
        const name = req.body.itemName.toLowerCase();
        try {
            await MasterList.updateOne(
                { _id: listId, "items.name": { $ne: name } },
                {
                    $push: {
                        items: {
                            name: name,
                            price: +req.body.price,
                            countedBy: req.body.countedBy,
                            category: req.body.category,
                            count: 0,
                        },
                    },
                }
            );
            await MasterList.findOneAndUpdate(
                { _id: listId },
                { updatedDate: new Date() }
            );
            res.redirect(`/masterList/${listId}`);
        } catch (error) {
            console.log(error);
        }
    },
    updateItem: async (req, res) => {
        const listId = req.params.listId;
        try {
            await MasterList.findOneAndUpdate(
                { _id: listId, "items.name": req.query.itemName },
                {
                    $set: {
                        "items.$.category": req.body.category,
                        "items.$.price": req.body.price,
                        "items.$.countedBy": req.body.countedBy,
                    },
                }
            );
            res.redirect(`/masterList/${listId}`);
        } catch (error) {
            console.log(error);
        }
    },
    removeItem: async (req, res) => {
        const listId = req.params.listId;
        try {
            await MasterList.updateOne(
                { _id: listId },
                { $pull: { items: { name: req.query.itemName } } }
            );
            await MasterList.findOneAndUpdate(
                { _id: listId },
                { updatedDate: new Date() }
            );
            res.redirect(`/masterList/${listId}`);
        } catch (error) {
            console.log(error);
        }
    },
};
