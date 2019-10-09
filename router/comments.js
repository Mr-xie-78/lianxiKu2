/*
  负责和评论相关操作的路由
*/
const express = require('express')
const router = express.Router()

const controller = require('../controller/comments')

// 获取评论页面
router.get('/comments.html',controller.getCommentsPage)

module.exports = router