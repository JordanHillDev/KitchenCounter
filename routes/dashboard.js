const express = require('express')
const router = express.Router()
const dashboard = require('../controllers/dashboard')
const { ensureAuth } = require('../middleware/auth')

// GET

router.get('/', ensureAuth, dashboard.getIndex)

router.get('/createList', dashboard.getCreate)

// POST

router.post('/createList', dashboard.createMaster)

// PUT

router.post('/updateItem', dashboard.updateItem)

router.post('/addCategory', dashboard.addCategory)

// DELETE

router.delete('/deleteItem/:listId', dashboard.deleteItem)

router.delete('/deleteCategory/:listId', dashboard.removeCategory)



module.exports = router