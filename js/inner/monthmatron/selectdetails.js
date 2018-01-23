 function  startinterview(hsname,hspasssword,hname,img){
                              // alert('startinterview触发啦');
                              window.jsi.startinterview(hsname,hspasssword,hname,img);
                            }
function goToOrderPage(){};
function goBack(){};
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
         //点击跳转上个页面
    // $('.backup').on('touchend',function(){
    //       window.history.back();
    //   });
    // alert(GetQueryString('recommend')==1);
       $('.backup').on('touchend',function(){
             if(GetQueryString('recommend')==1){
                  location.href='recommend.html?APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID');
             }else if(GetQueryString('waitselect')==1){
                  location.href='waitselect.html?APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID');
             }
             else{
                window.history.go(-1);
                // if (/android/.test(ua)) {
                //    window.jsi.goToOrderPage();//goToOrderpage是返回到订单列表页面
                //  }else if (/iphone|ipad|ipod/.test(ua)) {
                //    goToOrderPage();//gotoorderpage是固定的跳到订单列表页
                //  }
             }
        });
     var IMGURL;  
     var ESCORTNAME; 
     var NATIVEPLACE; 
     var SERVICEYEAR;  
     var ESCORTS_ID;
     var HXUSERNAME;  
     var HXPASSWORD; 
     var MYLEVEL; 
     var nowdate;
     var nowdateyear;
     var nowdatemonth;
     var nowdatedate;
     var daycycle;
     function kaishi(nowdate){
            var oldTime = (new Date(nowdate.replace(/-/g,'/'))).getTime(); //开始时间得到毫秒数
            var myoldTime =new Date(oldTime);
            return myoldTime      
          }
    //判断是否登录结束
    //发送ajax开始获取地址栏点击月嫂的id号得到并发送给后台 再返回这个月嫂的数据
       $.ajax({
                   type: 'GET',
                   headers: {'hx_token': JianKang.TOKEN_ID},
                   // url:'/appuser/Shop/GetMyShoppingOrderList',
                   url:'/appuser/Hospital/GetEscortInfoByEscortsId?ESCORTS_ID='+GetQueryString('ESCORTS_ID'),
                   // dataType:'json',
                   // data: usersinfo,//要发送的数据（参数）
                   success:function(data){
                      // alert('GetEscortInfoByEscortsId:'+JSON.stringify(data));
                       IMGURL= data.pd.IMGURL;  
                       ESCORTNAME= data.pd.ESCORTNAME; 
                       NATIVEPLACE= data.pd.NATIVEPLACE; 
                       SERVICEYEAR= data.pd.SERVICEYEAR;  
                       ESCORTS_ID= data.pd.ESCORTS_ID;
                       HXUSERNAME= data.pd.HXUSERNAME;  
                       HXPASSWORD= data.pd.HXPASSWORD;
                       MYLEVEL= data.pd.MYLEVEL;
                       VALUE= data.pd.VALUE;
                     //当前的年份
                     var mydate = new Date();
                     var mydateyear=new Date().getFullYear();
                     // $('.touxiangimg').attr('src','/uploadFiles/uploadImgs/'+data.pd.IMGURL);//月嫂图片
                     $('.touxiangimg').attr('src','../../img/monthmatron/teacherimgbg.png')
                     // $('.teachersimg').attr('src','/'+data.pd.PHOTO1);//导师图片
                     // console.log(data.pd.PHOTO2);
                     $('.workyear').text(data.pd.SERVICEYEAR+'年');//工作经验
                     $('.birthplace').text(data.pd.NATIVEPLACE+'人士');//出生地
                     $('.birthday').text(mydateyear-data.pd.BIRTHDAY.substring(0,4)+'岁');//年龄
                     // alert('生日是：'+data.pd.BIRTHDAY)
                     $('.teachertalk').text(data.pd.REMARK);//REMARK就当导师评语
                     $('.teachername').html('<span></span>&nbsp;&nbsp;&nbsp;'+data.pd.MGRNAME);//USERNAEM就是导师姓名
                     if(data.pd.SERVICECONTENT){
                      $('.experiencetext').html(data.pd.SERVICECONTENT);//服务内容、服务经验
                     }
                        //点击加入到候选月嫂页面缓存
                        $('.selectebtnhouxuan').on('touchend',function(){
                             // 需要稍微数据
                             if($('.selectebtnhouxuan').text()=='候选'){
                                $('.selectebtnhouxuan').text('取消候选')
                                // $("#msg").text('已成功加入候选').show().animate({width: '15.5625rem'}, 200).fadeOut(1000); //提示信息 
                                    //设置缓存开始
                                    var bat = {"VALUE":VALUE,"HXUSERNAME":HXUSERNAME,"HXPASSWORD":HXPASSWORD,"IMGURL":IMGURL,"ESCORTNAME":ESCORTNAME,"NATIVEPLACE":NATIVEPLACE,"SERVICEYEAR":SERVICEYEAR,"ESCORTS_ID":ESCORTS_ID,"MYLEVEL":MYLEVEL};
                                                     var batString = JSON.stringify(bat);
                                                     console.log(batString);
                                                     var keyName = "bat"+GetQueryString('APPLYMATRONLIST_ID')+ESCORTS_ID;
                                                      for (var i = 0; i < localStorage.length; i++) {
                                                          if (localStorage.key(i) == keyName) {
                                                              localStorage.removeItem(keyName);
                                                          }
                                                      }
                                                      localStorage.setItem("bat"+GetQueryString('APPLYMATRONLIST_ID')+ESCORTS_ID, batString);
                             }
                             else if($('.selectebtnhouxuan').text()=='取消候选'){
                              // $("#msg").text('取消候选').show().animate({width: '15.5625rem'}, 200).fadeOut(1000); //提示信息 
                                $('.selectebtnhouxuan').text('候选')
                                // localStorage.removeItem('selectdetails');
                                localStorage.removeItem("bat"+GetQueryString('APPLYMATRONLIST_ID')+ESCORTS_ID);
                             }
                        })
                        //点击预约
                        $('.selecttoorder').on('touchend',function(){
                                event.stopPropagation();
                                $('.blockzhezhao,.zhezhaocontain2').show();
                                 //close预约
                                $('.yuesaoorderclose').on('touchend',function(){
                                         $('.blockzhezhao,.zhezhaocontain2').hide();
                                    })
                                 // alert('函数的值是'+GetQueryString('APPLYMATRONLIST_ID'));
                                        // alert('APPLYMATRONLIST_ID值是'+APPLYMATRONLIST_ID);
                                //ajax请求开始
                            $.ajax({
                               type: 'GET',
                               headers: {'hx_token': JianKang.TOKEN_ID},
                               // url:'/appuser/Shop/GetMyShoppingOrderList',
                               url:'/appuser/Matron/GetApplyMatronByID?APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID'),
                               success:function(datalist){
                                    // alert(JSON.styingify(datalist));
                                    // console.log(datalist.pd.ESCORTS_ID);
                                    $('.yuesaoname').text('服务人员：'+data.pd.ESCORTNAME);
                                    $('.borndate').text('预产期：'+datalist.pd.DUEDATE);
                                     var startTime = (new Date((datalist.pd.DUEDATE).replace(/-/g,'/'))).getTime();//毫秒数
                                     var afterstartTime=new Date(startTime+15*24*60*60*1000);//普通时间加上天数就是新的日期的毫秒数
                                     var beforestartTime=new Date(startTime-15*24*60*60*1000);//普通时间减去天数就是新的日期的毫秒数
                                     //根据日期格式化日期函数
                                    function   formatDate(now)   {     
                                            var   year=now.getFullYear();     
                                            var   month=now.getMonth()+1;     
                                            var   date=now.getDate();     
                                            var   hour=now.getHours();     
                                            var   minute=now.getMinutes();     
                                            var   second=now.getSeconds();     
                                            return   month+"月"+date+"日";     
                                        }     
                                        // alert(formatDate(beforestartTime));
                                        // alert(formatDate(afterstartTime));
                                    $('.duringdate').text('锁定服务等待时段：'+formatDate(beforestartTime)+'~'+formatDate(afterstartTime));
                                    // 提交按钮
                                      var userdata={
                                        "ESCORTS_ID":GetQueryString('ESCORTS_ID')
                                      };
                                       //ajax请求开始价格计算
                                $.ajax({
                                        type: 'GET',
                                        headers: {'hx_token':JianKang.TOKEN_ID},
                                        url:'/appuser/Hospital/GetEscortInfoByEscortsId?ESCORTS_ID='+GetQueryString('ESCORTS_ID'),
                                        success:function(pricedata){
                                           var DEPOSIT;
                                           daycycle=datalist.pd.SERVICECYCLE;
                                           nowdate=datalist.pd.DUEDATE;
                                           nowdateyear=kaishi(nowdate).getFullYear();
                                           nowdatemonth=kaishi(nowdate).getMonth();
                                           nowdatedate=kaishi(nowdate).getDate();
                                           //看有几天是节假日 3倍
                                           $.ajax({
                                              url:'http://www.easybots.cn/api/holiday.php?d='+getAll(nowdate, transferCouponValueTime(nowdateyear,nowdatemonth+1,nowdatedate,daycycle))+'&ak=k381.659a5150a2e8efcd53b75a423e263997@jkzdw.com',
                                              type:'GET',
                                              success:function(data){
                                                  var jierinum=0;
                                                  for(var p in JSON.parse(data)){//遍历json对象的每个key/value对,p为key
                                                    if(JSON.parse(data)[p]==2){
                                                      jierinum++;
                                                    } 
                                                  }
                                                  if(daycycle==0){
                                                    jierinum==0;
                                                  }
                                                     DEPOSIT=((pricedata.pd.VALUE/26)*daycycle+(pricedata.pd.VALUE/26)*jierinum*1)*(30/100);
                                                     // $('.orderrestmoney').text('￥'+returnFloat(orderrestmoney-orderrestmoney*(30/100)));
                                                     // alert('结束时间'+transferCouponValueTime(nowdateyear,nowdatemonth+1,nowdatedate,daycycle));
                                                    $('#orderprice').text('预定费:'+returnFloat(DEPOSIT)+'元');
                                               }
                                             }) //看有几天是节假日 3倍
                                              $('.submituserinfo2').on('touchend',function(){
                                                                      var PAYED_ESCORTS_ID=GetQueryString('ESCORTS_ID'); 
                                                                            // 传递一个护工的id告诉他是选的那个 在订单上显示
                                                                        $.ajax({
                                                                                   type: 'POST',
                                                                                   headers: {'hx_token': JianKang.TOKEN_ID},
                                                                                   data: userdata,//要发送的数据（参数）
                                                                                   url:'/appuser/Matron/updateApplyMatron?APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID'),
                                                                                   success:function(adddata){
                                                                                     // alert('adddata的值是'+adddata);
                                                                                    location.href='../conment/payMethodpage.html?ORDERCODE=' + datalist.pd.ORDERCODE + '&REALMONEY=' + DEPOSIT*100 +'&payorder=1'+'&PAYED_ESCORTS_ID='+PAYED_ESCORTS_ID+'&APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID')+'&ESCORTS_ID='+GetQueryString('ESCORTS_ID')+'&userdata='+userdata;
                                                                                      // location.href='waittopay.html?APPLYMATRONLIST_ID='+APPLYMATRONLIST_ID;
                                                                                     // location.href='waittoservice.html?APPLYMATRONLIST_ID='+APPLYMATRONLIST_ID+'&'+'ESCORTS_ID='+msg.pd[wantorder].ESCORTS_ID;
                                                                                    }
                                                                             })
                                                  })
                                            }//success
                                        })//ajax请求开始价格计算
                                     }
                                })
                                     // 
                            })//点击预约结束
                   }
             })
        //发送ajax结束
       //点击预页面
    $('.closepaybtn').on('touchend',function(){
        $('.blockzhezhao,.zhezhaocontain').hide();
        // $('.zhezhaocontain2').hide();
    })
