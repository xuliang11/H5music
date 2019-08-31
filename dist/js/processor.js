// 进度条功能
(function($,root){
var $scope=$(document.body);
var starTime;
var curDuratio;
var frameID;//暂停
var lastPercettage=0;//暂停的时间
// 时间转化
function formatTime(time){
    time=Math.round(time);
    var minute=Math.floor(time/60);
    var second=time-minute*60;
    if(minute<10){
     minute="0"+minute;
    }
    if(second<10){
        second="0"+second;
       }
       return minute+":"+second;
}
//渲染总时间
    function render(duration){
        curDuratio=duration;
          lastPercettage=0;
          updata(0);
      var allTime=formatTime(duration);
     $scope.find(".all-time").text(allTime);

}
    function setProcessor(percentage){
       var percent=(percentage-1)*100+"%";
       $scope.find('.pro-top').css({
        "transform":"translateX("+percent+")"
    });
}
    function updata(percentage){
       var curTime=formatTime(percentage*curDuratio);
       $scope.find(".cur-time").text(curTime);
       setProcessor(percentage);
}
// 渲染当前时间与进度条
    function start(percent){
        if(percent===undefined){
            lastPercettage=lastPercettage;
        }else{
            lastPercettage=percent;
        }
        cancelAnimationFrame(frameID);
       starTime=new Date().getTime();
    function frame(){
        var curTime=new Date().getTime();
        var percentage=lastPercettage+(curTime-starTime)/(curDuratio*1000);
        if(percentage<1){
         updata(percentage);
         frameID=requestAnimationFrame(frame)
        }else{
        cancelAnimationFrame(frameID);
     }

  }
  frame();
}
// 结束动画
function stop(){
    cancelAnimationFrame(frameID);
    var curTime=new Date().getTime();
   lastPercettage=lastPercettage+(curTime-starTime)/(curDuratio*1000);
   
}
root.processor={
    render:render,
    start:start,
    stop:stop,
    updata:updata
}
}(window.Zepto,window.player||(window.player={})))