function backpre(){
  // alert('backpre触发啦');
}
function goBack(){
  // alert('goBack触发啦');
}
function goToOrderPage(){};
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
     var ua = navigator.userAgent.toLowerCase();
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
	// //投诉的效果
	// $('.complaintimg').on('touchend',function(){
	// 	$('.blockzhezhao,.alertcomplaint').show();
	// 	$('.blockzhezhao').on('touchend',function(){
	// 	     $('.blockzhezhao,.alertcomplaint').hide();
	// 	});
 //      $('.alertcomplaint').on('touchend',function(){
 //          $('.header-topfixout').show();
	// 	       $('.alertcomplaint').hide();
 //       });
 //       $('.closepageimg').on('touchend',function(){
 //           $('.header-topfixout,.blockzhezhao').hide();
 //           window.location.reload();
 //       })
 //       $('#submituserinfo2').on('touchend',function(){
 //           $('.header-topfixout,.blockzhezhao').hide();
 //           window.location.reload();
 //       })
 //      $('.selectereason').on('touchend',function(){
 //          $('.selectereason').removeClass("selectereasoncolor");
 //           var index=$(this).index('.selectereason');
 //           $(this).toggleClass("selectereasoncolor");
 //           if($(this).is('.selectereasoncolor')){
 //              textcontent=$('.selectereasontext').eq(index).text();
 //              alert(textcontent);
 //           }
 //       }) 
	// })//投诉的效果
      //ajax请求开始 得到下单者键值
    $.ajax({
               type: 'GET',
               headers: {'hx_token':JianKang.TOKEN_ID},
               // url:'/appuser/Shop/GetMyShoppingOrderList',
               url:'/appuser/Matron/GetApplyMatronByID?APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID'),
               // dataType:'json',
               // data: APPLYMATRONLIST_ID,//要发送的数据（参数）
               success:function(msg){
                  console.log(msg);
                  // console.log(msg.pd.ESCORTS_ID);
                  $('.ordercode').text(msg.pd.ORDERCODE);
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
                                }else{
                                  $('.yuesaoimg').attr('src','../../img/monthmatron/teacherimgbg.png')
                                }
                              // $('.yuesaoimg').attr('src','/uploadFiles/uploadImgs/'+data.pd.IMGURL);//月嫂图片
                                        // $('.yuesaoname').text(data.pd.ESCORTNAME);//月嫂姓名
                              $('.telall').html('<a href="tel:'+data.pd.PHONENUMBER+'" class="telnow"><img src="../../img/monthmatron/telyuesao.png" alt="" class="telyuesaoimg"></a>');
                             //跳转到订单详情需要孕妇键值
                            $('.detailsbtn span').eq(1).on('touchend',function(){
                               location.href='orderdetails.html?APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID');
                            })
                            $('.gototakebtn').on('touchend',function(){
                                location.href='evaluate.html?ESCORTS_ID='+msg.pd.ESCORTS_ID+'&APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID');
                             })
                            //加油开始
                            $('.comeOnMoney').on('touchend',function(){
                                    $('.comeOnMoneyWrap').show();
                                  })
                                 //弹窗关闭
                              $('.closeBtn').on('touchstart', function() {
                                  for (var i = 0; i < $('.comeOnMoneyPrice>img').length; i++) {
                                      $('.comeOnMoneyPrice>img').eq(i).attr('src','../../img/accompanyDoctor/comeOnMoney/h'+$('.comeOnMoneyPrice>img').eq(i).attr('data-money')+'.png');
                                  }
                                  $('.addSubMoney').html(5);
                                  money=0;
                                  $('.comeOnMoneyWrap').hide()
                              })
                              // 鼓励基金
                                  $('.comeOnMoneyPrice>img').on('touchend',function(){
                                      money=$(this).attr('data-money');
                                      for (var i = 0; i < $('.comeOnMoneyPrice>img').length; i++) {
                                          $('.comeOnMoneyPrice>img').eq(i).attr('src','../../img/accompanyDoctor/comeOnMoney/h'+$('.comeOnMoneyPrice>img').eq(i).attr('data-money')+'.png');
                                      }
                                      $(this).attr('src','../../img/accompanyDoctor/comeOnMoney/'+$(this).attr('data-money')+'k.png');
                                  })
                                  //自定义金额
                                  $('.customMoney').on('touchstart', function() {
                                      $('.comeOnMoneyWrap').hide();
                                      $('.customWrap').show();
                                      money=5;
                                  })
                                  $('#addBtn').on('touchend',function(){
                                      $('.addSubMoney').html(parseInt($('.addSubMoney').html())+5);
                                      money+=5;
                                  })
                                  $('#subBtn').on('touchend',function(){
                                      if (parseInt($('.addSubMoney').html())>5) {
                                          $('.addSubMoney').html(parseInt($('.addSubMoney').html())-5);
                                          money-=5;
                                      }
                                  })
                                  $('.closeBtn2').on('touchstart', function() {
                                      for (var i = 0; i < $('.comeOnMoneyPrice>img').length; i++) {
                                          $('.comeOnMoneyPrice>img').eq(i).attr('src','../../img/accompanyDoctor/comeOnMoney/h'+$('.comeOnMoneyPrice>img').eq(i).attr('data-money')+'.png');
                                      }
                                      $('.addSubMoney').html(5);
                                      money=0;
                                      $('.customWrap').hide();
                                  })
                                  //确定
                      $('.confirmBtn').on('touchend',function(){
                        // alert(11111111111111111);
                          var ORDERCODE=ordercode();
                          // alert(ORDERCODE);
                          // alert(msg.pd.ESCORTS_ID);
                          // alert(money);
                          if (money==0) {
                              $('.customWrap').hide();
                              $('.comeOnMoneyWrap').hide();
                          }else{
                            alert('ajax');
                              $.ajax({
                                  headers: {'hx_token': JianKang.TOKEN_ID},
                                  url:'/appuser/OrderList/addOrderEscortBonus',
                                  type:'POST',
                                  data:{
                                      'ORDERCODE': ORDERCODE,
                                      'ESCORTS_ID': msg.pd.ESCORTS_ID,
                                      'BONUS': money
                                  },
                                  success:function(data){
                                    alert(data.message);
                                      window.location.href='../conment/payMethod.html?ordertype=money&ORDERCODE='+ORDERCODE+'&REALMONEY='+money;
                                  }
                              })
                          }   
                      })
                      $('.confirmBtn2').on('touchend',function(){
                          var ORDERCODE=ordercode();
                          if (money==0) {
                              $('.customWrap').hide();
                              $('.comeOnMoneyWrap').hide();
                          }else{
                              $.ajax({
                                  headers: {'hx_token': JianKang.TOKEN_ID},
                                  url:'/appuser/OrderList/addOrderEscortBonus',
                                  type:'POST',
                                  data:{
                                      'ORDERCODE': ORDERCODE,
                                      'ESCORTS_ID': msg.pd.ESCORTS_ID,
                                      'BONUS': money
                                  },
                                  success:function(data){
                                      window.location.href='../conment/payMethod.html?ordertype=money&ORDERCODE='+ORDERCODE+'&REALMONEY='+money;
                                  }
                              })
                          }   
                      })
                            //加油结束
                            //
                          }
                    })
                }
        })
    //ajax请求结束//弹窗关闭
// 生成订单号
    function ordercode(){
        return 99+new Date().getTime().toString();
    }
})