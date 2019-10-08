/*
   负责处理请求
*/
const modle = require('../model/user')

module.exports = {
   getLoginPage(req,res){
      // 记得是render
      res.render('admin/login')
   },
   userLogin(req,res){
      let {email,password} = req.body
      // console.log(email,password)
      // 通过邮箱验证是否有数据
      modle.getUserByEmail(email,(r)=>{
         // console.log(r)
         if(r){
            // 判断密码
            if(r.password == password){
               res.send({
                  code:200,
                  msg:'ok'
               })
            }else{
               res.send({
                  code:400,
                  msg:'密码错误'
               })
            }
         }else{
            res.send({
               code:400,
               msg:'邮箱有误'
            })
         }
      })
   }
}