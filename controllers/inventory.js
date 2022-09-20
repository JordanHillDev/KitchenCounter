const Inventory = require("../models/Inventory");
const MasterList = require("../models/MasterList");

module.exports = {
    getIndex: async (req, res) => {
        const listId = req.params.id
        try {
            const inventory = await Inventory.findOne({ _id: listId })
            res.render("inventoryMobile.ejs", { inventory: inventory, listId: listId });
        } catch (error) {
            console.log(error)
        }
        
    },
    createInventory: async (req, res) => {
        try {
            const master = await MasterList.findOne({ _id: req.body.list })
            const newInv = await Inventory.create({
                userId: master.userId,
                listName: master.listName,
                createdDate: new Date(),
                items: [...master.items],
                categories: [...master.categories],
            });
            console.log(newInv);
            res.redirect(`/inventory/${newInv._id}`);
        } catch (error) {
            console.log(error);
        }
    },
    deleteInventory: async (req, res) => {
        const listId = req.params.id
        try {
            await Inventory.deleteOne({ _id: listId})
            res.redirect('/dashboard')
        } catch (error) {
           console.log(error) 
        }
    },
    updateInventory: async (req, res) => {
        const listId = req.params.listId;
        const itemName = req.query.itemName;
        const count = +req.body.count;
        try {
            const incrementedCount = await Inventory.findOneAndUpdate(
                { _id: listId, "items.name": itemName },
                { $inc: { "items.$.count": count} }, 
                { new: true }
            )
            const newCount = incrementedCount.items.find(obj => obj.name === itemName).count
            res.json({ newCount: newCount })
        } catch (error) {
            console.log(error)
        }
    }
};
