const express = require('express')
const router = express.Router()

//@desc Main Page
//@route GET /
router.get('/', (req, res) => {
    res.render('../views/layouts/main')
})

module.exports = router