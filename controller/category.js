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
  },
  addNewCategory(req,res){
    let {name,slug,classname} = req.body
    categoryModel.addNewCategory(name,slug,classname,r=>{
      // console.log(r)
      if(r.affectedRows == 1){
        // 添加成功,然后继续获取数据
        let id = r.insertId
        categoryModel.getNewCategoryById(id,(data)=>{
          let repone = data? {code:200,msa:'ok',data} : {code:400,msg:'获取数据失败，请重新刷新页面'}
          res.send(repone)
        })
      }else{
        res.send({code:400,msg:'添加失败'})
      }
    })
  },
  delCategory(req,res){
    let {id} = req.query
    // console.log(id)
    categoryModel.delCategory(id,(r)=>{
      // console.log(r)
      if(r.affectedRows == 1){
        res.send({code:200,msg:'ok'})
      }else{
        res.send({code:500,msg:'删除失败'})
      }
    })
  },
  xiugaiPageById(req,res){
    let {id} = req.query
    // console.log(id);
    categoryModel.xiugaiPageById(id,(data)=>{
      let repone = data? {code:200,msa:'ok',data} : {code:400,msg:'获取数据失败，请重新刷新页面'}
      res.send(repone)
    })
  },
  huifuCategory(req,res){
    let {id} = req.query
    // console.log(id)
    categoryModel.huifuCategory(id,(r)=>{
      // console.log(r)
      if(r.affectedRows == 1){
        res.send({code:200,msg:'ok'})
      }else{
        res.send({code:500,msg:'删除失败'})
      }
    })
  },
  xiugaiCategoryById(req,res){
    let {id,name,slug,classname} = req.body
    categoryModel.xiugaiCategoryById(id,name,slug,classname,(r)=>{
      if(r.affectedRows == 1){
        res.send({code:200,msg:'ok'})
      }else{
        res.send({code:500,msg:'删除失败'})
      }
    })
  }
}