/**
 * Created by Administrator on 2017\7\13 0013.
 */
$(function(){
    //视屏下方的控制条所有操作全部在这个函数中；
    (function(){
        var myvideo = document.getElementById('myvideo');
        var bofangOrzanting = true;
        var hdOptionsShowOrHide = true;
        var playbackSpeedShowOrHide = false;
        var screenWhetherFullscreen = false;
        var yanshitime = null;
        var xunhuantime = null;
        var toogVideoQiehuan = null;
        yanshitime = setTimeout(function(){
            var total = myvideo.duration;//得到总秒数
            var minutes = Math.round(total/60);//得到大概的分钟数
            var second = Math.round(total - minutes*60);//得到大概的秒数
            clearTimeout(yanshitime);
            function xuanhuantimes(){
                xunhuantime = setInterval(function(){
                    //得到已播放的秒数
                    var already_total = Math.round(myvideo.currentTime);//得到已播放的总秒数
                    if(myvideo.ended){
                        console.log("视屏播放完毕");
                        playOrpause();
                    }else{
                        var already_minutes = parseInt(already_total/60);//得到已播放的大概分钟数
                        var already_second = already_total - (already_minutes*60);//得到已播放的分钟数后面余出来的秒数
                        $('.video-toolvar-left-time-span').text("0"+already_minutes+":"+already_second+"/"+"0"+minutes+":"+"0"+second);
                    }
                },30);
            }
            xuanhuantimes();
        },2000);
        function playOrpause(){
            if(bofangOrzanting){
                myvideo.play();
                $('.video-bgcolor-advertisement').css({
                    'display':'none'
                });
                $('.video-toolvar-left-bofang').css({
                    'background-image':'url(./img/zanting.png)',
                    'background-size':'25px 25px'
                });
                $('.video-toolvar-left-time-span').text("00"+":"+"00"+"/"+"00"+":"+"00");
                return bofangOrzanting = false;
            }else{
                myvideo.pause();
                $('.video-bgcolor-advertisement').css({
                    'display':'block'
                });
                $('.video-toolvar-left-bofang').css({
                    'background-image':'url(./img/bofang.png)',
                    'background-size':'25px 25px'
                });
                return bofangOrzanting = true;
            }
        }
        //点击视屏上方，暂停视屏/播放视屏
        $('#myvideo').on({
            click:function(){
                playOrpause();
            }
        });

        //点击左下角的暂停按钮，暂停视屏/播放视屏
        $('.video-toolvar-left-bofang').on({
            click:function(){
                playOrpause();
            }
        });

        //点击播放下一个的操作
        $('.video-toolvar-left-xiayige').on({
            click:function(){
                alert("没有下一个视屏了呢~~~~");
            }
        });

        //全屏操作
        $('.video-toolvar-right-enlarge').on('click',function(){

            if(screenWhetherFullscreen){
                document.webkitExitFullscreen();
                screenWhetherFullscreen = false;
                $('.video-toolvar-right-enlarge').css({
                    'background-image':'url(./img/quanping.png)',
                    'background-size':'25px 25px'
                });
            }else{
                document.getElementsByClassName('video-container')[0].webkitRequestFullscreen();
                screenWhetherFullscreen = true;
                $('.video-toolvar-right-enlarge').css({
                    'background-image':'url(./img/tuichuquanping.png)',
                    'background-size':'25px 25px'
                });
            }
        });

        //音量相关控制
        document.getElementsByClassName('video-toolvar-right-volume')[0].onclick = function(event){
            if(event.target.id == 'video-toolvar-right-volume'){

                //关闭视屏的声音 || 开启视屏声音
                if(myvideo.muted){
                    myvideo.muted=false;
                    $('.video-toolvar-right-volume-drop-down-bgStrip').val(100);
                    $('.video-toolvar-right-volume').css({
                        'background-image':'url(./img/shengyin.png)',
                        'background-size':'25px 25px'
                    });
                }else{
                    myvideo.muted=true;
                    $('.video-toolvar-right-volume-drop-down-bgStrip').val(0);
                    $('.video-toolvar-right-volume').css({
                        'background-image':'url(./img/jingyin.png)',
                        'background-size':'25px 25px'
                    });
                    //需要判断点击元素是哪个，然后根据点击的DOM元素来选择是return还是执行操作；
                }

                //console.log("你点的是小喇叭");
            }else if(event.target.id == 'video-toolvar-right-volume-drop-down-bgStrip'){

                $('.video-toolvar-right-volume-drop-down-bgStrip').on({
                    'mousemove':function(){
                        //得到了滑块的值
                        var values = ($('.video-toolvar-right-volume-drop-down-bgStrip').val())/100;
                        //将滑块的值赋给音量；

                        $('.video-toolvar-right-volume-drop-down input[type=range]:before').text("你好");

                        //得到当前音频的大小，如果不等于0，那就说明有声音，就不要去静音；
                        if(myvideo.volume == 0){
                            myvideo.volume = values;
                            $('.video-toolvar-right-volume').css({
                                'background-image':'url(./img/jingyin.png)',
                                'background-size':'25px 25px'
                            });
                        }else if(myvideo.volume != 0){
                            myvideo.volume = values;
                            $('.video-toolvar-right-volume').css({
                                'background-image':'url(./img/shengyin.png)',
                                'background-size':'25px 25px'
                            });
                        }

                    }
                });

                //console.log("你点的是input");
            }else if(event.target.id == 'video-toolvar-right-volume-drop-down'){
                //console.log("你点的是input外面的那个容器");
                return;
            }else{
                return;
            }
        }

        //声音的滑动条的显示与隐藏
        $('.video-toolvar-right-volume').on({
            'mouseover':function(){
                $('.video-toolvar-right-volume-drop-down input').css({
                    'display':'block'
                });
                $('.video-toolvar-right-volume-drop-down').css({
                    'background':'rgba(0,0,0,0.5)'
                });
            },
            'mouseout':function(){
                $('.video-toolvar-right-volume-drop-down input').css({
                    'display':'none'
                });
                $('.video-toolvar-right-volume-drop-down').css({
                    'background':'rgba(0,0,0,0)'
                });
            }
        });

        //广告上的叉叉hover变背景图
        $('.video-bgcolor-advertisement-close').on({
            'mouseover':function(){
                $('.video-bgcolor-advertisement-close').css({
                    'background-image':'url(./img/guanbihover.png)',
                    'background-size':'20px 20px'
                });
            },
            'mouseout':function(){
                $('.video-bgcolor-advertisement-close').css({
                    'background-image':'url(./img/guanbi.png)',
                    'background-size':'20px 20px'
                });
            },
            'click':function(){
                $('.video-bgcolor-advertisement').css({
                    'display':'none'
                });
            }
        });


        //高清选项
        //hover
        $('.video-toolvar-right-Definition-span-option').on({
            'mouseover':function(ev){
                $(ev.target).css({
                    'background-color':'#39f'
                });
            },
            'mouseout':function(ev){
                $(ev.target).css({
                    'background-color':''
                });
            },
            'click':function(ev){
                $('.toggle-resolution-mask').css({
                    'display':'block'
                });
                bofangOrzanting = false;
                playOrpause();
                toogVideoQiehuan = setTimeout(function(){
                    $('.video-toolvar-right-Definition-span').text(ev.target.innerHTML);
                    clearTimeout(toogVideoQiehuan);
                    $('.toggle-resolution-mask').css({
                        'display':'none'
                    });
                    bofangOrzanting = true;
                    playOrpause();
                    return;
                },1000)
            }
        });

        //点击显示一个框用来选择清晰度
        $('.video-toolvar-right-Definition').on({
            'click':function(){
                if(hdOptionsShowOrHide){
                    $('.video-toolvar-right-Definition-span-option').css({
                        'display':'block'
                    });
                    hdOptionsShowOrHide = false;
                }else if(hdOptionsShowOrHide == false){
                    $('.video-toolvar-right-Definition-span-option').css({
                        'display':'none'
                    });
                    hdOptionsShowOrHide = true;
                }else{
                    return;
                }
            }
        });


        //设置切换视屏清晰度的缓冲遮罩的高度
        $('.toggle-resolution-mask').height($(document).height());


        //播放速度选项
        $('.video-toolvar-right-speed-ul-option').on({
            'mouseover':function(ev){
                $(ev.target).css({
                    'background-color':'#9b9b9b',
                    'color':'#000'
                });
            },
            'mouseout':function(ev){
                $(ev.target).css({
                    'background-color':'',
                    'color':''
                });
            }
        });

        //点击显示一个框用来显示播放速度
        $('.video-toolvar-right-speed').on({
            'click':function(ev){
                if(playbackSpeedShowOrHide){
                    myvideo.playbackRate = parseFloat(ev.target.innerHTML);
                    console.log(myvideo.playbackRate);
                    $('.video-toolvar-right-speed-span').text(ev.target.innerHTML);
                    $('.video-toolvar-right-speed-ul-option').css({
                        'display':'none'
                    });
                    playbackSpeedShowOrHide = false;
                }else if(playbackSpeedShowOrHide == false){
                    $('.video-toolvar-right-speed-ul-option').css({
                        'display':'block'
                    });
                    playbackSpeedShowOrHide = true;
                }else{
                    return;
                }
            }
        });

    })();


    //右侧的推荐视屏和弹幕列表
    (function(){
        //视屏列表的两个选项，点击事件
        $('.recommendVideo-tab').on({
            'click':function(ev){
                if(ev.target.id == 'recommendVideo-tab-tuijian'){
                    $('.recommendVideo-tab span').removeClass('recommendVideo-tab-click');
                    $(ev.target).addClass('recommendVideo-tab-click');
                    $('.recommendVideo-tab-container').css({
                        'display':'block'
                    });
                }else if(ev.target.id == 'recommendVideo-tab-danmu'){
                    $('.recommendVideo-tab span').removeClass('recommendVideo-tab-click');
                    $(ev.target).addClass('recommendVideo-tab-click');
                    $('.recommendVideo-tab-container').css({
                        'display':'none'
                    });

                }
            }
        });

        //观看人数不断的变化，一个定时器
        var audience = null;
        var recommendVideoAudienceNumbeiPeople = document.getElementsByClassName('recommendVideo-audienceNumbei-people')[0];
        audience = setInterval(function(){
            var audienceNum = parseInt(Math.random()*10000);
            recommendVideoAudienceNumbeiPeople.innerText = audienceNum;
        },6000)

        var commentNumber = $('.recommendVideo-tab-list1-tbody tr');
        $('.recommendVideo-audienceNumbei-barrage').text(commentNumber.length);
    })();



    (function(){
        //起名太难了，我还是用拼音吧
        let _control_switch = true;
        let _control_setsize = false;
        //关闭弹幕的按钮
        $('.barrage-toolbar-switch-btn-control').on({
            'click':function(){
                if(_control_switch){
                    $('.barrage-toolbar-switch-btn-control').css({
                        'left':'25px'
                    });
                    $('.barrage-toolbar-switch-btn').css({
                        'background-color':'#333'
                    });
                    _control_switch = false;
                }else{
                    $('.barrage-toolbar-switch-btn-control').css({
                        'left':'0px'
                    });
                    $('.barrage-toolbar-switch-btn').css({
                        'background-color':'#449f1c'
                    });
                    _control_switch = true;
                }
            }
        });

        //弹幕设置
        $('.barrage-toolbar-left-setsize').on({
            'click':function(ev){
                if(ev.target.id == 'barrage-toolbar-left-setsize' || ev.target.id == 'barrage-toolbar-left-setsize-shezhi'){
                    if(_control_setsize){
                        $('.barrage-toolbar-left-setsize-panel').css({
                            'display':'none'
                        });
                        _control_setsize = false;
                    }else{
                        $('.barrage-toolbar-left-setsize-panel').css({
                            'display':'block'
                        });
                        _control_setsize = true;
                    }
                }else{
                    return;
                }

            }
        });


    })();









});





