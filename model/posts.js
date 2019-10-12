/*
   负责处理数据
*/
let {connection} = require('./sql')
module.exports = {
    getTenData(pageIndex,pageSize,callback){
        // 获取数据
        let sql = `SELECT
        posts.id,posts.title,posts.created,posts.\`status\`,
        categories.\`name\`,
        users.nickname
       FROM posts
      LEFT JOIN categories ON posts.category_id = categories.id
      LEFT JOIN users ON posts.user_id = users.id
      LIMIT ${(pageIndex - 1) * pageSize},${pageSize}`;
        connection.query(sql,(err,result)=>{
          err && console.log(err);
          callback(result);
        })
    },
    getMaxId(callback){
        let sql = `SELECT count(id) as total FROM posts`;
        connection.query(sql,(err,result)=>{
          err && console.log(err);
        //   获取的只有一条数据
          callback(result[0]);
        })
    }
}