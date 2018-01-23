function backpre(){
  // alert('backpre触发啦');
}
function goToOrderPage(){
  // alert('backpre触发啦');
}
function goBack(){
  // alert('backpre触发啦');
}
$(function(){
     var ua = navigator.userAgent.toLowerCase();
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
    if(ua.match(/MicroMessenger/i)=="micromessenger") {
           $('.backup img').hide();
        }
    $('.backup').on('touchend',function(){
           if (/android/.test(ua)) {
            window.jsi.goToOrderPage();
            // alert('安卓端');
            }else if (/iphone|ipad|ipod/.test(ua)) {
                // goToOrderPage();
                goBack();
                // alert('苹果端');
            }  
      });
  //获得订单的接口ajax
   $.ajax({
           type: 'GET',
           headers: {'hx_token': JianKang.TOKEN_ID},
           // url:'/appuser/Shop/GetMyShoppingOrderList',
           url:'/appuser/Matron/GetApplyMatronByID?APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID'),
           // dataType:'json',
           success:function(msg){
                $('.ordercode').text(msg.pd.ORDERCODE);
                console.log(msg);
                 //跳转到订单详情需要孕妇键值
              $('.detailsbtn span').eq(1).on('touchend',function(){
                 location.href='orderdetails.html?APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID')+'&'+'ESCORTS_ID='+GetQueryString('ESCORTS_ID');

              })
             }
          })//获得订单的接口结束
})