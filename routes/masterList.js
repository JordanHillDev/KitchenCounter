const express = require("express");
const router = express.Router();
const masterList = require("../controllers/masterList");
const { ensureAuth } = require("../middleware/auth");

router.get("/:listId", masterList.getIndex);

router.post("/create", masterList.createList);

router.post("/addItem/:listId", masterList.addItem);

router.post("/updateItem/:listId", masterList.updateItem);

router.post("/addCategory/:listId", masterList.addCategory);

router.delete("/removeCategory/:listId", masterList.removeCategory);

router.delete("/removeItem/:listId", masterList.removeItem);

module.exports = router;
