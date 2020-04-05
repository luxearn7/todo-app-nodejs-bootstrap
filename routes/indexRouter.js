const express = require('express')
const router = express.Router()

router.get('/', function(req, res, next) {
    res.render('indexView.ejs')
})

module.exports = router