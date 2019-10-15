$(function(){
    // 实现点击父级菜单，可以展开和收起子级菜单的代码
  $('.aside > ul').collapse();

  let index = location.href.lastIndexOf('/')
//   console.log(index)
  let href = location.href.substring(index)
  // console.log(href);
    if(href === '/categories.html'|| href ==='/getPostsAdd.html' || href ==='/posts.html'){
        $('#menu-posts').removeClass('collapse')
    }
  
  // 把本地数据渲染
    let data = JSON.parse(localStorage.getItem('shuju'))
    $('.avatar').attr('src',data.avatar)
    $('.name').text(data.nickname)

    // 实现点击退出按钮退出登录
    $('#outLogin').on('click',function(){
      // 发ajax请求
      $.ajax({
        type:'get',
        url:'/admin/user/outLogin',
        success(res){
          if(res.code == 200){
            location.href = '/admin/user/login.html'
          }
        }
      })
    })
})