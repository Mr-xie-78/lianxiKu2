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

    // 委托事件，点击的时候切换盒子
    $('.tubiao-container').on('click',function(){
        $('.tubiao-select').toggle()
    })

    $('.tubiao-select').on('click','.fa',function(){
        let one = $(this).attr('class').slice(3)
        // console.log(one)
        $('.current .fa').attr('class','fa '+one)
    })

    // 然后获取数据，传输
    let nameDom = $('#name')
    let slugDom = $('#slug')
    let classnameDom = $('.current>.fa')

    // 新增数据
    $('.form-group .add').on('click',function(){
        if(nameDom.val().trim().length ===0){
            $('#modal-msg').text('用户名不能为空');
            $('#modelId').modal();
            return;
        }
        if(slugDom.val().trim().length ===0){
            $('#modal-msg').text('别名不能为空');
            $('#modelId').modal();
            return;
        }
        let data = {name:nameDom.val(),slug:slugDom.val(),classname:classnameDom.attr('class').slice(3)}   
        // console.log(data);
        // 得到数据，发送请求
        $.ajax({
            type:'post',
            url:'/admin/category/addNewCategory',
            data,
            success(res){
                if(res.code ===200){
                    // 获取成功，渲染页面
                    let html = `<tr data-id="${res.data.id}">
                    <td class="text-center"><input type="checkbox"></td>
                    <td>${res.data.name}</td>
                    <td>${res.data.slug}</td>
                    <td>
                      <i class="fa ${res.data.classname}"></i>
                    </td>
                    <td class="text-center">
                      <a href="javascript:;" class="btn btn-info btn-xs" id="xiugai">编辑</a>
                      <a href="javascript:;" class="btn btn-danger btn-xs" id="del">删除</a>
                    </td>
                  </tr>`
                    // text返回的是字符串，html返回的才是html
                    $('#tbody').append(html)

                    nameDom.val('')
                    slugDom.val('')
                    classnameDom.attr('class','fa fa-glass')
                }
            }
        })
    })
    // console.log($('tr'));
    // debugger
    // 点击删除事件
    $('#tbody').on('click','#del',function(){
        // 实现软删除
        let id = $(this).parents('tr').attr('data-id')
        // $(this).parents('tr').remove()
        // console.log($(this).parents('tr'));

        // ajax请求返回里面是另一个函数，所以，不能直接用this，得用变量存起来，在里面使用
        let that = this
        $.ajax({
            type:'get',
            url:`/admin/category/delCategory?id=${id}`,
            success(res){
                if(res.code==200){
                    // $(that).parents('tr').remove()
                    let html = ` <a href="javascript:;" class="btn btn-success btn-xs" id="huifu">恢复</a>`
                    $(that).parent().append(html)
                    $(that).remove()
                }else{
                    console.log('删除失败');
                }
            }
        })
    })
    let id = null
    let xiugaiDOm = null
    // 点击编辑，通过id从数据库把数据渲染给左边,要事件委托，直接给修改绑定事件，无法触发！！！
    $('#tbody').on('click','#xiugai',function(){
        id = $(this).parents('tr').attr('data-id')
        xiugaiDOm=$(this)
        // console.log(id);
        $.ajax({
            type:'get',
            url:`/admin/category/xiugaiPageById`,
            data:{id},
            success(res){
                if(res.code==200){
                    console.log(res);
                    
                    // $(that).parents('tr').remove()
                    nameDom.val(res.data.name)
                    slugDom.val(res.data.slug)
                    classnameDom.attr('class','fa '+res.data.classname)
                    $('.add').parent().hide().next().show()
                }else{
                    console.log('无法找到数据，请刷新');
                }
            }
        })
    })

    // 点击恢复事件
    $('#tbody').on('click','#huifu',function(){
        let id = $(this).parents('tr').attr('data-id')
        // ajax请求返回里面是另一个函数，所以，不能直接用this，得用变量存起来，在里面使用
        let that = this
        $.ajax({
            type:'get',
            url:`/admin/category/huifuCategory`,
            data:{id},
            success(res){
                if(res.code==200){
                    // $(that).parents('tr').remove()
                    let html = `<a href="javascript:;" class="btn btn-danger btn-xs" id="del">删除</a>`
                    $(that).parent().append(html)
                    $(that).remove()
                }else{
                    console.log('删除失败');
                }
            }
        })
    })

    // 点击保存事件
    $('.form-group .baocun').on('click',function(){
        if(nameDom.val().trim().length ===0){
            $('#modal-msg').text('用户名不能为空');
            $('#modelId').modal();
            return;
        }
        if(slugDom.val().trim().length ===0){
            $('#modal-msg').text('别名不能为空');
            $('#modelId').modal();
            return;
        }
        let data = {id,name:nameDom.val(),slug:slugDom.val(),classname:classnameDom.attr('class').slice(3)}   
        // console.log(data);
        // 得到数据，发送请求
        $.ajax({
            type:'post',
            url:'/admin/category/xiugaiCategoryById',
            data,
            success:(res)=>{
                if(res.code ===200){
                    // 修改成功，渲染页面
                   let html = `<tr data-id="${data.id}">
                   <td class="text-center"><input type="checkbox"></td>
                   <td>${data.name}</td>
                   <td>${data.slug}</td>
                   <td>
                     <i class="fa ${data.classname}"></i>
                   </td>
                   <td class="text-center">
                     <a href="javascript:;" class="btn btn-info btn-xs" id="xiugai">编辑</a>
                     
                     <a href="javascript:;" class="btn btn-danger btn-xs" id="del">删除</a>
                     
                   </td>
                 </tr>`
                //  xiugaiDOm是在点击修改事件的时候存起来的修改按钮
                 xiugaiDOm.parents('tr').before(html)
                //  debugger
                 xiugaiDOm.parents('tr').remove()

                 $('.add').parent().show().next().hide()
                }
            }
        })
    })

    // 点击取消
    $('.quxiao').on('click',function(){
        $('.add').parent().show().next().hide()
        nameDom.val('')
        slugDom.val('')
        classnameDom.attr('class','fa fa-glass')
    })
})