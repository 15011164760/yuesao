function goToOrderPage(){};
function goBack(){};
var allescorts_id='';//批量选择月嫂id
var ORDERCODE='';//订单号
 function  startinterview(hsname,hspasssword,hname,img){
                              // alert('startinterview触发啦');
                              window.jsi.startinterview(hsname,hspasssword,hname,img);
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
//     //判断是否登录结束
    //点击跳转上个页面
    $('.backup').on('touchend',function(){
          if(localStorage.getItem('orderstatus')||localStorage.getItem('interview')){
            location.href='recommend.html?APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID');
          }else{
             window.history.go(-1);
              // if (/android/.test(ua)) {
              //    window.jsi.goToOrderPage();//goToOrderpage是返回到订单列表页面
              //  }else if (/iphone|ipad|ipod/.test(ua)) {
              //    goToOrderPage();//gotoorderpage是固定的跳到订单列表页
              //  }
          }             
      });
     // $('.mareselect').hide();
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
     $('.paybtn').hide();
    //获取所有缓存并且遍历这个缓存
      //开始得到缓存
  var carAry=new Array();
      for (var i = 0; i < localStorage.length; i++) {
          var key = localStorage.key(i);
          console.log(key);
          var localValue = localStorage.getItem(key);
          console.log(localValue);
          if (key != ("bat"+GetQueryString('APPLYMATRONLIST_ID'))&&key.indexOf("bat"+GetQueryString('APPLYMATRONLIST_ID'))>=0) {
              var obj = $.parseJSON(localValue);
              carAry.push(obj);
              // localStorage.removeItem(key);
          }
      }
    var bat = { "carAry": carAry };
    console.log(bat["carAry"]);
  
   //追加页面上面
   var str='';
  var APPLYMATRONLIST_ID=GetQueryString('APPLYMATRONLIST_ID');
   if(bat["carAry"]){
        //ajax请求开始
    $.ajax({
         type: 'GET',
         async:false,
         headers: {'hx_token': JianKang.TOKEN_ID},
         // url:'/appuser/Shop/GetMyShoppingOrderList',
         url:'/appuser/Matron/GetApplyMatronByID?APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID'),
         success:function(dataordercode){
             ORDERCODE=dataordercode.pd.ORDERCODE
         }
       })
       // alert(ORDERCODE);
        $.ajax({
                 type: 'GET',
                 headers: {'hx_token': JianKang.TOKEN_ID},
                 url:'/appuser/Matron/getPayMatronForInterviewList?ORDERCODE='+ORDERCODE,
                 // data: APPLYMATRONLIST_ID,//要发送的数据（参数）
                 success:function(getpay){
                           //看是否支付存在 如果存在走这个
                          //data.odpd是订单里的东西，不用重新调取了
                           // 拼接开始
                           // alert(getpay.pd);
                              var str='';
                              var payarr=[];
                             for(i=0;i<bat["carAry"].length;i++){
                                  if(getpay.pd.length>0){
                                     // alert(getpay.pd);
                                      //看是否支付啦 支付啦payarr就追加一个护工的id
                                         for(j=0;j<getpay.pd.length;j++){//已经支付
                                             if(bat["carAry"][i].ESCORTS_ID==getpay.pd[j].ESCORTS_ID){
                                                             payarr.push(bat["carAry"][i].ESCORTS_ID);
                                                          }
                                          }
                                         if(payarr.indexOf(bat["carAry"][i].ESCORTS_ID)!=-1){
                                            if(bat["carAry"][i].IMGURL){
                                               str+='<div class="yuesaomain"><div><img src="/uploadFiles/uploadImgs/'+bat["carAry"][i].IMGURL+'" alt="" class="selectimg"></div>'
                                            }else{
                                               str+='<div class="yuesaomain"><div><img src="../../img/monthmatron/teacherimgbg.png" alt="" class="selectimg"></div>'
                                             }
                                            str+='<div><ul><li class="yesaoname"><span class="yesaonames"><img src="../../img/monthmatron/noselect.png" alt="" class="choosemoreimg">'
                                            str+='<input type="checkbox" class="choosemore orange"></span><span>'+bat["carAry"][i].ESCORTNAME+'</span><span>面试中</span>'
                                            str+='</li><li>月嫂&nbsp;&nbsp;/&nbsp;&nbsp;'+bat["carAry"][i].NATIVEPLACE+'人士&nbsp;&nbsp;/&nbsp;&nbsp;'+bat["carAry"][i].SERVICEYEAR+'年服务经验</li>'
                                            str+='<li class="yuesaoprice"><span>￥</span><span>'+bat["carAry"][i].VALUE+'</span> <span><img src="../../img/monthmatron/slash.png" alt=""></span>'
                                            str+='<span>26天</span><span class="videointerview"><span style="margin-top:.9rem">视频</span></span><span class="wantorder"><span>预约</span></span></li></ul></div> </div>'
                                         }
                                         else{
                                            if(bat["carAry"][i].IMGURL){
                                               str+='<div class="yuesaomain"><div><img src="/uploadFiles/uploadImgs/'+bat["carAry"][i].IMGURL+'" alt="" class="selectimg"></div>'
                                            }else{
                                               str+='<div class="yuesaomain"><div><img src="../../img/monthmatron/teacherimgbg.png" alt="" class="selectimg"></div>'
                                             }
                                            // str+='<div class="yuesaomain"><div><img src="/uploadFiles/uploadImgs/'+bat["carAry"][i].IMGURL+'" alt="" class="selectimg"></div>'
                                            str+='<div><ul><li class="yesaoname"><span class="yesaonames"><img src="../../img/monthmatron/noselect.png" alt="" class="choosemoreimg">'
                                            str+='<input type="checkbox" class="choosemore orange"></span><span>'+bat["carAry"][i].ESCORTNAME+'</span>'
                                            str+='</li><li>月嫂&nbsp;&nbsp;/&nbsp;&nbsp;'+bat["carAry"][i].NATIVEPLACE+'人士&nbsp;&nbsp;/&nbsp;&nbsp;'+bat["carAry"][i].SERVICEYEAR+'年服务经验</li>'
                                            str+='<li class="yuesaoprice"><span>￥</span><span>'+bat["carAry"][i].VALUE+'</span> <span><img src="../../img/monthmatron/slash.png" alt=""></span>'
                                            str+='<span>26天</span><span class="videointerview"> <span>视频</span> <span>面试</span></span><span class="wantorder"><span>预约</span></span></li></ul></div> </div>'
                                         }
                                   }
                             // //没支付走这个
                                  else{
                                      if(bat["carAry"][i].IMGURL){
                                               str+='<div class="yuesaomain"><div><img src="/uploadFiles/uploadImgs/'+bat["carAry"][i].IMGURL+'" alt="" class="selectimg"></div>'
                                       }else{
                                               str+='<div class="yuesaomain"><div><img src="../../img/monthmatron/teacherimgbg.png" alt="" class="selectimg"></div>'
                                             }
                                      // str+='<div class="yuesaomain"><div><img src="/uploadFiles/uploadImgs/'+bat["carAry"][i].IMGURL+'" alt="" class="selectimg"></div>'
                                      str+='<div><ul><li class="yesaoname"><span class="yesaonames"><img src="../../img/monthmatron/noselect.png" alt="" class="choosemoreimg">'
                                      str+='<input type="checkbox" class="choosemore"></span><span>'+bat["carAry"][i].ESCORTNAME+'</span>'
                                      str+='</li><li>月嫂&nbsp;&nbsp;/&nbsp;&nbsp;'+bat["carAry"][i].NATIVEPLACE+'人士&nbsp;&nbsp;/&nbsp;&nbsp;'+bat["carAry"][i].SERVICEYEAR+'年服务经验</li>'
                                      str+='<li class="yuesaoprice"><span>￥</span><span>'+bat["carAry"][i].VALUE+'</span> <span><img src="../../img/monthmatron/slash.png" alt=""></span>'
                                      str+='<span>26天</span><span class="videointerview"><span>视频</span> <span>面试</span></span><span class="wantorder"><span>预约</span></span></li></ul></div> </div>'
                                  }
                             }
                             $('.yuesaomainout').append(str);
                             $('.selectimg').attr('src','../../img/monthmatron/teacherimgbg.png')
                              //点击进入详情开始
                              //移动端别用click 容易穿透 这样可以防止图片刚滑动放上就触发
                              $('.yuesaomain').on('touchstart', function() {
                                         ismove = false
                                })
                              $('.yuesaomain').on('touchmove', function() {
                                         ismove = true
                                })
                              $('.yuesaomain').on('touchend', function() {
                                    if (ismove) {
                                        return
                                    }
                                   order=$(this).index();
                                   // location.href='selectdetails.html?selectorder='+JSON.stringify(msg.pd[order]);
                                   // location.href='selectdetails.html?'+order+'='+JSON.stringify(bat["carAry"][order].ESCORTS_ID);
                                    // if(GetQueryString('gototuijian')==1){
                                    //    location.href='selectdetails.html?APPLYMATRONLIST_ID='+APPLYMATRONLIST_ID+'&'+'ESCORTS_ID='+bat["carAry"][order].ESCORTS_ID+'&waitselect=1&gototuijian=1';
                                    // }else{
                                      location.href='selectdetails.html?APPLYMATRONLIST_ID='+APPLYMATRONLIST_ID+'&'+'ESCORTS_ID='+bat["carAry"][order].ESCORTS_ID+'&waitselect=1';
                                  // }
                                    ismove = false
                               })
                            //点击进入详情结束
                                  //点击出现预约页面
                            // if( $('.choosemore').length!=0){
                                 //点击预约按钮
                              // $('.wantorder').on('touchend',function(event){
                              //       event.stopPropagation();
                              //       $('.blockzhezhao,.zhezhaocontain').show();
                              //       console.log(111);
                              //        $('.submituserinfo').on('touchend',function(){
                              //           $('.blockzhezhao,.zhezhaocontain').hide();
                              //           $('.blockzhezhao,.zhezhaocontain2').show();
                              //             $('.submituserinfo2').on('touchend',function(){
                              //                   location.href='orderdetails.html?data-id='+GetQueryString('data-id');
                              //             })
                              //         })
                              //   })
                            ///
                            // $('.houxuan').on('touchend',function(){
                            //     window.location.reload();
                            // })
                             //点击预约按钮开始
                                      $('.wantorder').on('touchend',function(event){
                                        // alert(111);
                                         // $('.wantorder').hide();
                                        // alert('函数的值是'+GetQueryString('APPLYMATRONLIST_ID'));
                                        // alert('APPLYMATRONLIST_ID值是'+APPLYMATRONLIST_ID);
                                            var wantorder=$(this).index('.wantorder');
                                            event.stopPropagation();
                                            $('.blockzhezhao,.zhezhaocontain').show();
                                            //ajax请求开始
                                            $.ajax({
                                               type: 'GET',
                                               headers: {'hx_token': JianKang.TOKEN_ID},
                                               // url:'/appuser/Shop/GetMyShoppingOrderList',
                                               url:'/appuser/Matron/GetApplyMatronByID?APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID'),
                                               success:function(datalist){
                                                    // alert(JSON.stringify(datalist));
                                                    $('.yuesaoname').text('服务人员：'+bat["carAry"][wantorder].ESCORTNAME);
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
                                                       // alert('bat["carAry"][wantorder].ESCORTS_ID值'+bat["carAry"][wantorder].ESCORTS_ID);
                                                    $('.duringdate').text('锁定服务等待时段：'+formatDate(beforestartTime)+'~'+formatDate(afterstartTime));
                                                      //ajax请求开始价格计算
                                                      // 提交按钮
                                                  var userdata={
                                                        "ESCORTS_ID":bat["carAry"][wantorder].ESCORTS_ID
                                                      };
                                                     // alert(datalist.pd.DUEDATE);  
                                              $.ajax({
                                                           type: 'GET',
                                                           headers: {'hx_token':JianKang.TOKEN_ID},
                                                           url:'/appuser/Hospital/GetEscortInfoByEscortsId?ESCORTS_ID='+bat["carAry"][wantorder].ESCORTS_ID,
                                                           success:function(pricedata){
                                                          var DEPOSIT;
                                                           daycycle=datalist.pd.SERVICECYCLE;

                                                           nowdate=datalist.pd.DUEDATE;// (new Date((datalist.pd.DUEDATE).replace(/-/g,'/')))
                                                           nowdateyear=kaishi(nowdate).getFullYear();
                                                           nowdatemonth=kaishi(nowdate).getMonth();
                                                           nowdatedate=kaishi(nowdate).getDate();
                                                           // alert(nowdate.replace(/-/g,'/'));
                                                           // alert(datalist.pd.DUEDATE);
                                                           // $('.houxuan').text(JSON.stringify(getAll(nowdate, transferCouponValueTime(nowdateyear,nowdatemonth+1,nowdatedate,daycycle))));
                                                           // $('.houxuan').text(transferCouponValueTime(nowdateyear,nowdatemonth+1,nowdatedate,daycycle).replace(/-/g,'/'));
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
                                                                          // $('#orderprice').text('1111');
                                                                     }
                                                                   }) //看有几天是节假日 3倍
                                                              // 提交按钮
                                                             $('.submituserinfo').on('touchend',function(){
                                                                    var timestamp=new Date().getTime(); 
                                                                    var randoms1=Math.floor(Math.random()*100);
                                                                    var randoms2=Math.floor(Math.random()*100);
                                                                    var randoms3=Math.floor(Math.random()*100);
                                                                    var falseordercode=99+timestamp+randoms1+randoms2+randoms3;
                                                                    // appinterview(falseordercode,30);
                                                                    var PAYED_ESCORTS_ID=bat["carAry"][wantorder].ESCORTS_ID; 
                                                                          // 传递一个护工的id告诉他是选的那个 在订单上显示
                                                                          $.ajax({
                                                                                     type: 'POST',
                                                                                     headers: {'hx_token': JianKang.TOKEN_ID},
                                                                                     data: userdata,//要发送的数据（参数）
                                                                                     url:'/appuser/Matron/updateApplyMatron?APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID'),
                                                                                     success:function(adddata){
                                                                                       // alert('adddata的值是'+adddata);
                                                                                      location.href='../conment/payMethodpage.html?ORDERCODE=' + datalist.pd.ORDERCODE + '&REALMONEY=' + DEPOSIT*100 +'&payorder=1&APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID')+'&ESCORTS_ID='+bat["carAry"][wantorder].ESCORTS_ID;
                                                                                        // location.href='waittopay.html?APPLYMATRONLIST_ID='+APPLYMATRONLIST_ID;
                                                                                       // location.href='waittoservice.html?APPLYMATRONLIST_ID='+APPLYMATRONLIST_ID+'&'+'ESCORTS_ID='+msg.pd[wantorder].ESCORTS_ID;
                                                                                      }
                                                                          })
                                                                 }) // 提交按钮结束
                                                            }//success
                                                      })//ajax请求开始价格计算
                                                     //close预约
                                                        $('.yuesaoorderclose').on('touchend',function(){
                                                             $('.blockzhezhao,.zhezhaocontain').hide();
                                                        })
                                                    //close预约结束
                                                 }
                                              })//ajax结束
                                        })
                                //预约结束
                            ///
                            ///
                                $('.yuesaoorderclose').on('touchend',function(){
                                     $('.blockzhezhao,.zhezhaocontain').hide();
                                })
                                $('.closepaybtn').on('touchend',function(){
                                    allescorts_id='';//批量选择月嫂id
                                    $('.blockzhezhao,.zhezhaocontain2').hide();
                                })
                                $('.videointerview').on('touchend',function(event){
                                    // location.href='interview.html';
                                   //支付成功后面试邀请按钮变成呼叫
                                   var videoindex=$(this).index('.videointerview');
                                  // alert("videoindex值是"+videoindex);
                                  // alert(bat["carAry"]);
                                  // alert(bat["carAry"][videoindex].HXUSERNAME);
                                  // alert(bat["carAry"][videoindex].HXPASSWORD);
                                   // console.log($('.videointerview').eq(0));
                                         event.stopPropagation();
                                        if($('.videointerview').eq(videoindex).html()=='<span style="margin-top:.9rem">视频</span>'){
                                          $('.blockzhezhao,.zhezhaocontain2').hide();
                                           // alert(11);
                                           startinterview(bat["carAry"][videoindex].HXUSERNAME,bat["carAry"][videoindex].HXPASSWORD,bat["carAry"][videoindex].ESCORTNAME,bat["carAry"][videoindex].IMGURL);
                                       }
                                       else{
                                         // alert(22);
                                          $('.blockzhezhao,.zhezhaocontain2').show();
                                            $('.totalpeople').text(1+'位');
                                            $('.totalmoney').text(returnFloat(30));
                                            // alert(22222);
                                          $('.submituserinfo2').on('touchend',function(){
                                            // alert(22222);
                                                            var timestamp=new Date().getTime(); 
                                                            var randoms1=Math.floor(Math.random()*100);
                                                            var randoms2=Math.floor(Math.random()*100);
                                                            var randoms3=Math.floor(Math.random()*100);
                                                            var falseordercode=99+timestamp+randoms1+randoms2+randoms3;
                                                            // appinterview(falseordercode,30);
                                                            var PAYED_ESCORTS_ID=bat["carAry"][videoindex].ESCORTS_ID; 
                                                            location.href='../conment/payMethodpage.html?ORDERCODE=' + ORDERCODE + '&REALMONEY=' + 30*100 + '&payinterview=1'+'&PAYED_ESCORTS_ID='+PAYED_ESCORTS_ID+'&APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID');
                                               //  //ajax请求结束
                                          })
                                       }
                                })
                               //打开底部支付内容
                              $('.paybtn').on('touchend',function(){
                                     allescorts_id='';//批量选择月嫂id
                                     var inplength=$(".choosemoreshow:checked").length;
                                    // if($(".choosemoreshow").length>0){
                                          if(inplength<1){
                                             $("#msg").text('请选择面试人').show().animate({width: '10rem'}, 200).fadeOut(1000); //提示信息 
                                          }
                                         else{
                                              $('.blockzhezhao,.zhezhaocontain2').show();
                                              $('.totalpeople').text(inplength+'位');
                                              $('.totalmoney').text(returnFloat(inplength*30));
                                          }
                                              //面试支付按钮开始
                                              var isPay=false;
                                               $('.submituserinfo2').on('touchend',function(){
                                                        if (isPay) {
                                                            return;
                                                        }
                                                        isPay = true;
                                                       //第一种each方法
                                                        $(".choosemore").each(function(indexchoose,element){
                                                              // prop() 方法设置或返回被选元素的属性和值。
                                                              if($(element).prop("checked")){
                                                                 // alert(index) ;
                                                                 // arrselectkong=index;
                                                               // alert(indexchoose);
                                                               allescorts_id+=bat["carAry"][indexchoose].ESCORTS_ID+',';
                                                               }
                                                        });
                                                     
                                                    // }//for循环
                                                 // }//else
                                                allescorts_id=allescorts_id.substring(0,allescorts_id.length-1);
                                                // alert(allescorts_id);
                                                // $('html').text(allescorts_id);
                                                          // return
                                                        var PAYED_ESCORTS_ID=allescorts_id; 
                                                        location.href='../conment/payMethodpage.html?ORDERCODE=' + ORDERCODE + '&REALMONEY=' + (30*inplength)*100 + '&STATE='+GetQueryString('STATE')+'&payinterview=1'+'&PAYED_ESCORTS_ID='+PAYED_ESCORTS_ID+'&APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID');
                                                        isPay=false;
                                                    })//面试支付按钮结束
                                    // }
                                });//打开底部支付内容
                              $('.closepaybtn').on('touchend',function(){
                                 allescorts_id='';//批量选择月嫂id
                                 $('.blockzhezhao,.zhezhaocontain2').hide();
                                 window.location.reload();
                              })
                              //打开底部支付内容结束
                            //点击可以批量选择
                            $('.mareselect').on('touchend',function(){
                                  $('.yesaonames').toggleClass('yesaonamesshow');
                                  $('.mareselect').toggleClass('mareselects');
                                  $('.choosemore').toggleClass('choosemoreshow');
                                  $('.mareselect').text('批量面试');
                                  $('.mareselects').text('取消多选');
                                  //点击多选按钮图片改变
                                  if( $('.choosemore').length!=0){
                                      $('.choosemore').on('touchend',function(event){
                                                  event.stopPropagation();
                                                  // console.log($(this).index('.choosemore'));
                                                  var index=$(this).index('.choosemore');
                                                  // console.log($('.choosemoreimg').eq(index).attr("src"));
                                                   if($('.choosemoreimg').eq(index).attr("src")=='../../img/monthmatron/select.png'){
                                                      // console.log(111);
                                                      $('.choosemoreimg').eq(index).attr('src','../../img/monthmatron/noselect.png');
                                                   }
                                                   else if($('.choosemoreimg').eq(index).attr("src")=='../../img/monthmatron/noselect.png'){
                                                      // console.log(222);
                                                      $('.choosemoreimg').eq(index).attr('src','../../img/monthmatron/select.png');
                                                   }
                                      })
                                   }
                                   // console.log($('.videointerview').length);
                                  for(j=0;j<$('.videointerview').length;j++){
                                      if($('.videointerview').eq(j).html()=='<span style="margin-top:.9rem">视频</span>'){
                                        $('.choosemore').eq(j).hide();
                                        $('.yesaonames').eq(j).hide();
                                      }
                                   }
                                   //判断是否有多选按钮 有就显示支付按钮
                                    if($(".choosemoreshow").length>0){
                                         $('.paybtn').show();
                                     }else{
                                       $('.paybtn').hide();
                                     }
                              });
                              //点击可以批量选择结束
                             //购物车飞入特效
                            //购物车飞入状态开始
                           var offset = $(".header-top").offset(); 
                            $(".choosemore").click(function(event){ 
                               if($(this).is(':checked')){
                                  if($('.u-flyer')){
                                    $('.u-flyer').remove();
                                  }
                                  console.log((document.documentElement.clientWidth/375));
                                  console.log(offset.top);
                                    var addcar = $(this); 
                                    // var img = addcar.parent().parent().parent().find('.shopimg img').attr('src'); 
                                    var img = addcar.parents('.yuesaomain').find('.selectimg').attr('src'); 
                                            console.log(event.pageX,event.pageY);
                                            console.log(img);
                                            console.log(addcar.parents('.yuesaomain'));
                                            console.log(addcar.parents('.yuesaomain').find('.selectimg'));
                                    // console.log(addcar.parent().parent().parent().find('.shopimg img').attr('src'));
                                    var flyer = $('<img class="u-flyer" src="'+img+'" style="z-index:1000000">'); 
                                    var scrollTop;
                                    // $(window).scroll(function() { 
                                            scrollTop=$(window).scrollTop(); 
                                            // alert(document.documentElement.clientWidth);
                                        // });
                                    flyer.fly({ 
                                        start: { 
                                            left: event.pageX, //开始位置（必填）#fly元素会被设置成position: fixed 
                                            top: event.pageY-scrollTop//开始位置（必填） 
                                        },
                                        end: { 
                                           left: document.documentElement.clientWidth-30, //结束位置（必填） 
                                            top: offset.top+20, //结束位置（必填） //结束位置（必填） 
                                            width: 0, //结束时宽度 
                                            height: 0 //结束时高度 
                                        }, 
                                        onEnd: function(){ //结束回调 
                                            // $("#msg").text('已选中').show().animate({width: '10rem'}, 200).fadeOut(1000); //提示信息 
                                            // addcar.css("cursor","default").removeClass('orange').unbind('click'); 
                                            // $('.u-flyer').destroy(); //移除dom 
                                        } 
                                    }); 
                                  }
                                  else{
                                    // $("#msg").text('取消选中').show().animate({width: '10rem'}, 200).fadeOut(1000); //提示信息 
                                  }
                                }); 
                                //购物车飞入状态结束
                                 //cart endfly
                      }
                    //ajax成功的回调函数结束
              })//ajax结束
        ///
   }
      
    // }
    //
})