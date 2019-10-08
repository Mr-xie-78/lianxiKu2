/*
   负责处理数据
*/
const mysql = require('mysql')

var connection = mysql.createConnection({
                  host:'127.0.0.1',
                  user:'root',
                  port:3306,
                  password:'root',
                  database:'albx_38'
               })
module.exports = {
   getUserByEmail(email,callback){
      let sql = `SELECT * FROM users WHERE email='${email}'`;
      connection.query(sql,(e,r)=>{
         e && console.log(e)
         // 获取到的r是一个数组，通过索引得到对象
         callback(r[0])
      })
   }
}