

const express = require('express')
const router = express.Router()
const controller = require('../controller/index')

// 处理登录页面
router.get('/index.html',controller.getIndexPage)

module.exports = router