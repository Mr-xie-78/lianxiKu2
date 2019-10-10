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
  },
  addNewCategory(name,slug,classname,callback){
    let sql = `insert into categories set slug='${slug}',\`name\`='${name}',classname='${classname}'`;
    connection.query(sql,(e,r)=>{
      e && console.log(e)
      callback(r)
    })
  },
  getNewCategoryById(id,callback){
    let sql = `SELECT * FROM categories where id=${id}`
    connection.query(sql,(e,r)=>{
      e && console.log(e)
      callback(r[0])
    })
  }
}