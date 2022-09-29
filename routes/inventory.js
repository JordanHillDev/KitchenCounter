const express = require('express')
const router = express.Router()
const inventory = require('../controllers/inventory')
const { ensureAuth } = require('../middleware/auth')

router.get('/:id', inventory.getIndex)

router.get('/total/:listId', inventory.getInventoryTotal)

router.post('/createInventory', inventory.createInventory)

router.put('/update/:listId', inventory.updateInventory)

router.delete('/delete/:id', inventory.deleteInventory)

module.exports = router