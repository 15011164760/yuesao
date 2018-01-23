function backpre(){
  // alert('backpre触发啦');
}function goToOrderPage(){
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
// //      }});
    }
    //判断是否登录结束
     var ua = navigator.userAgent.toLowerCase();
    $('.backup').on('touchend',function(){
           if (/android/.test(ua)) {
            window.jsi.goToOrderPage();
            }else if (/iphone|ipad|ipod/.test(ua)) {
                goBack();
            }  
      });
    if(ua.match(/MicroMessenger/i)=="micromessenger") {
           $('.backup img').hide();
        }
    $('.detailsbtn span').eq(1).on('touchend',function(){
                           location.href='orderdetails.html?APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID');
    })
	//投诉的效果
  $('.complaintimg').on('touchend',function(){ 
		$('.blockzhezhao,.alertcomplaint').show();
		$('.blockzhezhao').on('touchend',function(){
		     $('.blockzhezhao,.alertcomplaint').hide();
		});
    $('.alertcomplaintbtn').on('touchend',function(){
          $('.header-topfixout1').show();
		      $('.alertcomplaint').hide();
       });
       $('.closepageimg').on('touchend',function(){
           $('.header-topfixout1,.blockzhezhao').hide();
            window.location.reload();
       })
       // $('#submituserinfo2').on('touchend',function(){
       //     $('.header-topfixout1,.blockzhezhao').hide();
       //      window.location.reload();
       // })
      //  //投诉的原因
      // $('.toususelect').on('touchend',function(){
      //     $('.toususelect').removeClass("selectereasoncolor");
      //      var index=$(this).index('.toususelect');
      //      $(this).toggleClass("selectereasoncolor");
      //      if($(this).is('.selectereasoncolor')){
      //         textcontent=$('.tousureason').eq(index).text();
      //         // alert(textcontent);
      //      }
      //   })  //投诉的原因
	})
  //投诉的内容
   $.ajax({
               type: 'GET',
               // async:false,
               headers: {'hx_token':JianKang.TOKEN_ID},
               url:'/appuser/Complain/GetComplainLevelList',
               success:function(data){
                     var COMPLAINCONTENTstr='';
                    // alert(JSON.stringify(data));
                     if (data.result=='hx-001') {
                        $('.tousuout').html('');
                        for (var i = 0; i < data.pd.length; i++) {
                           COMPLAINCONTENTstr+='<li>';
                           COMPLAINCONTENTstr+=' <span class="toususelect"></span>';
                           COMPLAINCONTENTstr+='<span class="tousureason" data-evel="'+data.pd[i].COMPLAINLEVEL+'">'+data.pd[i].COMPLAINCONTENT+'</span>';
                           COMPLAINCONTENTstr+='</li>';
                        }
                        $('.tousuout').append(COMPLAINCONTENTstr);
                    }
               }
            })
  ///
	//更换月嫂按钮
	// $('.replaceyuesao').on('touchend',function(){
 //          var textcontent='';
	// 	    $('.blockzhezhao,.header-topfixout2').show();
 //        //更换月嫂的原因
 //       $('.replaceselect').on('touchend',function(){
 //          $('.replaceselect').removeClass("selectereasoncolor");
 //           var index=$(this).index('.replaceselect');
 //           $(this).toggleClass("selectereasoncolor");
 //           if($(this).is('.selectereasoncolor')){
 //              textcontent=$('.replacereason').eq(index).text();
 //              alert(textcontent);
 //           }
 //        })  //更换月嫂的原因
 //    	 $('.closepageimg2,#submituserinfo4').on('touchend',function(){
 //               $('.header-topfixout2,.blockzhezhao').hide();
 //                window.location.reload();
 //        })
 //  })//更换月嫂按钮jieshu
  //退款开始
      var textcontentreason='';
  $('.refondmoneybtn').on('touchend',function(){
     $('.header-topfixout3,.blockzhezhao').show();
     // $('.closepage').on('touchend',function(){
     //     $('.header-topfixout3,.blockzhezhao').hide();
     //      window.location.reload();
     // });
     $('#thinkagain,.closepage').on('touchend',function(){
         $('.header-topfixout3,.blockzhezhao').hide();
            window.location.reload();
     });
                //退款原因
                  $('.selectereason').on('touchend',function(){
                      $('.selectereason').removeClass("selectereasoncolor");
                       var index=$(this).index('.selectereason');
                       $(this).toggleClass("selectereasoncolor");
                       if($(this).is('.selectereasoncolor')){
                          textcontentreason=$('.selectereasontext').eq(index).text();
                          // if(index==3){
                          //       textcontentreason=$('.selectereasontextinput').val();
                          //     }
                          //  else{
                                 textcontentreason=$('.selectereasontext').eq(index).text();
                           // }
                       }
                    }) //退款原因
  })
  //退款结束
  // alert('tousu');
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
                 // alert(JSON.stringify(msg));
                  $('.ordercode').text(msg.pd.ORDERCODE);
      		           $.ajax({
      		                   type: 'GET',
      		                   headers: {'hx_token':JianKang.TOKEN_ID},
      		                   url:'/appuser/Hospital/GetEscortInfoByEscortsId?ESCORTS_ID='+msg.pd.ESCORTS_ID,
      		                   success:function(data){
                              // alert(data.pd.PHONENUMBER);
                                if(data.pd.IMGURL){
      		                         $('.yuesaoimg').attr('src','/uploadFiles/uploadImgs/'+data.pd.IMGURL);//月嫂图片
                                }else{
                                  $('.yuesaoimg').attr('src','../../img/monthmatron/teacherimgbg.png')
                                }
      		                      $('.yuesaoname').text(data.pd.ESCORTNAME);
      		                      $('.telall').html('<a href="tel:'+data.pd.PHONENUMBER+'" class="telnow"><img src="../../img/monthmatron/telyuesao.png" alt="" class="telyuesaoimg"></a>');
                                  //投诉的原因
                                  var complaintreason='';
                                  var complaineveal='';
                                  $('.toususelect').on('touchend',function(){
                                      $('.toususelect').removeClass("selectereasoncolor");
                                       var index=$(this).index('.toususelect');
                                         $(this).toggleClass("selectereasoncolor");
                                         if($(this).is('.selectereasoncolor')){
                                            complaintreason=$('.tousureason').eq(index).text();
                                            complaineveal=$('.tousureason').eq(index).attr('data-evel');
                                            // alert(textcontent);
                                             // alert(JSON.stringify(Complaindata));
                                         }
                                })  //投诉的原因
                                $('#submituserinfo').on('touchend',function(){
                                    if(complaintreason==''){
                                      alert('请选择原因')
                                    }else{
                                           var datareson={
                                                          'ORDERCODE':msg.pd.ORDERCODE,// 订单号
                                                          'MEMBERS_ID':JianKang.MEMBERS_ID,//会员ID
                                                          'ESCORTS_ID':data.pd.ESCORTS_ID,//护工ID
                                                          'ORDERTYPE':50,//订单类型
                                                          'ISSOLVED':0,//是否已解决
                                                          'ADDTIME':formatDate(),//投诉时间
                                                          'COMPLAINCONTENT':complaintreason,//投诉内容
                                                          'COMPLAINLEVEL':complaineveal//投诉等级
                                                        }
           
                                                              // alert(JSON.stringify(datareson));
                                          //投诉的接口
                                                        $.ajax({
                                                              headers: {'hx_token': JianKang.TOKEN_ID},
                                                              url:'/appuser/Complain/AddComplain',
                                                              type: 'POST',
                                                              data:datareson,
                                                              success:function(data){
                                                              // alert(JSON.stringify(data));
                                                              window.location.reload();
                                                              }

                                                          })
                                                   //投诉的接口
                                    }
                                })
                                //
                                // / alert(111);
                                       //点击退款开始
                            $('#deciderefond').on('touchend',function(){
                                    var REFUNDDAYS=dayCount(aftergetnow(1), msg.pd.SERVICEENDTIME);//退款天数
                                    // alert(msg.pd.PAYMENTMETHOD);
                                    // alert(REFUNDDAYS);
                                    // return
                                    if(textcontentreason==''){
                                      alert('请写入原因');
                                    }
                                    else{
                                      //看有几天是节假日 2倍
                                    $.ajax({
                                    url:'http://www.easybots.cn/api/holiday.php?d='+getAll(aftergetnow(1), msg.pd.SERVICEENDTIME)+'&ak=k381.659a5150a2e8efcd53b75a423e263997@jkzdw.com',
                                    type:'GET',
                                    success:function(holiday){
                                      // alert(JSON.stringify(holiday));
                                        var jierinum=0;
                                        for(var p in JSON.parse(holiday)){//遍历json对象的每个key/value对,p为key
                                          if(JSON.parse(holiday)[p]==2){
                                            jierinum++;
                                          } 
                                        }
                                       var orderrestmoney=(data.pd.VALUE/26)*dayCount(aftergetnow(1), msg.pd.SERVICEENDTIME)+(data.pd.VALUE/26)*jierinum*1;
                                       var refondmoney=returnFloat(orderrestmoney);
                                       // return refondmoney;
                                       // alert('退款的金额'+refondmoney);
                                       // alert('没有节假日的价格'+(data.pd.VALUE/26)*dayCount(aftergetnow(1), msg.pd.SERVICEENDTIME));
                                       // alert('实际的总的价格'+(data.pd.VALUE/26)*dayCount(msg.pd.SERVICEBEGINTIME, msg.pd.SERVICEENDTIME));
                                       // alert('jierinum节日的天数：'+jierinum);
                                       // alert('总天数：'+dayCount(msg.pd.SERVICEBEGINTIME, msg.pd.SERVICEENDTIME));
                                       // alert('退款天数：'+dayCount(aftergetnow(1), msg.pd.SERVICEENDTIME));
                                       // alert('一个月价格'+data.pd.VALUE);
                                       // alert(JSON.stringify({
                                       //            'ORDERCODE':msg.pd.ORDERCODE,
                                       //            'REFUNDFEE':refondmoney,
                                       //            'REFUNDREASON':textcontentreason,
                                       //            'ISREFUND':0,
                                       //            "REFUNDDAYS":REFUNDDAYS,//天数
                                       //            'PAYMENTMETHOD':msg.pd.PAYMENTMETHOD//支付方式
                                       //          }));
                                          // return   
                                          $.ajax({
                                                type: 'POST',
                                                // headers: {'hx_token': JianKang.TOKEN_ID},
                                                data: JSON.stringify({
                                                  'ORDERCODE':msg.pd.ORDERCODE,
                                                  'REFUNDFEE':refondmoney,
                                                  'REFUNDREASON':textcontentreason,
                                                  'ISREFUND':0,
                                                  "REFUNDDAYS":REFUNDDAYS,//天数
                                                  'PAYMENTMETHOD':msg.pd.PAYMENTMETHOD//支付方式
                                                }),//要发送的数据（参数）
                                                contentType: "application/json.do" ,
                                                url:'/appuser/OrderList/applyRefundList',
                                                success:function(adddata){
                                                    // alert(JSON.stringify(adddata));
                                                    // alert(adddata.message);
                                                    location.href="refondapplication.html?APPLYMATRONLIST_ID="+GetQueryString('APPLYMATRONLIST_ID');
                                                }
                                         })
                                        }
                                     }) //看有几天是节假日 3倍
                                    }
                                })//点击退款给后台发送ajax
                                //
      		                  }
      		            })
                }//键值success
           })
    //ajax请求结束
})
    //格式化当前的年月日
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
     var currentdate2 = date.getFullYear() + seperator1 + month + seperator1 + strDate;
     console.log(currentdate2);
    return currentdate2;
}
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