/*
  负责和分类操作相关的路由
*/
const categoryModel = require('../model/category')


module.exports = {
  getCategoriesPage(req,res){
    res.render('admin/categories')
  },
  getAllCategory(req,res){
    categoryModel.getAllCategory(data=>{
      let repone = data instanceof Array? {code:200,msa:'ok',data} : {code:500,msg:'获取数据失败'}
      res.send(repone)
    })
  }
}