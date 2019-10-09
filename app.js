/*
   负责开启服务器
*/
const express = require('express');
const userRouter = require('./router/user')
const indexRouter = require('./router/index')
const categoryRouter = require('./router/category')
const commentsRouter = require('./router/comments')

// 引入express-session模块
const session = require('express-session')
const bodyParser = require('body-parser')
const app = express();
app.listen(9090,()=>{
    // 记得是127！！！！！！！   不是172！！！！！！！
    console.log('http://127.0.0.1:9090')
})

// 注册session中间件
app.use(session({
    // 设置一个字符串配合生成cookie里面的sessionId
    secret: '发多少就烦', 
    // 强制session保存到session store中
    resave: false,
    // 强制没有“初始化”的session保存到storage中
    saveUninitialized: false
  }));

// 注册body中间件
app.use(bodyParser.urlencoded({extended:false}))

// 设置默认模板
app.set('view engine','ejs')
// 处理静态资源
app.use('/assets',express.static('assets'))
app.use('/uploads',express.static('uploads'))

// 入口请求处理
app.use('/admin/user',userRouter)

app.use('/admin',indexRouter)

app.use('/admin/category',categoryRouter)

app.use('/admin/comments',commentsRouter)