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
    },
    getFengLei(callback){
      let sql = `SELECT id,\`name\` FROM categories`
      connection.query(sql,(e,r)=>{
        e && console.log(e)
        callback(r)
      })
    },
    getNewPoatByData(sql,callback){
      connection.query(sql,(e,r)=>{
        e && console.log(e)
        callback(r)
      })
    },
    getPostCountByFilter(condition,callback){
      let sql = `SELECT count(id) as total FROM posts`
      // 还需要判断condition是否有值，如果是刷新页面是不会有值的
      if(condition !== undefined){
        sql += condition
      }
      connection.query(sql,(err,result)=>{
        err && console.log(err);
        callback(result[0]);
      })
    },
    InsentData(data,callback){
      let sql = `INSERT INTO posts
      SET title='${data.title}',content='${data.content}',slug='${data.slug}',
      feature='${data.feature}',category_id=${data.category},
      created='${data.created}',\`status\`='${data.status}',
      user_id=${data.user_id}`;
      connection.query(sql,(e,r)=>{
        e && console.log(e)
        callback(r)
      })
    }
}