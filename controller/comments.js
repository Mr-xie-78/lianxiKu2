/*
  负责和评论相关操作
*/

const categoryModel = require('../model/comments')

module.exports = {
    getCommentsPage(req,res){
    res.render('admin/comments')
  }
}