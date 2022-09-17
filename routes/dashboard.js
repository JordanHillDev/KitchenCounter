const express = require('express')
const router = express.Router()
const dashboard = require('../controllers/dashboard')
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, dashboard.getIndex)

module.exports = router