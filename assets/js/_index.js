$(function(){
    // 最新发布位置的请求和渲染
    let pageIndex = 1;
    let total = null
    getMoreByPageIndex(1,5)
    
    function getMoreByPageIndex (pageIndex,tiaoshu){
        $.ajax({
            type:'get',
            url:'/getLastedPosts',
            data:{
                pageIndex,
                tiaoshu
            },
            success(res){
                if(res.code == 200){
                    console.log(res)
                    // 得到数据，使用模板引擎渲染页面
                    let html = template('tp',res.data)
                    $('.new > .load-more').before(html);
                    total = res.total
                }
            }
        })
    }
   
    // 绑定加载更多点击事件
    $('#load-more').on('click',function(){
        pageIndex++
        if(pageIndex>total){
            $('#load-more').text(',没有更多数据了')
        }else{
            getMoreByPageIndex(pageIndex,5)
        }
    })
})