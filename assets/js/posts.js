$(function(){

    // 发ajax请求，渲染页面
    $.ajax({
        type:'get',
        url:'/admin/posts/getTenData',
        data:{
            pageIndex:1,
            pageSize:10
        },
        success(res){
            if(res.code==200){
                // 获取到数据，渲染页面
                total = res.total
                let html = template('tp',res.data)
                $('tbody').html(html)
                getmaxtotal(total)
            }else{
                console.log(res.msg);
            }
        }
    })
    function getmaxtotal(){
        // 别人封装好的方法
        // 选择器是写ul的选择器
        $('#fenyeBtn').twbsPagination({
            // 最大页码数
          totalPages: total,
            // 总共显示多少个按钮
          visiblePages: 10,
            // 各个按钮的文字
          first : '首页',
          last : '尾页',
          prev : '上一页',
          next : '下一页',
            // 按钮的点击事件
          onPageClick : function(e,p){
            // e 事件对象 p 当前点击的按钮的页码
            $.ajax({
                type:'get',
                url:'/admin/posts/getTenData',
                data:{
                    pageIndex:p,
                    pageSize:10
                },
                success(res){
                    if(res.code==200){
                        // 获取到数据，渲染页面
                        let html = template('tp',res.data)
                        $('tbody').html(html)
                    }else{
                        console.log(res.msg);
                    }
                }
            })
          }
        });
    }
})