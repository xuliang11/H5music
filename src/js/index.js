// // 模块化作用域封闭 全局变量不受污染
// (function(){
// // 主体参数
// }(window,function(){
// }));
var root=window.player;
var $=window.Zepto;
var $scope=$(document.body);
var songList;
var controlmanager;
var audiomanager=new root.audioManager();
var processor=root.processor;
var playlist=root.playlist;
$scope.on("play:change",function(e,index,flag){
    // root.render(songList[index]);
    var curdata=songList[index];
    root.render(curdata);
    audiomanager.setAudioSource(curdata.audio);
    if(audiomanager.status==="play"||flag){
        audiomanager.play();
        processor.start(); 
    }
    processor.render(curdata.duration);
})
$scope.on("click",".prev-btn",function(){
    var index=controlmanager.prev();
    $scope.trigger("play:change",[index]);
})
$scope.on("click",".next-btn",function(){
   var index=controlmanager.next();
    $scope.trigger("play:change",[index]);
})
$scope.on("click",".play-btn",function(){
if(audiomanager.status==="play"){
    audiomanager.pause();
    processor.stop();
}else{
    processor.start();
    audiomanager.play();
}
// 渲染播放暂停按钮
$scope.find(".play-btn").toggleClass('playing');
})
// 循环列表
$scope.on("click",'.list-btn',function(){
    playlist.show(controlmanager);

});
// 进度条拖拽
function bindTocuh(){
    var $slidePoint=$scope.find('.slide-point');
    var offset =$scope.find('.pro-wrapper').offset();
    var left=offset.left;
    var width=offset.width;
    $slidePoint.on("touchstart",function(e){
     root.processor.stop();
    }).on("touchmove",function(e){
            var x=e.changedTouches[0].clientX;
            var percentage=(x-left)/width;
    if(percentage>1||percentage<0){
         percentage=0;
    }
        processor.updata(percentage);
    }).on("touchend",function(e){
    var x=e.changedTouches[0].clientX;
    var percentage=(x-left)/width;
    if(percentage>1||percentage<0){
         percentage=0;
    }
    processor.start(percentage);
  var curDuration= songList[controlmanager.index].duration;
   var duration=curDuration*percentage; 
  audiomanager.jumptoPlay(duration);
  $scope.find(".play-btn").addClass("playing");
});
   
}
function getData(url){
   $.ajax({
    // 地址
    url:"/mock/data.json",
    // 获取类型
    type:"GET",
    // 回调函数
    success:successdFn,
    error:function(){
        console.log("获取歌曲信息失败");
    }
   })
}
// 渲染歌曲信息
function successdFn(data){
    bindTocuh();
    controlmanager= new root.controlManager(data.length);
    songList=data;
    $scope.trigger("play:change",[0  ]);
    playlist.render(data);
}
  getData("/mock/data.json");

