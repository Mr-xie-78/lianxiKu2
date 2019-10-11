$(function(){
    // 实现点击父级菜单，可以展开和收起子级菜单的代码
  $('.aside > ul').collapse();

  let index = location.href.lastIndexOf('/')
//   console.log(index)
  let href = location.href.substring(index)
  // console.log(href);
    if(href === '/categories.html'){
        $('#menu-posts').removeClass('collapse')
    }
})