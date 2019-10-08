
module.exports = {
    getIndexPage(req,res){
        // 记得render是直接读取views下的文件，admin前面不用/
        res.render('admin/index')
    }
}