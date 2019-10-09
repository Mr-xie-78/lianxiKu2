/*
  负责和文章、分类操作相关的路由
*/
const express = require('express')
const router = express.Router()

const controller = require('../controller/category')

// 获取文章分类页面
router.get('/categories.html',controller.getCategoriesPage)

router.get('/getAllCategory',controller.getAllCategory)
module.exports = router