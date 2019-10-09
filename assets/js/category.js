$(function(){
    $.ajax({
        url:'/admin/category/getAllCategory',
        type:'get',
        success(res){
            if(res.code ===200){
                // 获取成功，渲染页面
                let html = template('xuanran',res.data)
                // text返回的是字符串，html返回的才是html
                $('#tbody').html(html)
            }
        }
    })
})