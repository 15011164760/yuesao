function goToOrderPage(){
  // alert('backpre触发啦');
}function goBack(){
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
    var ua = navigator.userAgent.toLowerCase();
    // 返回
    if(ua.match(/MicroMessenger/i)=="micromessenger") {
           $('.backup img').hide();
        }
    $('.backup').on('touchend',function(){
           if (/android/.test(ua)) {
            window.jsi.goToOrderPage();
            // alert('安卓端');
            }else if (/iphone|ipad|ipod/.test(ua)) {
                goBack();
                // alert('苹果端');
            }   
      });
    //获取缓存的键值
    $.ajax({
               type: 'GET',
               headers: {'hx_token':JianKang.TOKEN_ID},
               url:'/appuser/Matron/GetApplyMatronByID?APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID'),
               success:function(msg){
                  $('.ordercode').text(msg.pd.ORDERCODE);
		           $.ajax({
		                   type: 'GET',
		                   headers: {'hx_token':JianKang.TOKEN_ID},
		                   url:'/appuser/Hospital/GetEscortInfoByEscortsId?ESCORTS_ID='+msg.pd.ESCORTS_ID,
		                   success:function(data){
		                   	   if(data.pd.IMGURL){
		                           $('.yuesaoimg').attr('src','/uploadFiles/uploadImgs/'+data.pd.IMGURL);//月嫂图片
		                   	   }
		                      $('.yuesaoname').text(data.pd.ESCORTNAME);//月嫂姓名
		                      $('.telall').html('<a href="tel:'+data.pd.PHONENUMBER+'" class="telnow"><img src="../../img/monthmatron/telyuesao.png" alt="" class="telyuesaoimg"></a>');							
		                      $('.detailsbtn span').eq(1).on('touchend',function(){
									location.href='orderdetails.html?APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID');
							   })
						   //退款的效果
							$('.complaintimg').on('touchend',function(){
											        var textcontent='';
												    $('.blockzhezhao,.header-topfixout').show();
												     $('.closepageimg').on('touchend',function(){
												         $('.header-topfixout,.blockzhezhao').hide();
												         window.location.reload();
												     })
												     $('#submituserinfo2').on('touchend',function(){
												         $('.header-topfixout,.blockzhezhao').hide();
												           window.location.reload();
												     })
													$('.selectereason').on('touchend',function(){
														$('.selectereason').removeClass("selectereasoncolor");
														 var index=$(this).index('.selectereason');
														 $(this).toggleClass("selectereasoncolor");
														 if($(this).is('.selectereasoncolor')){
			                                                   textcontent=$('.selectereasontext').eq(index).text();
														 }
													})
						               	           //点击退款开始
													$('#submituserinfo').on('touchend',function(){
														var REFUNDDAYS=dayCount(aftergetnow(1), msg.pd.SERVICEENDTIME);//退款天数
													    	if(textcontent==''){
													    		alert('请写入原因');
													    	}
													    	else{
														     //看有几天是节假日 2倍
															    	  $.ajax({
															    	  	    type: 'POST',
						                                                    data: JSON.stringify({
						                                                    	 'ORDERCODE':msg.pd.ORDERCODE,
								                                                  'REFUNDFEE':msg.pd.SECONDMONEY,
								                                                  'REFUNDREASON':textcontent,
								                                                  'ISREFUND':0,
								                                                   "REFUNDDAYS":msg.pd.SERVICECYCLE,//天数
								                                                   'PAYMENTMETHOD':msg.pd.PAYMENTMETHOD//支付方式
						                                                    }),//要发送的数据（参数）
						                                                    contentType: "application/json.do" ,
						                                                    url:'/appuser/OrderList/applyRefundList',
						                                                    success:function(adddata){
						                                                    		location.href="refondapplication.html?APPLYMATRONLIST_ID="+GetQueryString('APPLYMATRONLIST_ID');
						                                                    }
															    	  })
													    	}
													    })//点击退款给后台发送ajax

								})//退款的效果结束
		                  }//查询月嫂信息success
		            })//查询月嫂信息ajax结束
                }
        })
    //ajax请求结束
})
//天数 距离今日之后的几天
function  aftergetnow(day){//天数day
      var oldTime = (new Date()).getTime(); //得到毫秒数
      var newdata=oldTime+day*24*60*60*1000;//普通时间加上天数就是新的日期的毫秒数
      var mynewdataend=new Date(newdata);//转化成时间格式 在下面获取就可以
      var myyearend=mynewdataend.getFullYear();
      var mymonthend=mynewdataend.getMonth()+1;
      var mydateend=mynewdataend.getDate();
      var aftergetnowday=myyearend+'-'+mymonthend+'-'+mydateend;
      return aftergetnowday
   }