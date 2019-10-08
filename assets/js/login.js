

// 先进行格式判断
$('.btn').on('click',function(){
    let email = $('#email').val();
    if(email.trim()==0){
        $('.container-fluid').text('邮箱不能为空');
        $("#modelId").modal();
        return
    }
    let reg = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/;

    if(!reg.test(email)){
        $('.container-fluid').text('邮箱格式不符合');
        $("#modelId").modal();
        return
    }

    // 获取表单数据
    let data = $('.login-wrap').serialize()
    // console.log(data);
    $.ajax({
        url : '/admin/user/userLogin',
        type : 'post',
        data ,
        success(res) {
        // console.log(res);
            if(res.code === 200){
                // 登录成功
                $('.container-fluid').text('登录成功');
                $("#modelId").modal();
                inLogin = true
            }else{
                // 提示失败
                $('.container-fluid').text('登录失败');
                $("#modelId").modal();
            }
        }
    })
})


var inLogin = false
$('.modal-footer').on('click','.btn',function(){
    if(inLogin){
        // 记得这里跳转是通过url跳转的
        location.href = '/admin/index.html' 
    }
})