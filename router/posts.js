/*
  负责和文章相关的路由
*/

const express = require('express')
const router = express.Router()
const controller = require('../controller/posts')

// 获取posts页面
router.get('/posts.html',controller.getPostsPage)

// 获取数据
router.get('/getTenData',controller.getTenData)


module.exports = router