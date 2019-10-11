const modle = require('../model/posts')

module.exports = {
    getPostsPage(req,res){
        res.render('admin/posts')
    }
}