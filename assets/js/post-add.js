$(function(){
    // CKEDITOR.replace('文本域的id');
    CKEDITOR.replace('content');
    
    // 发ajax渲染页面
    $.ajax({
        type:'get',
        url:'/admin/posts/getFengLei',
        success(res){
            let html = `<option value="0">所有分类</option>`
                // console.log(res);
                
                res.data.forEach(e => {
                    html+=`<option value="${e.id}">${e.name}</option>`
                });
            $('#category').html(html)
        }
    })
    // 先实现图片上传
    $('#feature').on('change',function(){
        
         // 判断是否有文件
        if (!this.files[0]) {
            return;
        }
        let files = this.files[0]
        var data = new FormData()
        data.append('suibian',files)

        // 发ajax请求
        $.ajax({
            type:'post',
            data,
            url:'/admin/posts/uploadFile',
            contentType:false,
            processData:false,
            success(res){
                // 获取到数据,渲染页面
                console.log(res)
                if(res.code==200){
                    $('#hidden').val(res.src)
                    $('#image').attr('src',res.src).show()
                }
            }
        })
    })

    // 给保存按钮添加点击事件
    $('#baocun').on('click',function(){
        CKEDITOR.instances.content.updateElement();
        // console.log($('form').serialize());
        // 得到数据，发ajax请求，修改数据
        let data = $('form').serialize()
        $.ajax({
            type:"post",
            data,
            url:'/admin/posts/InsentData',
            success(res){
                if(res.code == 200){
                    // 插入成功
                    console.log(res.msg)
                }else{
                    console.log(res.msg)
                }
            }
        })
    })

    // 给删除按钮添加事件
})