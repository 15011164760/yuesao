function goBack(){
  // alert('backpre触发啦');
}
function goToOrderPage(){};
var ua = navigator.userAgent.toLowerCase();
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
    $('.backup').on('touchend',function(){
          if (/android/.test(ua)) {
            // window.jsi.goBack();
            window.jsi.goToOrderPage();
        }else if (/iphone|ipad|ipod/.test(ua)) {
            goBack();
            // goToOrderPage();
        };   
       });
    if(ua.match(/MicroMessenger/i)=="micromessenger") {
           $('.backup img').hide();
        }
    //点击跳转进入订单状态
    // $('.statusbtn').on('touchend',function(){
    //     location.href='orderstatus.html?APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID')+'&'+'ESCORTS_ID='+GetQueryString('ESCORTS_ID');
    // });
     //点击跳转进入订单详情
     //ajax请求开始 得到下单者键值
     // alert(GetQueryString('APPLYMATRONLIST_ID'));
    $.ajax({
               type: 'GET',
               headers: {'hx_token':JianKang.TOKEN_ID},
               // url:'/appuser/Shop/GetMyShoppingOrderList',
               url:'/appuser/Matron/GetApplyMatronByID?APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID'),
               // dataType:'json',
               // data: APPLYMATRONLIST_ID,//要发送的数据（参数）
               success:function(msg){
                    // alert(msg.pd.STATE);
                    $('.ordercode').text(msg.pd.ORDERCODE);
                   if(msg.pd.STATE==8){
                       // $('.cancelimg').attr('src','../../img/monthmatron/refondbyusimg.png');
                       $('.cancalstatus').text('支付超时取消');
                       $('.cancelreason').text('尊敬的客户您好，当前预约订单过多，暂无法为您服务。此次订单已取消，请您稍后再试。');
                    }
                    else if(msg.pd.STATE==9){
                      $('.cancalstatus').text('用户取消订单');
                       $('.cancelreason').text('尊敬的客户您好，您的订单已取消成功，欢迎您下次使用！');
                    }
                    else if(msg.pd.STATE==10){
                       $('.cancalstatus').text('经理取消订单');
                    }
                    $('.detailbtns').on('touchend',function(){
                           location.href='orderdetails.html?APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID');
                    })
                }
             })
     //ajax请求开始 得到下单者键值结束
})