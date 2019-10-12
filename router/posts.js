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

// 获取PostsAdd页面
router.get('/getPostsAdd.html',controller.getPostsAdd)

// 获取分类数据
router.get('/getFengLei',controller.getFengLei)

// 筛选按钮请求

router.get('/getNewPoatByData',controller.getNewPoatByData)

module.exports = router