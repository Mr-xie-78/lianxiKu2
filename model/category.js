/*
  负责和分类的数据处理
*/
let {connection} = require('./sql')


module.exports = {
  getAllCategory(callback){
    let sql = `SELECT * FROM categories`
    connection.query(sql,(e,r)=>{
      e && console.log(e)
      callback(r)
    })
  }
}