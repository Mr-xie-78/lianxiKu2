/*
   负责处理数据
*/
let {connection} = require('./sql')
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