function goBack(){
  // alert('backpre触发啦');
}
function goToOrderPage(){};
// alert(111);
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
            headers: {'hx_token':JianKang.TOKEN_ID},
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
    var ua = navigator.userAgent.toLowerCase();
   if(ua.match(/MicroMessenger/i)=="micromessenger") {
           $('.backup img').hide();
        }
    $('.backup').on('touchend',function(){
           if (/android/.test(ua)) {
                  window.jsi.goToOrderPage();
             // else{
                  // window.location.href="../conment/orderList.html";
             //    }
            // alert('安卓端');
            }else if (/iphone|ipad|ipod/.test(ua)) {
                // if(GetQueryString('haveorder')==1){
                    // goToOrderPage();
                    goBack();
            }  
      });
    // $('.backup').on('touchend',function(){
    //      // window.location.href="../conment/orderList.html";
    //       if (/android/.test(ua)) {
    //         window.jsi.goBack();
    //     }else if (/iphone|ipad|ipod/.test(ua)) {
    //         goBack();
    //     }
    //   });

    $('.shuaxin').on('touchend',function(){
    	window.location.reload();
    })
    //进入详情
    $('.detailsbtns').on('touchend',function(){
										location.href='orderdetails.html?APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID');
								})
    //信心补充 支付全款前
    $('.starttosearve').on('touchend',function(){
									location.href='starttoservice.html?APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID');
								})
    //获取缓存的键值
	//ajax请求开始 得到下单者键值
    $.ajax({
               type: 'GET',
               headers: {'hx_token':JianKang.TOKEN_ID},
               // url:'/appuser/Shop/GetMyShoppingOrderList',
               url:'/appuser/Matron/GetApplyMatronByID?APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID'),
               // dataType:'json',
               // data: APPLYMATRONLIST_ID,//要发送的数据（参数）
               success:function(msg){
                 // alert(JSON.stringify(msg));
                 $.ajax({
                         type: 'GET',
                         headers: {'hx_token':JianKang.TOKEN_ID},
                         url:'/appuser/Hospital/GetEscortInfoByEscortsId?ESCORTS_ID='+msg.pd.ESCORTS_ID,
                         success:function(data){
                           // alert(JSON.stringify(data));
                            $('.ordercode').text(msg.pd.ORDERCODE);
                            if(data.pd.IMGURL){
  		                        $('.yuesaoimg').attr('src','/uploadFiles/uploadImgs/'+data.pd.IMGURL);//月嫂图片
                            }
  		                      $('.yuesaoname').text(data.pd.ESCORTNAME);//月嫂姓名
  		                      	 $('.telall').html('<a href="tel:'+data.pd.PHONENUMBER+'" class="telnow"><img src="../../img/monthmatron/telyuesao.png" alt="" class="telyuesaoimg"></a>');
  							 //跳转到订单详情需要孕妇键值
  								
  								//
  							
  		                  }
  		            })
              }
        })
    //ajax请求结束
  
})