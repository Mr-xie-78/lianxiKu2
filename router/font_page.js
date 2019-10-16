// 在这里处理前台页面
const express = require('express')
const router = express.Router()
const controller = require('../controller/font_page')

router.get('/index.html',controller.getIndexPage)

router.get('/list.html',controller.getListPage)

router.get('/detail.html',controller.getDetailPage)

// 监听获取导航数据请求
router.get('/getNavigatorList',controller.getNavigatorList)

// 监听主页的最新发布
router.get('/getLastedPosts',controller.getLastedPosts)


module.exports = router