const modle = require('../model/posts')

module.exports = {
    getPostsPage(req,res){
        res.render('admin/posts')
    },
    getTenData(req,res){
        let {pageIndex,pageSize} = req.query
        // 获取数据
        modle.getTenData(pageIndex,pageSize,data=>{
            let respeon = data? {code:200,msg:'ok',data}:{code:400,msg:'获取数据失败'}
            // 再获取最大的id
            modle.getMaxId(r=>{
                respeon.total = Math.ceil(r.total/pageSize)
                res.send(respeon)
            })  
        })
    }
}