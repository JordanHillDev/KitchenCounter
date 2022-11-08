const express = require('express')
const router = express.Router()
const inventory = require('../controllers/inventory')
const { ensureAuth } = require('../middleware/auth')

// GET
router.get('/:id', inventory.getIndex)

router.get('/total/:listId', inventory.getInventoryTotal)

// POST
router.post('/createInventory', inventory.createInventory)

// PUT
router.put('/update/:listId', inventory.updateInventory)

// DELETE
router.delete('/delete/:id', inventory.deleteInventory)


module.exports = router