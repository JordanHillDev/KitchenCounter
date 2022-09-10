const express = require('express')
const router = express.Router()
const dashboard = require('../controllers/dashboard')
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, dashboard.getIndex)

router.get('/createList', dashboard.getCreate)

router.get('/editMaster', dashboard.getEditMaster)

router.post('/createList', dashboard.createMaster)

router.post('/addItem', dashboard.addItem)

router.post('/addCategory', dashboard.addCategory)

router.get('/removeItem', dashboard.removeItem)

module.exports = router