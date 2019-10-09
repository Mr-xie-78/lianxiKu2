
module.exports = {
    getIndexPage(req,res){
        console.log(req.session.isLogin)
        // 记得render是直接读取views下的文件，admin前面不用/
        if(req.session.isLogin){
            res.render('admin/index')
        }else{
            res.send(`<script>location.href = '/admin/user/login.html'</script>`)
        }
        
    }
}