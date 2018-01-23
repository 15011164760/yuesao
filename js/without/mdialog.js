/*  
 * @description 默认配置参数   
 * @param {Number} width -宽度  
 * @param {Number} height -位置高度         
 * @param {String} str -中间的提示文字  
 * @param {String} iconStr -图标下方的提示文字  
 * @param {Object} windowDom -载入窗口 默认当前窗口  
 * @param {Number} setTime -定时消失(毫秒) 默认为0 不消失  
 * @param {Boolean} hasMask -是否显示遮罩  
 * @param {Boolean} hasMaskWhite -显示白色遮罩   
 * @param {Boolean} clickDomCancel -点击空白取消  
 * @param {Function} callBack -回调函数
 * @param {Function} callBack2 -针对删除联系人/取消订单的回调函数
 * @param {Boolean} hasBtn -显示按钮  
 * @param {String} type -图标类型 
 (  
    提示                  tip
    移除联系人            removePeople
    成功                  success
    取消订单              cancelOrder
    去支付                pay
    错误                  error
)  
 * @param {String} colorType - 颜色类型 (住院hospital/就医doctor/月嫂month/系统system)  
 * @param {Boolean} FeedBack - 是否是反馈页面
 * @param {String} ok - 确定按钮文字  
 * @example   
 * new TipBox();   
 * new TipBox({type:'load',setTime:1000,callBack:function(){ alert(..) }});   
*/  
function TipBox(cfg){  
    this.config = {   
        width          : 8.6,      
        height         : 6.09,                 
        str            : '',       
        iconStr      : '',       
        windowDom      : window,   
        setTime        : 0,     
        hasMask        : true,    
        hasMaskWhite   : false,   
        clickDomCancel : false,    
        callBack       : null,
        callBack2      : null,
        hasBtn         : false, 
        type           : '',
        colorType      : '',
        FeedBack       : false,
        Ok             : ''
    }  
    $.extend(this.config,cfg);    
      
    //存在就retrun  
    if(TipBox.prototype.boundingBox) return;  
      
    //初始化  
    this.render(this.config.type);    
    return this;   
};  
  
//外层box  
TipBox.prototype.boundingBox = null;  
  
//渲染  
TipBox.prototype.render = function(tipType,container){    
    this.renderUI(tipType);   
      
    //绑定事件  
    this.bindUI();   
      
    //初始化UI  
    this.syncUI();   
    $(container || this.config.windowDom.document.body).append(TipBox.prototype.boundingBox);     
};  
  
