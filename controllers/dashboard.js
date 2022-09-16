const MasterList = require("../models/MasterList");
const Inventory = require('../models/Inventory')

module.exports = {
    getIndex: async (req, res) => {
        try {
            const lists = await MasterList.find({ userId: req.user.id });
            const entries = await Inventory.find({ userId: req.user.id})
            res.render("dashboard.ejs", {
                user: req.user,
                lists: lists,
                entries: entries
            });
        } catch (error) {
            console.log(err);
        }
    },
    getCreate: (req, res) => {
        res.render("createList.ejs");
    },
    createMaster: async (req, res) => {
        try {
            await MasterList.create({
                userId: req.user.id,
                listName: req.body.listName,
                createdDate: new Date(),
                updatedDate: new Date(),
            });
            res.redirect("/dashboard");
        } catch (error) {
            console.log(err);
        }
    },
    updateItem: async (req, res) => {
        const listId = req.query.listId;
        const itemName = req.query.itemName;
        const price = req.body.price;
        const category = req.body.category;
        const countedBy = req.body.countedBy;

        try {
            await MasterList.findOneAndUpdate(
                { _id: listId, "items.name": itemName },
                {
                    $set: {
                        "items.$.category": category,
                        "items.$.price": price,
                        "items.$.countedBy": countedBy,
                    },
                }
            );
            res.redirect(`../masterList/?listId=${listId}`);
        } catch (error) {
            console.log(error);
        }
    },
    deleteItem: async (req, res) => {
        const listId = req.params.listId
        const item = req.query.item
        console.log(listId, item)
        try {
            await MasterList.updateOne(
                { _id: listId },
                { $pull: { items: { name: item } } }
            );
            console.log("item removed");
            await MasterList.findOneAndUpdate(
                { _id: listId },
                { updatedDate: new Date() }
            );
            res.redirect(`masterList/${listId}`)
        } catch (error) {
            console.log(error);
        }
    },
    addCategory: async (req, res) => {
        const categoryName = req.body.categoryName.toLowerCase();
        const listId = req.query.listId;
        try {
            await MasterList.updateOne(
                { _id: listId },
                { $push: { categories: categoryName } }
            );
            res.redirect(`../masterList/?listId=${listId}`);
        } catch (error) {
            console.log(error);
        }
    },
    removeCategory: async (req, res) => {

        const listId = req.params.listId
        const category = req.query.category
       try {
            await MasterList.updateOne(
                { _id: listId },
                { $pull: { categories: category } }
            );
            await MasterList.findOneAndUpdate(
                { _id: listId },
                { updatedDate: new Date() }
            );
            res.redirect(`../masterList/?listId=${listId}`);
       } catch (error) {
        console.log(error)
       }
    }
};
