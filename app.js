/*
   负责开启服务器
*/
const express = require('express');
const userRouter = require('./router/user')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const app = express();
app.listen(8080,()=>{
    console.log('http://172.0.0.1:8080')
})

app.use(bodyParser.urlencoded({extended:false}))
app.set('view engine',ejs)
// 处理静态资源
app.use('/assets',express.static('assets'))

app.use('/admin/user')