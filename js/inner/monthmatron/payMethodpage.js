var DEPOSIT = '';//定金
var SECONDMONEY = '';//剩余二批款
var newORDERCODE;
var ORDERCODE;
// var CHID='';//查询支付状态用
var JianKang = JSON.parse(localStorage.getItem('JianKang') || '{}');
// var aaa=JSON.stringify({
//                          "PAYED_ESCORTS_ID":GetQueryString('PAYED_ESCORTS_ID'),
//                          "APPLYMATRONLIST_ID":GetQueryString('APPLYMATRONLIST_ID'),
//                          'ORDERCODE':GetQueryString('ORDERCODE'),
//                          'JianKang.TOKEN_ID':JianKang.TOKEN_ID
//                                     })
// $('html').append('<div style="height:6rem;width:100%">'+aaa+'</div>');
var openId = localStorage.getItem('openId');
var ua = navigator.userAgent.toLowerCase();
var payStyle = '';//支付方式
var walletOrderType='';//钱包支付订单类型
var isPay = false;//是否点击支付
  var timestamp=new Date().getTime(); 
  var randoms1=Math.floor(Math.random()*100);
  var randoms2=Math.floor(Math.random()*100);
  var randoms3=Math.floor(Math.random()*100);
  var falseordercode=99+timestamp+randoms1+randoms2+randoms3;
  var newfalseordercode;