////从下单页过来得到的数据 看看是否支付了 如果支付就显示视频按钮
 $.ajax({
       type: 'GET',
       headers: {'hx_token': JianKang.TOKEN_ID},
        async:false,
       url:'/appuser/Matron/GetApplyMatronByID?APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID'),
       success:function(datalist){
          ORDERCODE=datalist.pd.ORDERCODE;
           $.ajax({
                       type: 'GET',
                       headers: {'hx_token': JianKang.TOKEN_ID},
                       // url:'/appuser/Shop/GetMyShoppingOrderList',
                       url:'/appuser/Matron/getPayMatronForInterviewList?ORDERCODE='+ORDERCODE,
                       // dataType:'json',
                       // data: APPLYMATRONLIST_ID,//要发送的数据（参数）
                       success:function(getpay){
                            // alert(getpay.pd.length);
                            //看是否支付啦 支付啦msg.odpd.PAYED_ESCORTS_ID就追加一个护工的id
                            if(getpay.pd.length>0){
                                  for(i=0;i<getpay.pd.length;i++){
                                     if(getpay.pd[i].ESCORTS_ID==GetQueryString('ESCORTS_ID')){
                                       $('.wantinterview').text('视频');
                                     }
                                  }
                                }
                        }
                })////从下单页过来得到的数据 看看是否支付了 如果支付就显示视频按钮结束
       }
   })
    //
    $('.wantinterview').on('touchend',function(){
          if($('.wantinterview').text()=='视频'){
                                    $('.blockzhezhao,.zhezhaocontain').hide();
                                    $.ajax({
                                         type: 'GET',
                                         headers: {'hx_token': JianKang.TOKEN_ID},
                                         // url:'/appuser/Shop/GetMyShoppingOrderList',
                                         url:'/appuser/Hospital/GetEscortInfoByEscortsId?ESCORTS_ID='+GetQueryString('ESCORTS_ID'),
                                         // dataType:'json',
                                         // data: usersinfo,//要发送的数据（参数）
                                         success:function(msg){
                                          // alert(msg.pd.ESCORTNAME);
                                        startinterview(msg.pd.HXUSERNAME,msg.pd.HXPASSWORD,msg.pd.ESCORTNAME,msg.pd.IMGURL);
                                      }
                                    })
                                  }
                            else{
                               $('.blockzhezhao,.zhezhaocontain').show();
                               $('.submituserinfo').on('touchend',function(){
                                  //支付成功后面 试邀请按钮变成视频
                                  // $('.wantinterview').text('视频');
                                  // $('.blockzhezhao,.zhezhaocontain').hide();
                                         //加入缓存到候选中//设置缓存开始
                                         var bat = {"VALUE":VALUE,"HXUSERNAME":HXUSERNAME,"HXPASSWORD":HXPASSWORD,"IMGURL":IMGURL,"ESCORTNAME":ESCORTNAME,"NATIVEPLACE":NATIVEPLACE,"SERVICEYEAR":SERVICEYEAR,"ESCORTS_ID":ESCORTS_ID};
                                         var batString = JSON.stringify(bat);
                                         console.log(batString);
                                         var keyName = "bat" +GetQueryString('APPLYMATRONLIST_ID')+ GetQueryString('ESCORTS_ID');
                                          for (var i = 0; i < localStorage.length; i++) {
                                              if (localStorage.key(i) == keyName) {
                                                  localStorage.removeItem(keyName);
                                              }
                                          }
                                          localStorage.setItem("bat"+GetQueryString('APPLYMATRONLIST_ID')+ GetQueryString('ESCORTS_ID'), batString);
                                           //加入缓存到候选中结束
                                          // var timestamp=new Date().getTime(); 
                                          // var randoms1=Math.floor(Math.random()*100);
                                          // var randoms2=Math.floor(Math.random()*100);
                                          // var randoms3=Math.floor(Math.random()*100);
                                          // var falseordercode=99+timestamp+randoms1+randoms2+randoms3;
                                          // appinterview(falseordercode,30);
                                          var PAYED_ESCORTS_ID=GetQueryString('ESCORTS_ID'); 
                                          location.href='../conment/payMethodpage.html?ORDERCODE=' + ORDERCODE + '&REALMONEY=' + 30*100 +'&detailinterview=1'+'&PAYED_ESCORTS_ID='+PAYED_ESCORTS_ID+'&APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID')+'&ESCORTS_ID='+GetQueryString('ESCORTS_ID');
                                    //ajax请求结束
                                })//支付按钮结束
                             }
    })
})
// 自定义数组去重
 // function unique(arr1) {
 //        var arr2 = [];
 //        var obj = {};
 //        for (var i = 0; i < arr1.length; i++) {
 //            if (!obj[arr1[i]]) {
 //                arr2.push(arr1[i]);
 //                obj[arr1[i]] = 1;
 //            }
 //        }
 //        return arr2;
 //    }
