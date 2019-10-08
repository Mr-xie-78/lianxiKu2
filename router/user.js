/*
   负责分发请求
*/

const express = require('express')
const router = express.Router()
const controller = require('../controller/user')

// 处理登录页面
router.get('/login.html',controller.getLoginPage)

router.post('/userLogin',controller.userLogin)

module.exports = router