const express = require('express')
const router = express.Router()
const masterList = require('../controllers/masterList')
const { ensureAuth } = require('../middleware/auth')

// Get

router.get('/:listId', masterList.getIndex)

//POST
router.post('/addItem/:listId', masterList.addItem)




module.exports = router