//渲染UI  
TipBox.prototype.renderUI = function(tipType){   
    TipBox.prototype.boundingBox = $("<div id='animationTipBox'><div id='alertClose'></div><div id='alertTop'><span id='alertIcon'></span><p id='iconStr'>"+this.config.iconStr+"</p><p id='alertStr2'></p></div><div id='alertBottom'></div></div>");
    TipBox.prototype.boundingBox.appendTo(this.config.windowDom.document.body);  
    this.tipRenderUI(); 
                  
    //是否显示遮罩  
    if(this.config.hasMask){  
        this.config.hasMaskWhite ? this._mask = $("<div class='mask_white'></div>") : this._mask = $("<div class='mask'></div>");  
        this._mask.appendTo(this.config.windowDom.document.body);  
    }     
    // 是否显示按钮
    if(this.config.hasBtn){
        $('#animationTipBox').css("margin-top","103px");
        switch(this.config.colorType){
            case 'hospital':
                $('#alertTop').css({
                    'background':'url(../../img/comment/alert/bg_hospital.png)no-repeat',
                    'background-size':'100% 100%'
                });
                $('.color').css('color','#72BFF7');
                $('.okoButton').css({
                    'background':'#72BFF7',
                    'box-shadow':'12px 0 0 #61b7f6 inset'
                });
                $('.finishButton').css({
                    'background':'#72BFF7',
                    'box-shadow':'12px 0 0 #61b7f6 inset'
                });
                break;
            case 'doctor':
                $('#alertTop').css({
                    'background':'url(../../img/comment/alert/bg_doctor.png)no-repeat',
                    'background-size':'100% 100%'
                });
                $('.color').css('color','#C89372');
                $('.okoButton').css({
                    'background':'#DF9B70',
                    'box-shadow':'12px 0 0 #DF8E5A inset'
                });
                $('.finishButton').css({
                    'background':'#DF9B70',
                    'box-shadow':'12px 0 0 #DF8E5A inset'
                });
                break;
            case 'month':
                $('#alertTop').css({
                    'background':'url(../../img/comment/alert/bg_month.png)no-repeat',
                    'background-size':'100% 100%'
                });
                $('.color').css('color','#70DADA');
                $('.okoButton').css({
                    'background':'#80DEDE',
                    'box-shadow':'12px 0 0 #70DADA inset'
                });
                $('.finishButton').css({
                    'background':'#80DEDE',
                    'box-shadow':'12px 0 0 #70DADA inset'
                });
                break;
            case 'system':
                if (this.config.FeedBack) {
                    $('#alertTop').css({
                        'background':'url(../../../img/comment/alert/bg_system.png)no-repeat',
                        'background-size':'100% 100%'
                    });
                    $('.color').css('color','#81C5EC');
                    $('.okoButton').css({
                        'background':'#81C5EC',
                        'box-shadow':'7px 0 0 #9AD1F0 inset'
                    });
                    $('.finishButton').css({
                        'background':'#81C5EC',
                        'box-shadow':'7px 0 0 #9AD1F0 inset'
                    });
                }else{
                    $('#alertTop').css({
                        'background':'url(../../img/comment/alert/bg_system.png)no-repeat',
                        'background-size':'100% 100%'
                    });
                    $('.color').css('color','#81C5EC');
                    $('.okoButton').css({
                        'background':'#81C5EC',
                        'box-shadow':'7px 0 0 #9AD1F0 inset'
                    });
                    $('.finishButton').css({
                        'background':'#81C5EC',
                        'box-shadow':'7px 0 0 #9AD1F0 inset'
                    });
                }
                break;
            default: break;
        }
        switch(this.config.type){
            case 'tip':
                $('#alertIcon').addClass("tipIcon");
                break;
            case 'removePeople':
                $('#alertIcon').addClass("removePeopleIcon");
                break;
            case 'success':
                $('#alertIcon').addClass("successIcon");
                break;
            case 'cancelOrder':
                $('#alertIcon').addClass("cancelOrderIcon");
                break;
            case 'pay':
                $('#alertIcon').addClass("payIcon");
                break;
            case 'error':
                $('#alertIcon').addClass("errorIcon");
                break;
            default: break;
        }
        $('button.okoButton').on('click',function(){_this.ok();});
        $('button.finishButton').on('click',function(){_this.finish();});
        $('#alertClose').on('click',function(){_this.close();});
    }
    //定时消失  
    _this = this;      
    this.config.setTime && setTimeout( function(){ _this.ok(); }, _this.config.setTime );  
};  
  
TipBox.prototype.bindUI = function(){  
    _this = this;             
      
    //点击空白立即取消  
    this.config.clickDomCancel && this._mask && this._mask.click(function(){_this.ok();});                        
};  
TipBox.prototype.syncUI = function(){             
    TipBox.prototype.boundingBox.css({  
        width       : this.config.width+'rem',  
        marginLeft  : "-"+(this.config.width/2)+'rem',  
        marginTop   : "-"+(this.config.height/2)+'rem'  
    });   
};  
  
//提示内容  
TipBox.prototype.tipRenderUI = function(){  
    var tip = "<i id='alertIcon2'></i><div class='tip' style='padding: 0 0 20px;'>";  
        tip +="     <div class='dec_txt'>"+this.config.str+"</div>";  
        tip += "</div>";
    if (this.config.type=='removePeople'||this.config.type=='cancelOrder') {
        tip +="<button class='finishButton'>" + this.config.Ok + "</button>";
    }else{
        tip +="<button class='okoButton'>" + this.config.Ok + "</button>";
    }
    $('#alertBottom').html(tip);  
};  

//关闭  
TipBox.prototype.close = function(){      
    TipBox.prototype.destroy();  
    this.destroy();                 
};   
//确定 
TipBox.prototype.ok = function(){      
    TipBox.prototype.destroy();  
    this.destroy();  
    typeof this.config.callBack === "function" && this.config.callBack();                  
};   
//完成
TipBox.prototype.finish = function(){ 
    TipBox.prototype.animate();  
    this.animate();  
    typeof this.config.callBack2 === "function" && this.config.callBack2();
    this.config.callBack2='';               
};   
//销毁  
TipBox.prototype.destroy = function(){  
    this._mask && this._mask.remove();  
    TipBox.prototype.boundingBox && TipBox.prototype.boundingBox.remove();   
    TipBox.prototype.boundingBox = null;  
};
//动画 
TipBox.prototype.animate = function(){  
    $('.animateA').animate({
        left:'-120%'
    },500);
    $('.animateB').animate({
        left:parseFloat($('.dec_txt').css('width'))/2-parseFloat($('.animateB').css('width'))/2
    },500);
    $('.finishButton').unbind('click');
    $('.finishButton').on('click',function(){_this.ok();});
    $('.finishButton').html('好的');
};   