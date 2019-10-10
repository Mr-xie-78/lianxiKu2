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

    $('.form-group .btn').on('click',function(){
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
                      <a href="javascript:;" class="btn btn-info btn-xs">编辑</a>
                      <a href="javascript:;" class="btn btn-danger btn-xs">删除</a>
                    </td>
                  </tr>`
                    // text返回的是字符串，html返回的才是html
                    $('#tbody').append(html)
                }
            }
        })
    })
})