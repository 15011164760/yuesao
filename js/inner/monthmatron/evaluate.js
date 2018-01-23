function backpre(){
  // alert('backpre触发啦');
}
$(function(){
    var JianKang=JSON.parse(localStorage.getItem('JianKang')|| '{}');
  // 从登陆页面跳转回来时刷新 
  window.addEventListener('pageshow', function () { 
    if (sessionStorage.getItem('key_a')) {
      window.location.reload(); 
      sessionStorage.removeItem('key_a');
    }
　　}); 
// 判断TOKEN_ID
  if (JianKang.TOKEN_ID) {
        $.ajax({
            headers: {'hx_token': JianKang.TOKEN_ID},
            url:'/appuser/Personal/checkTokenId',
            success:function(data){
                if (data=='0') {
                  localStorage.removeItem('JianKang');
//                  new TipBox({type:'tip',str:'登录失效，请重新登录',setTime:10000500,hasBtn:true,dbBtn:false,callBack:function(){  
                        window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4c861955f00d8166&redirect_uri=http://admin.jkzdw.com/web/html/MyPage/login.html&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect ';
//                  }});
                }
            }
        })
    }else{
        localStorage.removeItem('JianKang');
//      new TipBox({type:'tip',str:'请登录账号',setTime:10000500,hasBtn:true,dbBtn:false,callBack:function(){  
            window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4c861955f00d8166&redirect_uri=http://admin.jkzdw.com/web/html/MyPage/login.html&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect';
//      }});
    }
    //判断是否登录结束
	 //点击跳转上个页面
    // $('.backup').on('touchend',function(){
    //       window.history.back();
    //       // backpre();
    //   });
     var ua = navigator.userAgent.toLowerCase();
     if(ua.match(/MicroMessenger/i)=="micromessenger") {
           $('.backup img').hide();
        }
    $('.backup').on('touchend',function(){
           if (/android/.test(ua)) {
            window.jsi.goBack();
            // alert('安卓端');
            }else if (/iphone|ipad|ipod/.test(ua)) {
                goBack();
                // alert('苹果端');
            }  
      });
      //ajax请求开始 得到下单者键值
    $.ajax({
               type: 'GET',
               headers: {'hx_token':JianKang.TOKEN_ID},
               // url:'/appuser/Shop/GetMyShoppingOrderList',
               url:'/appuser/Matron/GetApplyMatronByID?APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID'),
               // dataType:'json',
               // data: APPLYMATRONLIST_ID,//要发送的数据（参数）
               success:function(msg){
                   $.ajax({
                           type: 'GET',
                           headers: {'hx_token':JianKang.TOKEN_ID},
                           // url:'/appuser/Shop/GetMyShoppingOrderList',
                           url:'/appuser/Hospital/GetEscortInfoByEscortsId?ESCORTS_ID='+msg.pd.ESCORTS_ID,
                           // dataType:'json',
                           // data: usersinfo,//要发送的数据（参数）
                           success:function(data){
                            if(data.pd.IMGURL){
                              $('.yuesaoimg').attr('src','/uploadFiles/uploadImgs/'+data.pd.IMGURL);//月嫂图片
                            }
                              $('.yusaoname').text(data.pd.ESCORTNAME);//月嫂姓名
                              $('.yuesaoid').text('ID:'+data.pd.ESCORTNUMBER);//编号id
                              if(data.pd.GENDER==0){
                                 $('.yusaoinfo').text('女 / '+data.pd.NATIVEPLACE+'/'+data.pd.SERVICEYEAR+'年护理经验');
                              }
                              else if(data.pd.GENDER==1){
                                 $('.yusaoinfo').text('男 / '+data.pd.NATIVEPLACE+'/'+data.pd.SERVICEYEAR+'年护理经验');
                              }
                          var change=1;
                            $('.likewith').on('touchend',function(){
                              if($(this).is('.notlike')){
                                change=0;
                                $(this).find('.selectbtn').attr('src','../../img/monthmatron/grayright.png');
                                $('.likevery').find('.selectbtn').attr('src','../../img/monthmatron/cyanright.png');
                              }
                              else if($(this).is('.likevery')){
                                change=1;
                                $(this).find('.selectbtn').attr('src','../../img/monthmatron/grayright.png');
                                $('.notlike').find('.selectbtn').attr('src','../../img/monthmatron/cyanright.png');
                              }
                            })
                            $('.evaluatecontant').focus(function(){
                                $("body").offset({top:-200,left:0});
                            })
                             $('.evaluatecontant').blur(function(){
                                $("body").offset({top:0,left:0});
                            })
                            $('.evaluatebtn').on('touchend',function(){
                              // alert(JSON.stringify({
                              //         'REMARK':$('.evaluatecontant').val(),//评论
                              //         'ORDEREVALUATION':change,//0不满意，1满意
                              //         'ORDERCODE':msg.pd.ORDERCODE// 订单号
                              //       }))
                              // return
                              // window.scrollTop=1000
                              //评价的提交接口开始
                              $.ajax({
                                    url:'/appuser/OrderList/Orderevaluation',
                                    type:'post',
                                    data:{
                                      'REMARK':$('.evaluatecontant').val(),//评论
                                      'ORDEREVALUATION':change,//0不满意，1满意
                                      'ORDERCODE':msg.pd.ORDERCODE// 订单号
                                    },
                                    success:function(data){
                                      // alert(JSON.stringify(data));
                                      window.history.go(-1);
                                    }
                                })//评价的提交接口结束
                            })
                          }//succ
                    })
                }
        })
    //ajax请求结束
})