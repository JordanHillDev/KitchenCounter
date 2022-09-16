const express = require('express')
const router = express.Router()
const dashboard = require('../controllers/dashboard')
const { ensureAuth } = require('../middleware/auth')

// GET

router.get('/', ensureAuth, dashboard.getIndex)

router.get('/createList', dashboard.getCreate)

// POST

router.post('/createList', dashboard.createMaster)

router.post('/addItem', dashboard.addItem)

// PUT

router.post('/updateItem', dashboard.updateItem)

router.post('/addCategory', dashboard.addCategory)

// DELETE

router.delete('/deleteItem/:listId', dashboard.deleteItem)

router.post('/removeCategory', dashboard.removeCategory)



module.exports = router