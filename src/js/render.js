// 封装渲染模块
// 渲染歌曲信息
(function($,root){
function renderInfo(data){
    // 添加歌曲
    // 获取div
    var html="<h1 class='song-name'>"+data.song+"</h1>"+
    "<h3 class='singer-name'>"+data.singer+"</h3>"+
    "<h3 class='album-name'>"+data.album+"</h3>";
    // 
    $scope.find('.song-info').html(html);

}
// 渲染歌曲图片
function renderImage(src){
var img=new Image();
img.onload=function(){
    $scope.find(".song-img img").attr("src",src);
    root.blurImg(img,$scope);
}
img.src=src;
}
//渲染喜欢按钮
function renderLikeButton(isLike){
  if(isLike){
      $scope.find(".like-btn").addClass("liked");
  }else{
      $scope.find(".like-btn").removeClass("liked");
  }
}

//回调
root.render=function(data){
    renderInfo(data);
    renderImage(data.image);
    renderLikeButton(data.isLike);
}

}(window.Zepto,window.player||(window.player={})))