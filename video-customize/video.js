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
                    $('.video-toolvar-danmu').css({
                        'display':'none'
                    });
                    $('.barrage-toolbar-left-input-button').css({
                        'display':'none'
                    });
                    _control_switch = false;
                }else{
                    $('.barrage-toolbar-switch-btn-control').css({
                        'left':'0px'
                    });
                    $('.barrage-toolbar-switch-btn').css({
                        'background-color':'#449f1c'
                    });
                    $('.video-toolvar-danmu').css({
                        'display':'block'
                    });
                    $('.barrage-toolbar-left-input-button').css({
                        'display':'block'
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

        //弹幕颜色选择
        $('#barrageColorChoice').on({
            'click':function(ev){
                var _barrage_color = ev.target.id;
                $('.video-toolvar-danmu').css({
                    'color':'#' + _barrage_color
                });
            }
        });







        //setImgAndColor();参数1：父元素，参数2：原本的图片名称，参数3：hover要替换的文件名称
        function setImgAndColor(parentClass,img,imghover){
            $('.' + parentClass).mouseover(function(){
                $('.' + parentClass).css({
                    'backgroundImage':'url(./img/' + imghover + ')',
                    'background-size':'25px 25px'
                });
            });

            $('.' + parentClass).mouseout(function(){
                $('.' + parentClass).css({
                    'backgroundImage':'url(./img/' + img + ')',
                    'background-size':'25px 25px'
                });
            });
        }
        setImgAndColor('barrage-toolbar-right-praise-img','clickdianzan.png','clickdianzanhover.png');
        setImgAndColor('barrage-toolbar-right-share-img','clickfenxiang.png','clickfenxianghover.png');
        setImgAndColor('barrage-toolbar-right-collection-img','clickshoucang.png','clickshoucanghover.png');
        setImgAndColor('barrage-toolbar-right-download-img','clickxiazai.png','clickxiazaihover.png');
        //点赞分享等hover
        $('.barrage-toolbar-right-praise-img').on({
            'click':function(){
                var _num = parseInt($('.barrage-toolbar-right-praise-span').text());
                if(_num >= 1140){
                    alert("^_^，不要再点伦家啦~~，你已经赞过很多次了哦~~");
                }else{
                    $('.barrage-toolbar-right-praise-span').text(_num + 1);
                    $('.barrage-toolbar-right-praise-span').css({
                        'color':'#2eff1c'
                    });
                }

            }
        });

        //下载
        $('.barrage-toolbar-right-download').on('click',function(ev){
            window.location.href = './shiping/Vue.zip'
        });
        $('.barrage-toolbar-right-collection').on('click',function(ev){
            alert('由于浏览器限制，您想添加到收藏夹必须由您手动添加\n\n【快捷键：Ctrl + D】\n\n 快速添加到收藏夹！');
        });
        $('.barrage-toolbar-right-share').on('click',function(){
            window.open('http://weibo.com/u/6006680328/home');
        });
    })();

    //    监听滚动条的高度，超出一定的范围，将在右下角出现一个视屏的播放，小的；
    var myvideo2 = document.getElementById('myvideo2');
    var myvideo2switch = true;
    myvideo2.onclick = function(){
        if(myvideo2switch){
            myvideo2.play();
            myvideo2switch = false;
        }else{
            myvideo2.pause();
            myvideo2switch = true;
        }
    }

    $(document).on({
        'scroll':function(){
            var _scrollTop = $(document).scrollTop();
            if(_scrollTop > 600){
                $('.global-video-container').css({
                    'display':'block'
                });
                $('.scroll-top').css({
                    'display':'block'
                });
                myvideo2.play();
                myvideo2switch = false;
            }else{
                $('.global-video-container').css({
                    'display':'none'
                });
                $('.scroll-top').css({
                    'display':'none'
                });
                myvideo2.pause();
                myvideo2switch = true;
            }
        }
    });


    //评论框内容改变统计字数
    $('.god-comment-input-commentInt').on({
        'input':function(){
            $('.god-comment-input-text-span').text(140 - $('.god-comment-input-commentInt').val().length);
        },
        'focus':function(){
            $('.god-comment-input-commentInt').css({
                'border':'1px solid #39f'
            });
            $('.god-comment-btn-err').text('');
        },
        'blur':function(){
            $('.god-comment-input-commentInt').css({
                'border':'1px solid #c0c0c0'
            });
        }
    });

    //发送按钮按下和弹起事件
    $('.god-comment-btn-text').on({
        'mousedown':function(){
            $('.god-comment-btn-text').css({
                'background-color':'#c0c0c0'
            });
        },
        'mouseup':function(){
            $('.god-comment-btn-text').css({
                'background-color':'#39f'
            });
        },
        'click':function(){
            //最终要追加到ul下
            var  _new_comment_ul = document.getElementsByClassName('new-comment-ul')[0];
            //得到用户输入的值
            var  commentInt = $('#commentInt').val();
            //创建所有的元素和属性

            if(commentInt == ''){
                $('.god-comment-input-commentInt').css({
                    'border':'1px solid #f00'
                });
                $('.god-comment-btn-err').text('你还没有输入内容，不能发送哦...');
            }else{
                var _li = document.createElement('li');
                _li.setAttribute('class','new-comment-li');
                var _div_head = document.createElement('div');
                _div_head.setAttribute('class','new-comment-li-leftHead');
                var _div_head_img = document.createElement('img');
                _div_head_img.src = './img/zhouxingchi.jpg';



                var _div_content = document.createElement('div');
                _div_content.setAttribute('class','new-comment-li-content');

                var _div_content_name = document.createElement('div');
                _div_content_name.setAttribute('class','new-comment-li-content-name');

                var _div_content_name_txt = document.createElement('span');
                var _div_content_name_txt_wenben = document.createTextNode('起个名真难！');
                _div_content_name_txt.setAttribute('class','new-comment-li-content-name-text');
                _div_content_name_txt.appendChild(_div_content_name_txt_wenben);
                var _div_content_name_time = document.createElement('span');
                var _div_content_name_time_wenben = document.createTextNode('2017/8/9');
                _div_content_name_time.setAttribute('class','new-comment-li-content-name-time');
                _div_content_name_time.appendChild(_div_content_name_time_wenben);


                var _div_content_txt = document.createElement('div');
                var _div_content_txt_wenben = document.createTextNode(commentInt);
                _div_content_txt.setAttribute('class','new-comment-li-content-txt');
                _div_content_txt.appendChild(_div_content_txt_wenben);


                //开始追加元素
                _div_head.appendChild(_div_head_img);

                _div_content.appendChild(_div_content_name);
                _div_content.appendChild(_div_content_txt);

                _div_content_name.appendChild(_div_content_name_txt);
                _div_content_name.appendChild(_div_content_name_time);

                _li.appendChild(_div_head);
                _li.appendChild(_div_content);

                _new_comment_ul.appendChild(_li);
                $('#commentInt').val('');
                $('.god-comment-input-text-span').text(140);
            }
        }
    });


    //返回顶部
    var scrollToptime = null;
    $('.scroll-top').on({
        'mouseover':function(){
            $('.scroll-top').css({
                'background-Image':'url(./img/scrollTophover.png)'
            });
        },
        'mouseout':function(){
            $('.scroll-top').css({
                'background-Image':'url(./img/scrollTop.png)'
            });
        },
        'click':function(){
            var _scroll_Top = $(document).scrollTop();
            scrollToptime = setInterval(function(){
                if(_scroll_Top <= 0){
                    clearInterval(scrollToptime);
                }else{
                    $(document).scrollTop(_scroll_Top - 20);
                    _scroll_Top -= 150;
                }
            },30)
        }
    });


    //弹幕
    (function(){

        // var tucao = document.getElementById('tucao');
        // var tucaoAfter = window.getComputedStyle(tucao,':after').content;
        // console.log(tucaoAfter);
        //这是获取一个元素的伪类，可以修改content和style，但是添加不了事件;
        //弹幕
        //当input获得焦点的时候将警告样式改回去

        var inputObj = document.getElementsByClassName('barrage-toolbar-left-input-tucao')[0];
        inputObj.addEventListener('focus',function(){
            inputObj.style.border = '2px solid #252528';
            inputObj.setAttribute('placeholder','狠狠地吐槽吧！');
        });

        //发送按钮的点击事件
        var barrageclick = document.getElementsByClassName('barrage-toolbar-left-input-button')[0];
        var videoContainer = document.getElementsByClassName('video-container')[0];

        var barrageArr = [150,200,250,300,350,400,450,500,550,470];
        barrageclick.addEventListener('click',function(ev){
            var inputObj = document.getElementsByClassName('barrage-toolbar-left-input-tucao')[0];
            var barrageTime = null;
            if(inputObj.value == ''){
                inputObj.style.border = '2px solid #ff7835';
                inputObj.setAttribute('placeholder','请输入内容！');
            }else{
                //创建一个承载弹幕评论的div
                var barrageRandom = parseInt((Math.random())*10);
                var video_toolvar_danmu = document.createElement('div');
                video_toolvar_danmu.setAttribute('class','video-toolvar-danmu');
                var video_toolvar_danmu_txt = document.createTextNode(inputObj.value);
                video_toolvar_danmu.appendChild(video_toolvar_danmu_txt);
                video_toolvar_danmu.style.bottom = barrageArr[barrageRandom]+'px';

                videoContainer.appendChild(video_toolvar_danmu);

                //同时还要将弹幕文字放到弹幕列表里去；
                var barrageListObj = document.getElementsByClassName('recommendVideo-tab-list1-tbody')[0];
                var _tr = document.createElement('tr');
                var _name_td = document.createElement('td');
                var _barrage_td = document.createElement('td');
                var _time_td = document.createElement('td');

                var _name_td_txt = document.createTextNode('天下第一');
                _name_td.setAttribute('class','recommendVideo-tab-list1-tbody-tr-td');
                var _barrage_td_txt = document.createTextNode(inputObj.value);
                var date = new Date();
                var __hour = date.getHours();
                var __minute = date.getMinutes();
                var _time_td_txt = document.createTextNode(__hour + ':' + __minute);


                _name_td.appendChild(_name_td_txt);
                _barrage_td.appendChild(_barrage_td_txt);
                _time_td.appendChild(_time_td_txt);

                _tr.appendChild(_name_td);
                _tr.appendChild(_barrage_td);
                _tr.appendChild(_time_td);

                barrageListObj.appendChild(_tr);
                var commentNumber = $('.recommendVideo-tab-list1-tbody tr');
                $('.recommendVideo-audienceNumbei-barrage').text(commentNumber.length);





                inputObj.value = '';
                var index = 1;
                barrageTime = setInterval(function(){

                    if(index > 1100){
                        clearInterval(barrageTime);
                        console.log('定时器清除成功' + index);
                        videoContainer.removeChild(video_toolvar_danmu);
                        index = null;
                    }else{
                        video_toolvar_danmu.style.left = index+'px';
                        index++;
                    }

                },30);



            }
        })
    })();






});


