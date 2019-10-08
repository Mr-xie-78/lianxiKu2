/*
   负责开启服务器
*/
const express = require('express');
const userRouter = require('./router/user')
const indexRouter = require('./router/index')

const bodyParser = require('body-parser')
const app = express();
app.listen(9090,()=>{
    // 记得是127！！！！！！！   不是172！！！！！！！
    console.log('http://127.0.0.1:9090')
})

app.use(bodyParser.urlencoded({extended:false}))
app.set('view engine','ejs')
// 处理静态资源
app.use('/assets',express.static('assets'))
app.use('/uploads',express.static('uploads'))

app.use('/admin/user',userRouter)

app.use('/admin',indexRouter)