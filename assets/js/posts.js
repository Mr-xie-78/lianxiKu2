$(function(){

    // 发ajax请求，渲染页面
    // $.ajax({
    //     type:'get',
    //     url:'/admin/posts/getTenData',
    //     data:{
    //         pageIndex:1,
    //         pageSize:10
    //     },
    //     success(res){
    //         if(res.code==200){
    //             // 获取到数据，渲染页面
    //             total = res.total
    //             let html = template('tp',res.data)
    //             $('tbody').html(html)
    //             getmaxtotal(total)
    //         }else{
    //             console.log(res.msg);
    //         }
    //     }
    // })
    function getmaxtotal(total){
        // 别人封装好的方法
        // 选择器是写ul的选择器
        $('#page').twbsPagination({
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
            getPostByPageAndFilter(p,10)
          }
        });
    }

    // 发ajax请求，渲染分类
    $.ajax({
        type:'get',
        url:'/admin/posts/getFengLei',
        success(res){
            if(res.code==200){
                // 获取到数据，渲染页面
                // console.log(res.data)
                let html = `<option value="0">所有分类</option>`
                // console.log(res);
                
                res.data.forEach(e => {
                    html+=`<option value="${e.id}">${e.name}</option>`
                });
                // console.log(html)
                $('#name').html(html)
            }else{
                console.log(res.msg);
            }
        }
    })

    // 绑定筛选按钮事件
    $('#button').on('click',function(e){
        e.preventDefault()
        debugger
        // 把分页插件摧毁，在请求回来之后，重新生成,ul的id不要写错了
        $('#page').twbsPagination('destroy');
        // 回到第一页
        getPostByPageAndFilter(1,10);
        
    })

    function getPostByPageAndFilter(pageIndex,pageSize){
        // debugger
        // 获取数据,刷新页面的时候获取的数据是全部，因为category_id和status都没有
        let category_id = $('#name').val()
        if(!category_id){
            category_id=0
        }
        let status = $('#status').val()
        // console.log(category_id)
        // 发送ajax请求
        $.ajax({
            type:'get',
            url:'/admin/posts/getNewPoatByData',
            data:{
                category_id,
                status,
                pageIndex,
                pageSize
            },
            success(res){
                // console.log(res);
                // 渲染页面
                let html = template('tp',res.data)
                // console.log(html)
                
                $('tbody').html(html)  
                // debugger 
                getmaxtotal(res.total)
            }
        })
    }

    // 刷新页面调用，已经封装好了
    getPostByPageAndFilter(1,10)



    // 给删除按钮添加点击事件
    $('tbody').on('click','#del',function(){
        if(!confirm('您确定要删除吗？')) return;

        // 获取id，发ajax请求
        let id = $(this).parents('tr').attr('data-id')
        // console.log(id);
        
        $.ajax({
            type:'get',
            url:'/admin/posts/delPostById',
            data:{
                id
            },
            success:(res)=>{
                if(res.code==200){
                    console.log(res)
                    $(this).parents('tr').remove()
                }else{
                    console.log(res.msg);
                }
            }
        })
    })

    // 给全选checkbox添加点击事件
    $('thead [type="checkbox"]').on('click',function(){
        let bl = $('thead [type="checkbox"]').prop('checked')
        $('tbody [type="checkbox"]').prop('checked',bl)
        bl ? $('#somedel').show():$('#somedel').hide()
    })

    // 给单个checkbox添加点击事件
    $('tbody').on('click','[type="checkbox"]',function(){
        let bl = $(this).prop('checked')
        $(this).prop('checked',bl)
        if($('tbody [type="checkbox"]:checked').length ===$('tbody [type="checkbox"]').length){
            $('#somedel').prop('checked',true)
        }else{
            $('#somedel').prop('checked',false)
        }
        if($('tbody [type="checkbox"]:checked').length>1){
            $('#somedel').show()
        }else{
            $('#somedel').hide()
        }
    })

    // 给批量删除添加点击事件
    $('#somedel').on('click',function(){
        let ids = []
        // 用foreach无法遍历伪数组，得用each,jq方法
        $('tbody [type="checkbox"]:checked').each((i,e)=>{
            // e是按钮，而id存储在tr身上，要从tr那里得到id
            let id = $(e).parents('tr').attr('data-id');
            ids.push(id);
          });
        // console.log(ids)
        // 得到id，发请求
        $.ajax({
            type:'get',
            data:{
                ids
            },
            url:'/admin/posts/delSomePost',
            success(res){
                if(res.code==200){
                    console.log(res)
                    $('tbody [type="checkbox"]:checked').parents('tr').remove()
                }else{
                    console.log(res.msg);
                }
            }
        })
    })
})