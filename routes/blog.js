const express = require('express')
const { getBlog } = require('../controller/blog')
const router = express.Router()
const blogSchema = require('../models/blog')

router.get('/' , getBlog)

module.exports = router