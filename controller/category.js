/*
  负责和分类操作相关的路由
*/
const categoryModel = require('../model/category')


module.exports = {
  getCategoriesPage(req,res){
    res.render('admin/categories')
  }
}