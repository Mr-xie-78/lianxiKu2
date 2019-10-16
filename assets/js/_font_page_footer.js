// 入口函数
$(function(){
    // 发请求，拿数据，渲染导航
    $.ajax({
        type:'get',
        url:'/getNavigatorList',
        success(res){
            if(res.code == 200){
                let html = ''
                res.data.forEach(e => {
                    html += `<li><a href="/list.html?id=${e.id}"><i class="fa ${e.classname}"></i>${e.name}</a></li>`
                });
                $('.nav').html(html)
            }
        }
    })
    
})