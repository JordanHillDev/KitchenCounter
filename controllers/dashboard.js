const { Timestamp } = require("mongodb");
const { MasterList, Item } = require("../models/MasterList");

module.exports = {
    getIndex: async (req, res) => {
        try {
            const lists = await MasterList.find({ userId: req.user.id });
            res.render("dashboard.ejs", {
                user: req.user,
                lists: lists,
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
    getEditMaster: async (req, res) => {
        try {
            const list = await MasterList.findOne({ _id: req.query.listId });
            res.render("editMaster.ejs", {
                user: req.user,
                listName: list.listName,
                listId: req.query.listId,
                items: list.items,
                categories: list.categories,
            });
        } catch (error) {
            console.log(error);
        }
    },
    addItem: async (req, res) => {
        console.log(req.body)
        try {
            const name = req.body.itemName.toLowerCase();
            const price = +req.body.price;
            const countedBy = req.body.countedBy;
            const listId = req.query.listId;
            const category = req.body.category;
            console.log(category);
            await MasterList.updateOne(
                { _id: listId },
                {
                    $push: {
                        items: {
                            name: name,
                            countedBy: countedBy,
                            price: price,
                            category: category,
                        },
                    },
                }
            );
            await MasterList.findOneAndUpdate(
                { _id: listId },
                { updatedDate: new Date() }
            );
            res.redirect(`../editMaster/?listId=${listId}`);
        } catch (error) {
            console.log(error);
        }
    },
    updateItem: async (req, res) => {
        const listId = req.query.listId;
        const itemId = req.query.itemId;
        const price = req.body.price;
        const category = req.body.category;
        const countedBy = req.body.countedBy;

        try {
            await MasterList.findOneAndUpdate(
                { _id: listId, "items._id": itemId },
                {
                    $set: {
                        "items.$.category": category,
                        "items.$.price": price,
                        "items.$.countedBy": countedBy,
                    },
                }
            );
            res.redirect(`../editMaster/?listId=${listId}`);
        } catch (error) {
            console.log(error);
        }
    },
    removeItem: async (req, res) => {
        const listId = req.body.listId
        const itemId = req.body.itemId
        try {
            await MasterList.updateOne(
                { _id: listId },
                { $pull: { items: { _id: itemId } } }
            );
            console.log("item removed");
            await MasterList.findOneAndUpdate(
                { _id: listId },
                { updatedDate: new Date() }
            );
            res.json('Deleted Item')
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
            res.redirect(`../editMaster/?listId=${listId}`);
        } catch (error) {
            console.log(error);
        }
    },
    removeCategory: async (req, res) => {
        const listId = req.body.listId
        const category = req.body.category
       try {
            await MasterList.updateOne(
                { _id: listId },
                { $pull: { categories: category } }
            );
            await MasterList.findOneAndUpdate(
                { _id: listId },
                { updatedDate: new Date() }
            );
            res.json('Deleted Category')
       } catch (error) {
        console.log(error)
       }
    }
};
