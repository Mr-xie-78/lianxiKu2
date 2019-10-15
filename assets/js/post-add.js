$(function(){
    // 因为在这个页面里面要实现新增和修改，url有id的时候是修改，没有的时候是新增
    let id = location.search.substring(4)
    // console.log(id)

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
        console.log(this.files[0])
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
                // console.log(res)
                if(res.code==200){
                    $('#hidden').val(res.src)
                    // console.log(res.src)
                    $('#image').attr('src',res.src).show()
                }
            }
        })
    })

    if(id){
        // 有id是修改
        
        // 发送请求，获取数据，渲染页面
        $.ajax({
            type:'get',
            data:{
                id
            },
            url:'/admin/posts/getPostByIdPage',
            success(res){
                if(res.code == 200){
                    // 获取到数据
                    // console.log(res)
                    $('#title').val(res.data.title)
                    $('#content').val(res.data.content)
                    $('#slug').val(res.data.slug)
                    // 图片的html一开始是隐藏的，得显示
                    $('#image').attr('src',res.data.feature).show()
                    $('#hidden').val(res.data.feature)

                    $('#category').val(res.data.category_id)
                    $('#status').val(res.data.status)
                    // 接下来是时间的渲染，因为后台得到的时间跟我们渲染的格式要求不一样，所以得改
                    // console.log(res.data.created)
                    $('#created').val(res.data.created.slice(0,16))

                    // 把id存到隐藏域里面,注意细节
                    $('form').append(`<input type="hidden" name="id" value="${id}">`)
                    // $('form').append(`<input type="hidden" name="id" value="${id}">`);
                }else{
                    console.log(res.msg)
                }
            }
        })

        // 给保存添加数据修改事件
        $('#baocun').on('click',function(){
            // 记得把富文本的内容实时更新到文本域中
            CKEDITOR.instances.content.updateElement();
            // console.log($('form').serialize())
            let data = $('form').serialize()
            $.ajax({
                type:'post',
                url:'/admin/posts/editPostById',
                data,
                success(res){
                    if(res.code == 200){
                        // $('#title').val('')
                        // $('#content').val('')
                        // $('#slug').val('')
                        // $('#image').attr('')
                        // $('#hidden').val('')
                        // $('#category').val('')
                        // $('#status').val('')
                        // $('#created').val('')
                        location.href = '/admin/posts/posts.html'
                        // 修改成功
                        console.log(res.msg)
                    }else{
                        console.log(res.msg)
                    }
                }
            })
        })
    }else{

        // 没有id是新增

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

    }
    

})