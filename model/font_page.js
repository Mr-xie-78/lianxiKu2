
// 要结构才能直接得到connection
const {connection} = require('./sql')

module.exports = {
    getNavigatorList(callback){
        let sql = `SELECT * FROM categories WHERE isDelete = 0 AND id != 1`
        connection.query(sql,(e,r)=>{
            e && console.log(e)
            callback(r)
        })
    },
    // 监听主页的最新发布
    getLastedPosts(pageIndex,tiaoshu,callback){
        let sql = `SELECT
        posts.id,posts.title,posts.created,posts.content,posts.views,posts.likes,posts.feature,
        users.nickname,categories.\`name\`,
        (SELECT count(id) FROM comments WHERE post_id = posts.id) as commentsTotal
      FROM posts
      LEFT JOIN categories ON posts.category_id = categories.id
      LEFT JOIN users ON posts.user_id = users.id
      ORDER BY posts.created DESC
      LIMIT ${(pageIndex-1)*tiaoshu},${tiaoshu}
      `;
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