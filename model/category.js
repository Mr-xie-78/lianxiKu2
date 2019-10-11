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
  },
  delCategory(id,callback){
    let sql = `UPDATE categories set isDelete = 1 WHERE id=${id}`;
    connection.query(sql,(e,r)=>{
      e && console.log(e)
      callback(r)
    })
  },
  xiugaiPageById(id,callback){
    let sql = `SELECT * FROM categories where id=${id}`
    connection.query(sql,(e,r)=>{
      e && console.log(e)
      callback(r[0])
    })
  },
  huifuCategory(id,callback){
    let sql = `UPDATE categories set isDelete = 0 WHERE id=${id}`;
    connection.query(sql,(e,r)=>{
      e && console.log(e)
      callback(r)
    })
  },
  xiugaiCategoryById(id,name,slug,classname,callback){
    let sql = `UPDATE categories set \`name\`='${name}',slug='${slug}',classname='${classname}' WHERE id=${id}`;
    connection.query(sql,(err,result)=>{
      err && console.log(err);
      callback(result);
    })
  }
}