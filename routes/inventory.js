const express = require('express')
const router = express.Router()
const inventory = require('../controllers/inventory')
const { ensureAuth } = require('../middleware/auth')

router.get('/:id', inventory.getIndex)

router.post('/createInventory', inventory.createInventory)

router.delete('/delete/:id', inventory.deleteInventory)

module.exports = router