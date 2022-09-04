const { Timestamp } = require("mongodb");
const { MasterList, Item } = require("../models/MasterList");

module.exports = {
    getIndex: async (req, res) => {
        try {
            const lists = await MasterList.find({ userId: req.user.id });
            console.log(lists);
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
            console.log("Master List has been added");
            res.redirect("/dashboard");
        } catch (error) {
            console.log(err);
        }
    },
    getEditMaster: async (req, res) => {
        console.log(req.query)
        try {
            const list = await MasterList.findOne({ _id: req.query.listId });
            res.render("editMaster.ejs", {
                user: req.user,
                listName: list.listName,
                listId: req.query.listId,
                items: list.items
            });
        } catch (error) {
            console.log(error);
        }
    },
    addItem: async (req, res) => {
        try {
            const name = req.body.itemName;
            const price = req.body.price;
            const listId = req.query.listId
            await MasterList.updateOne(
                { _id: listId },
                { $push: { items: { name: name, price: price } } }
            );
            console.log("An Item has been added");
            res.redirect(`../editMaster/?listId=${listId}`);
        } catch (error) {
            console.log(error);
        }
    },
    removeItem: async (req, res) => {
      try {
        const itemId = req.query.itemId;
        const listId = req.query.listId
        await MasterList.updateOne(
            { _id: listId },
            { $pull: { items: { _id: itemId } }})
            console.log('item removed')
            res.redirect(`../editMaster/?listId=${listId}`);
      } catch (error) {
        console.log(error)
      }
    }
};

