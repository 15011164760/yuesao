function backpre(){
  // alert('backpre触发啦');
}
   var endTime=0;
   var nowTime=new Date();
   var ORDERCODE='';
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
            headers: {'hx_token':JianKang.TOKEN_ID},
            //JianKang.TOKEN_ID
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
    //       backpre();
    //   }); 
    $('.backup').on('touchend',function(){
           if (/android/.test(ua)) {
            window.jsi.goBack();
            // alert('安卓端');
            }else if (/iphone|ipad|ipod/.test(ua)) {
                goBack();
                // alert('苹果端');
            }  
      });
      //
	//ajax请求开始
    $.ajax({
               type: 'GET',
               headers: {'hx_token':JianKang.TOKEN_ID},
               // url:'/appuser/Shop/GetMyShoppingOrderList',
               url:'/appuser/Matron/GetApplyMatronByID?APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID'),
               // dataType:'json',
               // data: APPLYMATRONLIST_ID,//要发送的数据（参数）
               success:function(msg){
                     ORDERCODE=msg.pd.ORDERCODE;
                     // alert(ORDERCODE);
                      $('.ordercode').text(msg.pd.ORDERCODE);
                      $('#servicetype').text(msg.pd.SERVICETYPE);
                      $('.nowtopayallbtn').on('touchend',function(){
                          if(msg.pd.SERVICETYPE==4){
                           location.href='../conment/payMethod.html?ORDERCODE=' + msg.pd.ORDERCODE +'&ordertype=kainaishi&APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID');
                          }
                      })
                      // alert(msg.pd.ADDTIME);
                      //点击取消订单的时候向后台传递状态码和订单码
                      $('.cancelorderlist').on('touchend',function(){
                        		var userorderlist={
                        			"ORDERCODE":msg.pd.ORDERCODE,
                        			"STATE":9
                          		  }
                      		//ajax请求开始
            						    $.ajax({
            						               type: 'POST',
            						               headers: {'hx_token':JianKang.TOKEN_ID},
            						               // url:'/appuser/Shop/GetMyShoppingOrderList',
            						               url:'/appuser/OrderList/cancelOrder?APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID'),
            						               // dataType:'json',
            						               data: userorderlist,//要发送的数据（参数）
            						               success:function(data){
            						                  // console.log(data);
            						                  // alert(data.message);
            						                  location.href="cancel.html?APPLYMATRONLIST_ID="+GetQueryString('APPLYMATRONLIST_ID');
            						                }
            						        })
            						    //ajax请求结束
                        })
                     //超时取消时间
                     endTime=new Date(msg.pd.ADDTIME.replace(/-/g,'/')).getTime()+900000;
                     // endTime=new Date('20:51:07'.replace(/-/g,'/')).getTime()+900000;
                     // alert(new Date());
                      if (parseInt((endTime-nowTime.getTime())/1000)<0) {
                         // alert('msg.pd.ADDTIME');
                         //  alert('有'+ORDERCODE);
                          getTime1($('.remainingtime'), 0);
                      }else{

                          getTime1($('.remainingtime'), endTime);
                      }
                      // $('.remainingtime').html('<span>剩余</span><span>'+min+'</span><span>分</span><span>'+sec+'</span><span>秒</span>');
                      // setTimeout(yanshi,15*60*1001);
				        // function yanshi(){
				       	//    var userorderlist={
            //       			"ORDERCODE":msg.pd.ORDERCODE,
            //       			"STATE":8
            //       		  }
            //       		  // alert(JSON.parse(userorderlist));
            //       		  console.log(userorderlist);
            //       		//ajax请求开始
      						//     $.ajax({
      						//                type: 'POST',
      						//                headers: {'hx_token':JianKang.TOKEN_ID},
      						//                // url:'/appuser/Shop/GetMyShoppingOrderList',
      						//                url:'/appuser/OrderList/cancelOrder?APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID'),
      						//                // dataType:'json',
      						//                data: userorderlist,//要发送的数据（参数）
      						//                success:function(data){
      						//                   console.log(data);
      						//                   location.href="cancelbyus.html?APPLYMATRONLIST_ID="+GetQueryString('APPLYMATRONLIST_ID');
      						//                 }
      						//         })
      						//     //ajax请求结束
				        //  }
				         //超时函数结束
                }
        })
    //ajax请求结束
      function getTime1(btn, x) {
        // alert('func');
        var d = x;
        if (d==0) {
          // alert('cao');
          // alert(ORDERCODE);
          // <span>剩余</span><span>'+m+'</span><span>分</span><span>'+s+'</span><span>秒</span>
            btn.html("<span>剩余</span><span>00</span><span>分</span><span>00</span><span>秒</span>");
            // btn.html("11111111111111111");
                
            $.ajax({
                url:'/appuser/OrderList/cancelOrder.do?ORDERCODE='+ORDERCODE+'&STATE=8',
                success:function(datas){
                  // alert(datas.message);
                    new TipBox({type:'tip',iconStr:'取消订单',colorType:'month',str:"<p class='thirtySix'><span>由于您在规定时间内未支付,所以已自动取消订单!</span></p>",Ok:'确定',hasBtn:true,callBack:function(){  
                              location.href='cancel.html?APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID');
                        }
                  });
                }
            })
        }else{
            var interval = setInterval(function() {
                d--;
                // var m = Math.floor(d/60);
                // var s = d-Math.floor(d/60)*60;
               // alert(x);
               var m = new Date(x - new Date().getTime()).getMinutes();
                var s = new Date(x - new Date().getTime()).getSeconds();
                // alert(m);
                m = m < 10 ? "0" + m : m;
                s = s < 10 ? "0" + s : s;
                console.log(m,s);
                btn.html('<span>剩余</span><span>'+m+'</span><span>分</span><span>'+s+'</span><span>秒</span>')
                 if (new Date().getTime()>x) {
                    clearInterval(interval);
                    $.ajax({
                        url:'/appuser/OrderList/cancelOrder.do?ORDERCODE='+msg.pd.ORDERCODE+'&STATE=8',
                        success:function(){
                            new TipBox({type:'tip',iconStr:'取消订单',colorType:'month',str:"<p class='thirtySix'><span>由于您在规定时间内未支付,所以已自动取消订单!</span></p>",Ok:'确定',hasBtn:true,callBack:function(){  
                                if (/android/.test(ua)) {
                        window.jsi.goToOrderPage();
                        window.jsi.goBack();
                    }else if (/iphone|ipad|ipod/.test(ua)) {
                        goToOrderPage();
                        goBack();
                    }
                            }});
                        }
                    })
                    return;
                }
            }, 1000);
        }
    }
})
