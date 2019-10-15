// 在这里处理前台页面
const express = require('express')
const router = express.Router()
const controller = require('../controller/font_page')

router.get('/index.html',controller.getIndexPage)

router.get('/list.html',controller.getListPage)

router.get('/detail.html',controller.getDetailPage)


module.exports = router