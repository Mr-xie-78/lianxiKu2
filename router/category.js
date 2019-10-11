/*
  负责和文章、分类操作相关的路由
*/
const express = require('express')
const router = express.Router()

const controller = require('../controller/category')

// 获取文章分类页面
router.get('/categories.html',controller.getCategoriesPage)

router.get('/getAllCategory',controller.getAllCategory)

// 新增的请求
router.post('/addNewCategory',controller.addNewCategory)

// 删除请求
router.get('/delCategory',controller.delCategory)

// 修改请求
router.get('/xiugaiPageById',controller.xiugaiPageById)

// 恢复请求
router.get('/huifuCategory',controller.huifuCategory)

// 修改请求
router.post('/xiugaiCategoryById',controller.xiugaiCategoryById)
module.exports = router