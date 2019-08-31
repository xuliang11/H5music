// 管理歌曲播放模块
(function($,root){
    function audioManager(){
        this.audio=new Audio();
        this.status="pause";
        this.binEvent();
    }
    // 歌曲播放功能
    audioManager.prototype={
        // 歌曲播放完毕跳转
        binEvent:function(){
            $(this.audio).on("ended",function(){
                $scope.find(".next-btn").trigger('click');
            })
        },
        play:function(){
            // 绑定事件
            this.audio.play();
            this.status="play";
        },
        pause:function(){
            this.audio.pause();
            this.status="pause";
        },
        // 切换歌曲音频路径
        setAudioSource:function(src){
            this.audio.src=src;
            this.audio.load();
        },jumptoPlay:function(duration){
            this.audio.currentTime=duration;
            this.play();
        }

    }
    root.audioManager=audioManager;
}(window.Zepto,window.player||(window.player={})))