function goBack(){}
function appPay(orderCode,money,payType,orderType,charge){};
 function boolsuccess(success){
           // alert(success);
            if (success==1) {
                  $('.blockzhezhao,.zhezhaocontain').show();//支付成功显示遮罩层
                  // $('.detailsbtn').hide();
                  yuesaofunc();
                // $('.blockzhezhao,.zhezhaocontain').show();//支付成功显示遮罩层
                          //发送ajax结束  点击支付推荐列表选择的面试费用接口
                    if(GetQueryString('payinterview')==1||GetQueryString('detailinterview')==1){
                        //  })//支付完成了面试的就要告诉后台 添加月嫂记录
                                       $('html').on('touchend',function(){
                                            location.href='../monthmatron/interview.html?APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID');
                                        })
                    }
                    else if(GetQueryString('payorder')==1){
                                        $('html').on('touchend',function(){
                                             location.href='../monthmatron/haveorder.html?APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID');
                                        })
                                        delectyuesao();//删除月嫂缓存
                    }//预定金成功告诉后台的
                    //支付全款成功
                    else if(GetQueryString('orderallmoney')==1){
                          // $.ajax({
                          //      type: 'POST',
                          //      headers: {'hx_token': JianKang.TOKEN_ID},
                          //      data: {'SECONDMONEY':SECONDMONEY},//要发送的数据（参数）
                          //      url:'/appuser/Matron/updateApplyMatron?APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID'),
                          //      success:function(data){
                                   $('html').on('touchend',function(){
                                           location.href='../monthmatron/waittoservice.html?APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID');
                                    })
                            //     }
                            // })
                    }//支付全款成功
                    else if(GetQueryString('ordertype')=='wallet'){
                        walletfunc();
                    }
            }//支付成功
            else if(success==2){
                $('.zhezhaocontain2,.blockzhezhao2').show();
                        $('html').on('touchend',function(){
                          // alert('支付失败1');
                            if(GetQueryString('ordertype')=='wallet'){
                                      window.location.href='../MyPage/wallet.html'; 
                              }
                            else{
                                 window.history.go(-1);
                            }
                        })
              // goBack();
              // window.jsi.goBack();
            }//支付失败
            else if(success==3){
              // goBack();
              // window.jsi.goBack();
               if (/android/.test(ua)) {
                                      window.jsi.goToOrderPage();
                         }else if (/iphone|ipad|ipod/.test(ua)) {
                                      goBack();
                            }
            }
    //     }//app返回success
    // })//ajax结束 
}

                     
function goBack2(){}
$(function() {
    // var REALMONEY = 0;
    $('.blockzhezhao,.zhezhaocontain').hide();
    $('.blockzhezhao2,.zhezhaocontain2').hide();
    var ua = navigator.userAgent.toLowerCase();  
    // 返回
        $('#goBack').on('touchstart',function(){
            if (/android/.test(ua)) {
                 window.jsi.goToOrderPage();//goToOrderpage是返回到订单列表页面
               }else if (/iphone|ipad|ipod/.test(ua)) {
                 goBack();//gotoorderpage是固定的跳到订单列表页
               }
        })
    //支付方式  公众号中
        if(ua.match(/MicroMessenger/i)=="micromessenger") {
            $('.zhifubao').hide();
            $('.lakala').hide();
            $('.wallet').hide();
            $('#header').hide();
        }
        $('.orderP2').hide();//没有倒计时不出现
         if(GetQueryString('ordertype')=="wallet") {
            $('.wallet').hide();
        }
    /**
     * 获取订单号等。。
     */

    if(GetQueryString('payinterview')==1||GetQueryString('detailinterview')==1||GetQueryString('payorder')==1){
      walletOrderType=99;
       ORDERCODE = falseordercode;
    }
    else if(GetQueryString('orderallmoney')){
       walletOrderType=50;
       ORDERCODE=GetQueryString('ORDERCODE')
    }
    else if (GetQueryString('ordertype')=='wallet') {
        walletOrderType='mc';
        ORDERCODE = GetQueryString('ORDERCODE');
        REALMONEY = GetQueryString('money');
        $('.ordermoney').text('￥'+GetQueryString('money'));
    }
    var REALMONEY = returnFloat(GetQueryString('REALMONEY')/100);
        DEPOSIT=REALMONEY;//定金
        SECONDMONEY=REALMONEY;//剩余二批款
    $('.payMoney').text(returnFloat(REALMONEY));
        REALMONEY=0.01;
   $('#walletOrderMoney').text(returnFloat(parseFloat(REALMONEY*100)/100)+'元');
    $('.orderName').text(ORDERCODE);
    var COM = '';
    var flag=1;
    //点击微信支付按钮
    $('.weixin').on('touchend', function() {
        if (isPay) {
            return;
        }
        isPay = true;
        payStyle='微信';
         $('.paymethod').text('微信');
        if (ua.match(/MicroMessenger/i)=="micromessenger") {
          if(GetQueryString('orderallmoney')==1){
            // if(flag){
              $.ajax({
                  url:'/appuser/lakalaPay/AppCharge',
                  type:'POST',
                  data:{
                      'REALMONEY':REALMONEY,
                      'ORDERCODE':ORDERCODE,
                      'WXOPEN_ID':openId,
                      'CHANNEL':'wechat_wap'
                  },
                  success:function(data){
                      var payData=JSON.parse(data.charge.credential.wechat_wap.jsApiParams);
                      ORDERCODE=data.ORDERCODE;
                      newORDERCODE=data.ORDERCODE;
                      // CHID=data.CHID;
                      $('.orderName').html(ORDERCODE);
                      // var data = JSON.stringify({
                      //    "ORDERCODE": newORDERCODE,
                      //    "REALMONEY": REALMONEY
                      // })
                             //去支付接口返回是下面几个数
                        function onBridgeReady() {
                            WeixinJSBridge.invoke(
                                'getBrandWCPayRequest', {
                                    "appId": payData.appId, //公众号名称，由商户传入     
                                    "timeStamp": payData.timeStamp, //时间戳，自1970年以来的秒数     
                                    "nonceStr": payData.nonceStr, //随机串     
                                    "package": payData.package,
                                    "signType": "MD5", //微信签名方式：     
                                    "paySign": payData.paySign //微信签名 
                                },
                                function(res) {
                                            isPay=false;
                                            if (res.err_msg == "get_brand_wcpay_request:ok") {
                                                location.href='../monthmatron/waittoservice.html?APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID');
                                            }else{
                                                // window.history.go(-1);
                                                 window.location.href='../conment/orderList.html';
                                            }
                                }//res结束
                            );
                        }
                        if (typeof WeixinJSBridge == "undefined") {
                            isPay=false;
                            if (document.addEventListener) {
                                document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                            } else if (document.attachEvent) {
                                document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                                document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                            }
                        } else {
                            isPay=false;
                            onBridgeReady();
                        }
                        flag=0;
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        isPay=false;
                        new TipBox({type:'error',iconStr:'系统错误',colorType:'hospital',str:"<p class='thirtySix'><span>抱歉,由于系统原因出错了,请重新尝试操作</span></p>",Ok:'确定',hasBtn:true});
                    }
                      // })//微信接口ajax结束
                  // }//换订单号success       
              })//换订单结束ajax
            // }//flag=1执行ajax
          }//判断是不是最后支付剩余的费用
          else if(GetQueryString('payinterview')==1||GetQueryString('detailinterview')==1){
                         newfalseordercode='MS'+99+timestamp+randoms1+randoms2+randoms3;
                          newORDERCODE=newfalseordercode;
                       $('.orderName').html(newORDERCODE);
                          var datas={
                                     "PAYED_ESCORTS_ID":GetQueryString('PAYED_ESCORTS_ID'),
                                     "APPLYMATRONLIST_ID":GetQueryString('APPLYMATRONLIST_ID'),
                                     "ORDERCODE":GetQueryString('ORDERCODE'),
                                     "PAYSUCCESS":'0',//支付状态
                                     "INTERVIEWFEE":'30', //面试费用
                                     "OUT_TRADE_NO":newfalseordercode//订单号 MS11111111.
                                    }
                            // 添加月嫂记录
                         $.ajax({
                              type: 'POST',
                              headers: {'hx_token': JianKang.TOKEN_ID},
                              url:'/appuser/Matron/payMatronForInterview',//面试接口
                              data: datas,//要发送的数据（参数）
                              success:function(finishpay){
                                        $.ajax({
                                            url:'/appuser/lakalaPay/AppCharge',
                                            type:'POST',
                                            data:{
                                                'REALMONEY':REALMONEY,
                                                'ORDERCODE':newORDERCODE,
                                                'WXOPEN_ID':openId,
                                                'CHANNEL':'wechat_wap'
                                            },
                                            success:function(data){
                                              var payData=JSON.parse(data.charge.credential.wechat_wap.jsApiParams);
                                                   // alert(payData);
                                                   //去支付接口返回是下面几个数
                                              function onBridgeReady() {
                                                  WeixinJSBridge.invoke(
                                                      'getBrandWCPayRequest', {
                                                          "appId": payData.appId, //公众号名称，由商户传入     
                                                          "timeStamp": payData.timeStamp, //时间戳，自1970年以来的秒数     
                                                          "nonceStr": payData.nonceStr, //随机串     
                                                          "package": payData.package,
                                                          "signType": "MD5", //微信签名方式：     
                                                          "paySign": payData.paySign //微信签名 
                                                      },
                                                      function(res) {
                                                                      isPay=false;
                                                                      if (res.err_msg == "get_brand_wcpay_request:ok") {
                                                                                $('.blockzhezhao,.zhezhaocontain').show();//支付成功显示遮罩层
                                                                                yuesaofunc();
                                                                                if(GetQueryString('payinterview')==1||GetQueryString('detailinterview')==1){
                                                                                                   $('html').on('touchend',function(){
                                                                                                        location.href='../monthmatron/interview.html?APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID');
                                                                                                    })
                                                                                }
                                                                      } // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                                                                     else{//支付失败
                                                                           $('.zhezhaocontain2,.blockzhezhao2').show();
                                                                           $('.detailsbtn').hide();
                                                                           $('html').on('touchend',function(){
                                                                                 window.location.href='../conment/orderList.html';
                                                                                   })
                                                                          }
                                                                      // flag=0;
                                                      }//res里面的结束
                                                  );
                                              }
                                              if (typeof WeixinJSBridge == "undefined") {
                                                 isPay=false;
                                                  if (document.addEventListener) {
                                                      document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                                                  } else if (document.attachEvent) {
                                                      document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                                                      document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                                                  }
                                              } else {
                                                  isPay=false;
                                                  onBridgeReady();
                                              }
                                        },
                                        error: function(XMLHttpRequest, textStatus, errorThrown) {
                                             isPay=false;
                                            new TipBox({type:'error',iconStr:'系统错误',colorType:'hospital',str:"<p class='thirtySix'><span>抱歉,由于系统原因出错了,请重新尝试操作</span></p>",Ok:'确定',hasBtn:true});
                                        }
                                    })//微信接口ajax结束
                              }
                          })//先添加月嫂记录 支付成功在回调的时候存这个月嫂  面试接口结束
                      // }//flag=1
                    //微信接口结束
          }//判断是面试费和预定费
          else if(GetQueryString('payorder')==1){
                      var TRANSACTION_ID ='DJ'+99+timestamp+randoms1+randoms2+randoms3;
                        //预定金要发送数据
                      var orderdata={
                          "ESCORTS_ID":GetQueryString('ESCORTS_ID'),
                          "APPLYMATRONLIST_ID":GetQueryString('APPLYMATRONLIST_ID'),
                          "DEPOSIT":'',//预定金
                          'TRANSACTION_ID':TRANSACTION_ID
                        }
                        // //预定金支付接口
                          $.ajax({
                           type: 'POST',
                           headers: {'hx_token': JianKang.TOKEN_ID},
                           data: orderdata,//要发送的数据（参数）
                           url:'/appuser/Matron/PayDepositOfMatron?APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID'),
                           success:function(adddata){
                                          $.ajax({
                                            url:'/appuser/lakalaPay/AppCharge',
                                            type:'POST',
                                            data:{
                                                'REALMONEY':REALMONEY,
                                                'ORDERCODE':TRANSACTION_ID,
                                                'WXOPEN_ID':openId,
                                                'CHANNEL':'wechat_wap'
                                            },
                                            success:function(data){
                                              var payData=JSON.parse(data.charge.credential.wechat_wap.jsApiParams);
                                                   // alert(payData);
                                                   //去支付接口返回是下面几个数
                                              function onBridgeReady() {
                                                  WeixinJSBridge.invoke(
                                                      'getBrandWCPayRequest', {
                                                          "appId": payData.appId, //公众号名称，由商户传入     
                                                          "timeStamp": payData.timeStamp, //时间戳，自1970年以来的秒数     
                                                          "nonceStr": payData.nonceStr, //随机串     
                                                          "package": payData.package,
                                                          "signType": "MD5", //微信签名方式：     
                                                          "paySign": payData.paySign //微信签名 
                                                      },
                                                      function(res) {
                                                                      isPay=false;
                                                                      if (res.err_msg == "get_brand_wcpay_request:ok") {
                                                                                $('.blockzhezhao,.zhezhaocontain').show();//支付成功显示遮罩层
                                                                                yuesaofunc();
                                                                                if(GetQueryString('payorder')==1){
                                                                                      $('html').on('touchend',function(){
                                                                                             location.href='../monthmatron/haveorder.html?APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID');
                                                                                        })
                                                                                        delectyuesao();//删除月嫂缓存
                                                                                }
                                                                      } // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                                                                     else{//支付失败
                                                                           $('.zhezhaocontain2,.blockzhezhao2').show();
                                                                           $('.detailsbtn').hide();
                                                                           $('html').on('touchend',function(){
                                                                                 window.location.href='../conment/orderList.html';
                                                                                   })
                                                                          }
                                                                      // flag=0;
                                                      }//res里面的结束
                                                  );
                                              }
                                              if (typeof WeixinJSBridge == "undefined") {
                                                 isPay=false;
                                                  if (document.addEventListener) {
                                                      document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                                                  } else if (document.attachEvent) {
                                                      document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                                                      document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                                                  }
                                              } else {
                                                  isPay=false;
                                                  onBridgeReady();
                                              }
                                        },
                                        error: function(XMLHttpRequest, textStatus, errorThrown) {
                                             isPay=false;
                                            new TipBox({type:'error',iconStr:'系统错误',colorType:'hospital',str:"<p class='thirtySix'><span>抱歉,由于系统原因出错了,请重新尝试操作</span></p>",Ok:'确定',hasBtn:true});
                                        }
                                    })//微信接口ajax结束
                             }
                          })////预定金支付接口结束
          }
        }//微信设备结束
        else{
             if(GetQueryString('orderallmoney')==1){
                  $.ajax({
                      url:'/appuser/lakalaPay/AppCharge',
                      type:'POST',
                      data:{
                          'REALMONEY':REALMONEY,
                          'ORDERCODE':ORDERCODE,
                          'CHANNEL':'wechat_app'
                      },
                      success:function(data){
                          // alert(JSON.stringify(data))
                          ORDERCODE=data.ORDERCODE;
                          newORDERCODE=data.ORDERCODE;
                          $('.orderName').html(newORDERCODE);
                          if (/android/.test(ua)) {
                              window.jsi.appPay(JSON.stringify(data.charge),REALMONEY,'weixin','jiazheng');
                          }else if (/iphone|ipad|ipod/.test(ua)) {
                              appPay(newORDERCODE,REALMONEY,'weixin','jiazheng',data.charge);
                          }
                          isPay=false;
                      }
                  }) 
             } //最后一次支付 
             ///面试和预定
             else if(GetQueryString('payinterview')==1||GetQueryString('detailinterview')==1){
                  newfalseordercode='MS'+99+timestamp+randoms1+randoms2+randoms3;
                  var datas={
                                     "PAYED_ESCORTS_ID":GetQueryString('PAYED_ESCORTS_ID'),
                                     "APPLYMATRONLIST_ID":GetQueryString('APPLYMATRONLIST_ID'),
                                     "ORDERCODE":GetQueryString('ORDERCODE'),
                                     "PAYSUCCESS":'0',//支付状态
                                     "INTERVIEWFEE":'30', //面试费用
                                     "OUT_TRADE_NO":newfalseordercode//订单号 MS11111111.
                                    }
                            //支付完成了面试的就要告诉后台 添加月嫂记录
                          // alert(JSON.stringify(datas));
                         $.ajax({
                              type: 'POST',
                              // async:false,
                              headers: {'hx_token': JianKang.TOKEN_ID},
                              url:'/appuser/Matron/payMatronForInterview',
                              // dataType:'json',
                              data: datas,//要发送的数据（参数）
                              success:function(finishpay){
                                     $.ajax({
                                        url:'/appuser/lakalaPay/AppCharge',
                                        type:'POST',
                                        data:{
                                            'REALMONEY':REALMONEY,
                                            'ORDERCODE':newfalseordercode,
                                            'CHANNEL':'wechat_app'
                                        },
                                        success:function(data){
                                              isPay=false;
                                              // alert(newfalseordercode);
                                            $('.orderName').html(newfalseordercode);
                                            if (/android/.test(ua)) {
                                                window.jsi.appPay(JSON.stringify(data.charge),REALMONEY,'weixin','jiazheng');
                                            }else if (/iphone|ipad|ipod/.test(ua)) {
                                                appPay(newfalseordercode,REALMONEY,'weixin','jiazheng',data.charge);
                                            }
                                           
                                         }
                                    }) 
                              }
                          })//支付完成了面试的就要告诉后台 添加月嫂记录
                  
              } //面试和预定  
              else if(GetQueryString('payorder')==1){
                         var TRANSACTION_ID ='DJ'+99+timestamp+randoms1+randoms2+randoms3;
                        //预定金要发送数据
                            var orderdata={
                                "ESCORTS_ID":GetQueryString('ESCORTS_ID'),
                                "APPLYMATRONLIST_ID":GetQueryString('APPLYMATRONLIST_ID'),
                                "DEPOSIT":'',//预定金
                                'TRANSACTION_ID':TRANSACTION_ID
                              }
                             // $('html').append(JSON.stringify(orderdata));
                              // return
                        // //预定金支付接口
                          $.ajax({
                           type: 'POST',
                           headers: {'hx_token': JianKang.TOKEN_ID},
                           data: orderdata,//要发送的数据（参数）
                           url:'/appuser/Matron/PayDepositOfMatron?APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID'),
                           success:function(adddata){
                                        // $('html').on('touchend',function(){
                                        //      location.href='../monthmatron/haveorder.html?APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID');
                                        // })
                                        // delectyuesao();//删除月嫂缓存
                                  // if(flag){
                                // alert(JSON.stringify(adddata));
                                // alert("TRANSACTION_ID定金/appuser/Matron/PayDepositOfMatron："+TRANSACTION_ID);
                                   $.ajax({
                                      url:'/appuser/lakalaPay/AppCharge',
                                      type:'POST',
                                      data:{
                                          'REALMONEY':REALMONEY,
                                          'ORDERCODE':TRANSACTION_ID,
                                          'CHANNEL':'wechat_app'
                                      },
                                      success:function(data){
                                           delectyuesao();
                                            // alert('支付完返回的订单号'+JSON.stringify(data));
                                            // alert('支付完新的订单号:'+JSON.stringify(data.orderNo));
                                            // alert()
                                            // alert('TRANSACTION_ID支付接口'+TRANSACTION_ID);
                                          $('.orderName').html(TRANSACTION_ID);
                                          if (/android/.test(ua)) {
                                              // alert('安卓端');
                                            // alert('anzhuo'+newORDERCODE+'====='+REALMONEY);
                                              window.jsi.appPay(JSON.stringify(data.charge),REALMONEY,'weixin','jiazheng');
                                          }else if (/iphone|ipad|ipod/.test(ua)) {
                                               // alert('苹果端');
                                              appPay(TRANSACTION_ID,REALMONEY,'weixin','jiazheng',data.charge);
                                          }
                                            isPay=false;
                                       }
                                    }) 
                             // }//flag=1
                             }
                          })////预定金支付接口结束
              }//预定  
            // } // zhifuhanshu函数结束
        } //app中的微信支付 
    })
  //支付宝点击开始支付
    $('.zhifubao').on('touchend', function() {
       if (isPay) {
            return;
        }
        isPay = true;
        payStyle='支付宝';
        $('.paymethod').text('支付宝');
             if(GetQueryString('orderallmoney')==1){
                if(flag){
                    $.ajax({
                        url:'/appuser/lakalaPay/AppCharge',
                        type:'POST',
                        data:{
                            'REALMONEY':REALMONEY,
                            'ORDERCODE':ORDERCODE,
                            'CHANNEL':'alipay_app'
                        },
                        success:function(data){
                            // console.log(JSON.stringify(data.charge))
                            ORDERCODE=data.ORDERCODE;
                            newORDERCODE=data.ORDERCODE;
                            $('.orderName').html(newORDERCODE);
                            if (/android/.test(ua)) {
                                window.jsi.appPay(JSON.stringify(data.charge),REALMONEY,'zhifubao','jiazheng');
                                // alert('安卓端');
                            }else if (/iphone|ipad|ipod/.test(ua)) {
                                appPay(newORDERCODE,REALMONEY,'zhifubao','jiazheng',data.charge);
                                // alert('苹果端');
                            }
                            isPay=false;
                        }
                    }) 
                  
                }
             } //最后一次支付 
             ///面试和预定
             else if(GetQueryString('payinterview')==1||GetQueryString('detailinterview')==1){
                         newfalseordercode='MS'+99+timestamp+randoms1+randoms2+randoms3;
                          var datas={
                                     "PAYED_ESCORTS_ID":GetQueryString('PAYED_ESCORTS_ID'),
                                     "APPLYMATRONLIST_ID":GetQueryString('APPLYMATRONLIST_ID'),
                                     "ORDERCODE":GetQueryString('ORDERCODE'),
                                     "PAYSUCCESS":'0',//支付状态
                                     "INTERVIEWFEE":'30', //面试费用
                                     "OUT_TRADE_NO":newfalseordercode//订单号 MS11111111.
                                    }
                            //支付完成了面试的就要告诉后台 添加月嫂记录
                          // alert(JSON.stringify(datas));
                         $.ajax({
                              type: 'POST',
                              // async:false,
                              headers: {'hx_token': JianKang.TOKEN_ID},
                              url:'/appuser/Matron/payMatronForInterview',
                              // dataType:'json',
                              data: datas,//要发送的数据（参数）
                              success:function(finishpay){
                                // alert('面试费用的接口：'+JSON.stringify(finishpay));
                                // $('.orderName').html(falseordercode);
                             // alert('回掉后falseordercode值'+falseordercode);
                             // if(flag){
                                     $.ajax({
                                        url:'/appuser/lakalaPay/AppCharge',
                                        type:'POST',
                                        data:{
                                            'REALMONEY':REALMONEY,
                                            'ORDERCODE':newfalseordercode,
                                            'CHANNEL':'alipay_app'
                                        },
                                        success:function(data){
                                              isPay=false;
                                              // alert(newfalseordercode);
                                            $('.orderName').html(newfalseordercode);
                                            if (/android/.test(ua)) {
                                                window.jsi.appPay(JSON.stringify(data.charge),REALMONEY,'zhifubao','jiazheng');
                                            }else if (/iphone|ipad|ipod/.test(ua)) {
                                                appPay(newfalseordercode,REALMONEY,'zhifubao','jiazheng',data.charge);
                                            }
                                           
                                         }
                                    }) 
                              }
                          })//支付完成了面试的就要告诉后台 添加月嫂记录
              } //面试和预定
            else if(GetQueryString('payorder')==1){
                         var TRANSACTION_ID ='DJ'+99+timestamp+randoms1+randoms2+randoms3;
                        //预定金要发送数据
                            var orderdata={
                                "ESCORTS_ID":GetQueryString('ESCORTS_ID'),
                                "APPLYMATRONLIST_ID":GetQueryString('APPLYMATRONLIST_ID'),
                                "DEPOSIT":'',//预定金
                                'TRANSACTION_ID':TRANSACTION_ID
                              }
                              // alert(JSON.stringify(orderdata));
                              // return
                        // //预定金支付接口
                          $.ajax({
                           type: 'POST',
                           headers: {'hx_token': JianKang.TOKEN_ID},
                           data: orderdata,//要发送的数据（参数）
                           url:'/appuser/Matron/PayDepositOfMatron?APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID'),
                           success:function(adddata){
                                        // alert('/appuser/Matron/PayDepositOfMatron给后台定金的接口'+adddata);
                                        // $('html').on('touchend',function(){
                                        //      location.href='../monthmatron/haveorder.html?APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID');
                                        // })
                                        // delectyuesao();//删除月嫂缓存
                                  // if(flag){
                                   $.ajax({
                                      url:'/appuser/lakalaPay/AppCharge',
                                      type:'POST',
                                      data:{
                                          'REALMONEY':REALMONEY,
                                          'ORDERCODE':TRANSACTION_ID,
                                          'CHANNEL':'alipay_app'
                                      },
                                      success:function(data){
                                           delectyuesao();
                                            // alert('/appuser/lakalaPay/AppCharge接口回调'+JSON.stringify(data));
                                            // alert('/appuser/lakalaPay/AppCharge接口完事之后预定金订单号：'+TRANSACTION_ID);
                                          $('.orderName').html(TRANSACTION_ID);
                                          if (/android/.test(ua)) {
                                              // alert('安卓端');
                                            // alert('anzhuo'+newORDERCODE+'====='+REALMONEY);
                                              window.jsi.appPay(JSON.stringify(data.charge),REALMONEY,'zhifubao','jiazheng');
                                          }else if (/iphone|ipad|ipod/.test(ua)) {
                                               // alert('苹果端');
                                              appPay(TRANSACTION_ID,REALMONEY,'zhifubao','jiazheng',data.charge);
                                          }
                                            isPay=false;
                                         
                                       }
                                    }) 
                             // }//flag=1
                             }
                          })////预定金支付接口结束
              }//预定  
    })//支付宝点击结束支付
    //拉卡拉支付点击开始
     $('.lakala').on('touchend', function() {
             if (isPay) {
                return;
             }
             isPay = true;
             payStyle='拉卡拉';
             $('.paymethod').text('拉卡拉');
             //两种情况
             if(GetQueryString('orderallmoney')==1){
               if(flag){
                  $.ajax({
                      url:'/appuser/lakalaPay/AppCharge',
                      type:'POST',
                      data:{
                          'REALMONEY':REALMONEY,
                          'ORDERCODE':ORDERCODE,
                          'CHANNEL':'lakala_app'
                      },
                      // beforeSend:function(){
                      //   flag=0
                      // },
                      success:function(data){
                          console.log(JSON.stringify(data.charge))
                          ORDERCODE=data.ORDERCODE;
                          newORDERCODE=data.ORDERCODE;
                           // CHID=data.CHID;
                          // alert(newORDERCODE+'和'+REALMONEY+'data.charge'+data.charge);
                          $('.orderName').html(newORDERCODE);
                          if (/android/.test(ua)) {
                              window.jsi.appPay(JSON.stringify(data.charge),REALMONEY,'lakala','jiazheng');
                          }else if (/iphone|ipad|ipod/.test(ua)) {
                              appPay(newORDERCODE,REALMONEY,'lakala','jiazheng',data.charge);
                          }
                          isPay=false;
                      }
                  }) 
                }//flag=1
             } //最后一次支付 
             ///面试和预定
             else if(GetQueryString('payinterview')==1||GetQueryString('detailinterview')==1){
                      newfalseordercode='MS'+99+timestamp+randoms1+randoms2+randoms3;
                      $('.orderName').html(newfalseordercode);
                      var datas={
                                     "PAYED_ESCORTS_ID":GetQueryString('PAYED_ESCORTS_ID'),
                                     "APPLYMATRONLIST_ID":GetQueryString('APPLYMATRONLIST_ID'),
                                     "ORDERCODE":GetQueryString('ORDERCODE'),
                                     "PAYSUCCESS":'0',//支付状态
                                     "INTERVIEWFEE":'30', //面试费用
                                     "OUT_TRADE_NO":newfalseordercode//订单号 MS11111111.
                                    }
                            //支付完成了面试的就要告诉后台 添加月嫂记录
                          // alert(JSON.stringify(datas));
                         $.ajax({
                              type: 'POST',
                              // async:false,
                              headers: {'hx_token': JianKang.TOKEN_ID},
                              url:'/appuser/Matron/payMatronForInterview',
                              // dataType:'json',
                              data: datas,//要发送的数据（参数）
                              success:function(finishpay){
                                // alert('面试费用的接口：'+JSON.stringify(finishpay));
                                // $('.orderName').html(falseordercode);
                             // alert('回掉后falseordercode值'+falseordercode);
                             // if(flag){
                                     $.ajax({
                                        url:'/appuser/lakalaPay/AppCharge',
                                        type:'POST',
                                        data:{
                                            'REALMONEY':REALMONEY,
                                            'ORDERCODE':newfalseordercode,
                                            'CHANNEL':'lakala_app'
                                        },
                                        success:function(data){
                                              isPay=false;
                                              // alert(newfalseordercode);
                                            $('.orderName').html(newfalseordercode);
                                            if (/android/.test(ua)) {
                                                window.jsi.appPay(JSON.stringify(data.charge),REALMONEY,'lakala','jiazheng');
                                            }else if (/iphone|ipad|ipod/.test(ua)) {
                                                appPay(newfalseordercode,REALMONEY,'lakala','jiazheng',data.charge);
                                            }
                                           
                                         }
                                    }) 
                              }
                          })//支付完成了面试的就要告诉后台 添加月嫂记录
                  // }//flag=1
              } //面试和预定 
             else if(GetQueryString('payorder')==1){
                         var TRANSACTION_ID ='DJ'+99+timestamp+randoms1+randoms2+randoms3;
                        //预定金要发送数据
                            var orderdata={
                                "ESCORTS_ID":GetQueryString('ESCORTS_ID'),
                                "APPLYMATRONLIST_ID":GetQueryString('APPLYMATRONLIST_ID'),
                                "DEPOSIT":'',//预定金
                                'TRANSACTION_ID':TRANSACTION_ID
                              }
                              // alert(JSON.stringify(orderdata));
                              // return
                        // //预定金支付接口
                          $.ajax({
                           type: 'POST',
                           headers: {'hx_token': JianKang.TOKEN_ID},
                           data: orderdata,//要发送的数据（参数）
                           url:'/appuser/Matron/PayDepositOfMatron?APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID'),
                           success:function(adddata){
                                        // $('html').on('touchend',function(){
                                        //      location.href='../monthmatron/haveorder.html?APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID');
                                        // })
                                        // delectyuesao();//删除月嫂缓存
                                  // if(flag){
                                   $.ajax({
                                      url:'/appuser/lakalaPay/AppCharge',
                                      type:'POST',
                                      data:{
                                          'REALMONEY':REALMONEY,
                                          'ORDERCODE':TRANSACTION_ID,
                                          'CHANNEL':'lakala_app'
                                      },
                                      success:function(data){
                                            // alert(TRANSACTION_ID);
                                          $('.orderName').html(TRANSACTION_ID);
                                          delectyuesao();
                                          if (/android/.test(ua)) {
                                              // alert('安卓端');
                                            // alert('anzhuo'+newORDERCODE+'====='+REALMONEY);
                                              window.jsi.appPay(JSON.stringify(data.charge),REALMONEY,'lakala','jiazheng');
                                          }else if (/iphone|ipad|ipod/.test(ua)) {
                                               // alert('苹果端');
                                              appPay(TRANSACTION_ID,REALMONEY,'lakala','jiazheng',data.charge);
                                          }
                                            isPay=false;
                                         
                                       }
                                    }) 
                             // }//flag=1
                             }
                          })////预定金支付接口结束
              }//预定  
    })//拉卡拉支付完成
     //钱包开始
         $('.wallet').on('touchend', function() {
            payStyle='钱包';
            $('.paymethod').text('钱包');
            $.ajax({
                headers: {'hx_token': JianKang.TOKEN_ID},
                url:'/appuser/MembersCharge/getMembersBalanceById',
                type:'get',
                success:function(data){
                    console.log(data);
                    if (data.result=='hx-001') {
                        $('#walletMoney').html(data.pd.BALANCE);
                        $('#walletPayWrap').show();
                        $('#recharge').on('touchend',function(){
                            window.location.href='../MyPage/wallet.html';
                        })
                           
                            $('#pay').on('touchend',function(){
                          // alert(parseFloat($('.payMoney').text()));
                          // alert(parseFloat($('#walletMoney').text()));
                          // alert(parseFloat($('.payMoney').text())>parseFloat($('#walletMoney').text()));
                            if (parseFloat($('.payMoney').text())>parseFloat($('#walletMoney').text())){
                                new TipBox({type:'tip',iconStr:'余额不足',colorType:'system',str:"<p class='thirtySix'>钱包余额不足，请充值！</p>",Ok:'确定',hasBtn:true,callBack:function(){
                                    window.location.href='../MyPage/wallet.html';
                                }});
                            }
                            $('#walletPayWrap').hide();
                            $('#payPwWrap').show();
                            $('#payPwWrap input').val('');
                            $('#payPwHide').focus();
                            $('#btnPw').on('touchend',function(){
                                if ($('#payPwHide').val().length!=6) {
                                    new TipBox({type:'tip',iconStr:'填写密码',colorType:'system',str:"<p class='thirtySix'>请填写支付密码！</p>",Ok:'确定',hasBtn:true});
                                }else{
                                    if (isPay) {
                                        return;
                                    }
                                    isPay = true;
                                    $.ajax({
                                        headers: {'hx_token': JianKang.TOKEN_ID},
                                        url:'/appuser/MembersCharge/checkPayPassword',
                                        type:'POST',
                                        data:{
                                            'PAYPASSWORD':$('#payPwHide').val()
                                        },
                                        success:function(data){
                                            isPay=false;
                                            if (data) {
                                                $.ajax({
                                                    headers: {'hx_token': JianKang.TOKEN_ID},
                                                    url:'/appuser/MembersCharge/balancePayForOrder',
                                                    type:'POST',
                                                    data:{
                                                        'REALMONEY':$('.payMoney').text(),
                                                        'ORDERCODE':ORDERCODE,
                                                        'TYPE':walletOrderType
                                                    },
                                                    success:function(data){
                                                        $('input').blur();
                                                        if (data.result=='hx-001') {
                                                                   $('#payPwWrap').hide();
                                                                   $('.blockzhezhao,.zhezhaocontain').show();//支付成功显示遮罩层
                                                                    yuesaofunc();
                                                                          //发送ajax结束  点击支付推荐列表选择的面试费用接口
                                                                    if(GetQueryString('payinterview')==1||GetQueryString('detailinterview')==1){
                                                                      var datas={
                                                                                   "PAYED_ESCORTS_ID":GetQueryString('PAYED_ESCORTS_ID'),
                                                                                   // "ORDERCODE":newORDERCODE,
                                                                                   "APPLYMATRONLIST_ID":GetQueryString('APPLYMATRONLIST_ID')
                                                                                  }
                                                                          //支付完成了面试的就要告诉后台 添加月嫂记录
                                                                       $.ajax({
                                                                          type: 'POST',
                                                                          headers: {'hx_token': JianKang.TOKEN_ID},
                                                                          url:'/appuser/Matron/payMatronForInterview',
                                                                          // dataType:'json',
                                                                          data: datas,//要发送的数据（参数）
                                                                          success:function(finishpay){
                                                                                     $('html').on('touchend',function(){
                                                                                          location.href='../monthmatron/interview.html?APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID');
                                                                                      })
                                                                          }
                                                                       })//支付完成了面试的就要告诉后台 添加月嫂记录
                                                          }
                                                          else if(GetQueryString('payorder')==1){
                                                                  //预定金要发送数据
                                                                  var orderdata={
                                                                      "ESCORTS_ID":GetQueryString('ESCORTS_ID'),
                                                                      "APPLYMATRONLIST_ID":GetQueryString('APPLYMATRONLIST_ID')
                                                                    }
                                                              //预定金支付接口
                                                                $.ajax({
                                                                 type: 'POST',
                                                                 headers: {'hx_token': JianKang.TOKEN_ID},
                                                                 data: orderdata,//要发送的数据（参数）
                                                                 url:'/appuser/Matron/PayDepositOfMatron?APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID'),
                                                                 success:function(adddata){
                                                                              $('html').on('touchend',function(){
                                                                                   location.href='../monthmatron/haveorder.html?APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID');
                                                                              })
                                                                      var arryuesao=[];//已经预定完了需要删除所有的候选的缓存
                                                                      for (var i = 0; i < localStorage.length; i++) {
                                                                              key = localStorage.key(i);
                                                                              if (key != "bat"&&key.indexOf("bat")>=0) {
                                                                                 arryuesao.push(key);
                                                                              }
                                                                          }
                                                                          // alert(arryuesao);
                                                                          for(j=0;j<arryuesao.length;j++){
                                                                                  if(arryuesao[j] != "bat"&&arryuesao[j].indexOf("bat")>=0){
                                                                                      localStorage.removeItem(arryuesao[j]);
                                                                                  }
                                                                          }
                                                                  }
                                                                })////预定金支付接口结束
                                                          }//预定金成功告诉后台的
                                                          else if(GetQueryString('orderallmoney')==1){
                                                               $('html').on('touchend',function(){
                                                                       location.href='../monthmatron/waittoservice.html?APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID');
                                                                              })
                                                                                           // window.location.href='../conment/orderList.html';
                                                          }//支付全款成功
                                                          else if(GetQueryString('ordertype')=='wallet'){
                                                              walletfunc();
                                                          }
                                                            // 
                                                        }else{
                                                            isPay=false;
                                                            new TipBox({type:'error',iconStr:'系统错误',colorType:'system',str:"<p class='thirtySix'><span>抱歉,由于系统原因出错了,请重新尝试操作</span></p>",Ok:'确定',hasBtn:true,callBack:function(){
                                                                if (/android/.test(ua)) {
                                                                    window.jsi.goToOrderPage();
                                                                }else if (/iphone|ipad|ipod/.test(ua)) {
                                                                    goToOrderPage();
                                                                }
                                                            }});
                                                        } 
                                                    }
                                                }) 
                                            }else{
                                                isPay=false;
                                                new TipBox({type:'tip',iconStr:'密码错误',colorType:'system',str:"<p class='thirtySix'>支付密码错误！</p>",Ok:'确定',hasBtn:true});
                                            }
                                        }
                                    })          
                                }    
                            })  
                        })
                    }else {
                        new TipBox({type:'error',iconStr:'获取失败',colorType:'system',str:"<p class='thirtySix'><span>抱歉,由于系统原因出错了,请重新尝试操作</span></p>",Ok:'确定',hasBtn:true});
                    }
                },
                error:function(){
                    new TipBox({type:'error',iconStr:'获取失败',colorType:'system',str:"<p class='thirtySix'><span>抱歉,由于系统原因出错了,请重新尝试操作</span></p>",Ok:'确定',hasBtn:true});
                }
            })
            
        })
    // 关闭钱包支付弹窗
        $('#walletPayClose').on('touchend',function(){
            $('#walletPayWrap').hide();
        })
    // 关闭支付密码窗口
        $('#payPwClose').on('touchend',function(){
            $('#payPwWrap').hide();
        })
    // 支付密码弹窗
        $('#payPwHide').on('input',function(){
            $('#payPwRow>input').val('');
            for (var i = 0; i < $('#payPwHide').val().length; i++) {
                $('#payPwRow>input').eq(i).val($('#payPwHide').val()[i]);
            }
        })
        $('#payPwRow>input').on('touchend',function(){
            $('#payPwHide').focus();
        })
    // 忘记支付密码
        $('#forgetPw').on('touchend',function(){
            setTimeout(function(){
                window.location.href='../MyPage/payPw.html?last=pay';
            },500);
        })
     //钱包结束
}) 
//钱包充值的封装的函数
    function walletfunc(){
        $('.ordercode').text($('.orderName').html());
        $('.username').text(payStyle);
        $('html').on('touchend',function(){
            window.location.href='../MyPage/wallet.html'; 
        })
    }
    //yuesao函数
    function  yuesaofunc(){
                  // 获取订单的详细信息的接口
    $.ajax({
               type: 'GET',
               headers: {'hx_token': JianKang.TOKEN_ID},
               // url:'/appuser/Shop/GetMyShoppingOrderList',
               url:'/appuser/Matron/GetApplyMatronByID?APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID'),
               // dataType:'json',
               // data: APPLYMATRONLIST_ID,//要发送的数据（参数）
               success:function(msg){
                  $('.ordercode').text(msg.pd.ORDERCODE);
                  $('.username').text(msg.pd.NAME);
                  // // $('.ordermoney').text('￥'+returnFloat(GetQueryString('REALMONEY')/100));
                  // $('html').on('touchend',function(){
                  //     location.href='../escort/escortorderdetails.html?APPLYHOMEESCORTLIST_ID='+GetQueryString('APPLYHOMEESCORTLIST_ID');
                  // })
               }
             })
  }
       function delectyuesao(){
                                 var arryuesao=[];//已经预定完了需要删除所有的候选的缓存
                                  for (var i = 0; i < localStorage.length; i++) {
                                          key = localStorage.key(i);
                                          if (key != "bat"&&key.indexOf("bat"+GetQueryString('APPLYMATRONLIST_ID'))>=0) {
                                             arryuesao.push(key);
                                          }
                                      }
                                      // alert(arryuesao);
                                      for(j=0;j<arryuesao.length;j++){
                                              if(arryuesao[j] != "bat"&&arryuesao[j].indexOf("bat"+GetQueryString('APPLYMATRONLIST_ID'))>=0){
                                                  localStorage.removeItem(arryuesao[j]);
                                              }
                                      }
                            }
