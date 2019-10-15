
// 要结构才能直接得到connection
const {connection} = require('./sql')

module.exports = {
    getNavigatorList(callback){
        let sql = `SELECT * FROM categories WHERE isDelete = 0 AND id != 1`
        connection.query(sql,(e,r)=>{
            e && console.log(e)
            callback(r)
        })
    }
}