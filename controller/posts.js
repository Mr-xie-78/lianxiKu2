const modle = require('../model/posts')
const formidable = require('formidable')

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
    },
    getPostsAdd(req,res){
        res.render('admin/post-add')
    },
    getFengLei(req,res){
        modle.getFengLei(data=>{
            let response = data? {code:200,msg:'ok',data}:{code:400,msg:'获取数据失败'}
            res.send(response)
        })
    },
    // 只能穿req，和res!!!!
    getNewPoatByData(req,res){
        // console.log(123);
        let {category_id,status,pageIndex,pageSize} = req.query
        // 在这里处理sql
        let sql = `SELECT
        posts.id,posts.title,posts.created,posts.\`status\`,
        categories.\`name\`,
        users.nickname
       FROM posts
      LEFT JOIN categories ON posts.category_id = categories.id
      LEFT JOIN users ON posts.user_id = users.id`;
    
        let condition = ` where 1=1 `;
        // WHERE category_id = ${category_id} AND posts.\`status\`='${status}'`;
        // 判断一下 ： 如果category_id不是0，就有这个条件
        if (category_id != 0) {
          // 就是需要根据分类进行筛选
          condition += ` and category_id = ${category_id} `;
        }
        if (status != 'all') {
          // 就是需要根据状态进行筛选
          condition += ` AND posts.\`status\`='${status}' `;
        }
        // console.log(sql + condition);
    
        let pageQuery = ` LIMIT ${(pageIndex - 1) * pageSize},${pageSize} `;
      modle.getNewPoatByData(sql+condition+pageQuery,data=>{
        let response = data? {code:200,msg:'ok',data}:{code:400,msg:'获取数据失败'}
        modle.getPostCountByFilter(condition,r=>{
            // 获取到最大值，还要处理变成页
            response.total = Math.ceil(r.total/pageSize)
            // console.log(response);
            
            res.send(response)
        })
      })
    },
    uploadFile(req,res){
        let form = new formidable.IncomingForm();
        // 最好先设置一下上传的指定目录和保持上传的文件的后缀
        form.uploadDir = __dirname + '/../uploads'; // 设定上传的目录
        form.keepExtensions = true; // 设置上传的文件保持后缀
        // 3.使用创建的对象解析req请求
        form.parse(req,(err,fields,files)=>{
            // err 如果出错就是对象， fields 除了文件以外的其他字段 ， files 就是上传过来的文件
            // console.log(err);
            // console.log(fields);
            // console.log(files);
            if(!err){
                let index = files.suibian.path.indexOf('uploads')
                let src = files.suibian.path.substring(index-1)
                // console.log(uploadlujin)
                // 返回路径
                res.send({code:200,msg:'ok',src})
            }else{
                res.send({code:500,msg:'上传失败'})
            }
        })
    },
    InsentData(req,res){
        // console.log(req.session.userData)
        req.body.user_id = req.session.userData.id
        modle.InsentData(req.body,r=>{
            // console.log(r)
            if(r.affectedRows == 1){
                res.send({code:200,msg:'ok'})
            }else{
                res.send({code:500,msg:'插入失败'})
            }
        })
    }
}