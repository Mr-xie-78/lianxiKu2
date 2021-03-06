const model = require('../model/font_page')

module.exports = {
    getIndexPage(req,res){
        res.render('index')
    },
    getListPage(req,res){
        res.render('list')
    },
    getDetailPage(req,res){
        res.render('detail')
    },
    // 处理导航数据请求
    getNavigatorList(req,res){
        model.getNavigatorList(data=>{
            let response = data? {code:200,msg:'ok',data} : {code:500,msg:'失败'}
            res.send(response)
        })
    },
    // 监听主页的最新发布
    getLastedPosts(req,res){
        let {pageIndex,tiaoshu} = req.query;
        model.getLastedPosts(pageIndex,tiaoshu,data=>{
            let response = data? {code:200,msg:'ok',data} : {code:500,msg:'失败'}
            model.getMaxId(r=>{
                response.total = r.total
                res.send(response)
            })
        })
    }
}