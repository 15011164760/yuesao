
 function  startinterview(hsname,hspasssword,hname,img){
                              // alert('startinterview触发成功啦');
                              window.jsi.startinterview(hsname,hspasssword,hname,img);
                            }
function goToOrderPage(){};
function goBack(){};
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
// alert(JianKang.TOKEN_ID);
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
     if(ua.match(/MicroMessenger/i)=="micromessenger") {
           $('.backup img').hide();
        }
    //点击跳转上个页面
    $('.backup').on('touchend',function(){
         // alert(111);
         // window.location.href="../conment/orderList.html";
         if (/android/.test(ua)) {
            // window.jsi.goBack();
            window.jsi.goToOrderPage();
        }else if (/iphone|ipad|ipod/.test(ua)) {
             // window.location.href="../conment/orderList.html";
            // alert(22);
            // goToOrderPage();
            goBack();
        };
      });
    // 新加
        var nowdate;
        var nowdateyear;
        var nowdatemonth;
        var nowdatedate;
        var daycycle;
        var APPLYMATRONLIST_ID=GetQueryString('APPLYMATRONLIST_ID')
      function kaishi(nowdate){
        var oldTime = (new Date(nowdate.replace(/-/g,'/'))).getTime(); //开始时间得到毫秒数
        var myoldTime =new Date(oldTime);
        return myoldTime      
      }
      // 新加结束
      //点击跳转候选人
    localStorage.removeItem('orderstatus');
    localStorage.removeItem('interview');
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
                      $('.ordercode').text(msg.pd.ORDERCODE);
                      $('.detailbtn').on('touchend',function(){
                          location.href='orderdetails.html?APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID');
                      })
                          //点击取消订单的时候向后台传递状态码和订单码
                      $('.cancellist').on('touchend',function(){
                        // alert(111);
                        //4.取消订单
                            new TipBox({type:'cancelOrder',iconStr:'取消订单',colorType:'month',str:"<p class='thirtySix animateA'><span>您确定取消订单吗？</span></p><p class='thirtySix animateB'><span>您的订单已取消成功！</span></p>",Ok:'确定',hasBtn:true,callBack:function(){
                               var userorderlist={
                                                  "ORDERCODE":msg.pd.ORDERCODE,
                                                  "STATE":9
                                                  }
                              //ajax请求开始取消
                                    $.ajax({
                                               type: 'POST',
                                               headers: {'hx_token':JianKang.TOKEN_ID},
                                               // url:'/appuser/Shop/GetMyShoppingOrderList',
                                               url:'/appuser/OrderList/cancelOrder?APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID'),
                                               // dataType:'json',
                                               data: userorderlist,//要发送的数据（参数）
                                               success:function(data){
                                                  console.log(data);
                                                  // alert(data.message);
                                                  location.href="cancel.html?APPLYMATRONLIST_ID="+GetQueryString('APPLYMATRONLIST_ID');
                                                }
                                        })
                              //ajax请取消结束
                            }});
                         })   //点击取消订单的时候向后台传递状态码和订单码结束
                         //超时取消时间
                         //
                          ////从下单页过来得到的数据  推荐列表增加的数据
                   $.ajax({
                                 type: 'GET',
                                 headers: {'hx_token': JianKang.TOKEN_ID},
                                 // url:'/appuser/Shop/GetMyShoppingOrderList',
                                 url:'/appuser/Matron/GetEscortsMatronList?APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID'),
                                 // dataType:'json',
                                 data: GetQueryString('APPLYMATRONLIST_ID'),//要发送的数据（参数）
                                 success:function(msg){
                                  // alert(JSON.stringify(msg));
                                     // $.ajax({//这个是面试支付的接口
                                     //       type: 'GET',
                                     //       headers: {'hx_token': JianKang.TOKEN_ID},
                                     //       url:'/appuser/Matron/getPayMatronForInterviewList',
                                     //       success:function(getpay){
                                              // alert(JSON.stringify(getpay));
                                           //看是否支付存在 如果存在走这个
                                        var str='';
                                       // 有支付的就走这个
                                       // if(getpay.pd.length>0){
                                       //       // var controls=false;
                                       //                var payarr=[];
                                       //                // var newpayarr=payarr;
                                       //        for(i=0;i<msg.pd.length;i++){
                                       //               for(j=0;j<getpay.pd.length;j++){//已经支付
                                       //                    if(msg.pd[i].ESCORTS_ID==getpay.pd[j].ESCORTS_ID){
                                       //                      payarr.push(getpay.pd[j].ESCORTS_ID);
                                       //                    }
                                       //                   }//判断支付的for循环
                                       //                   // alert(payarr.length);
                                       //                 if(payarr.indexOf(msg.pd[i].ESCORTS_ID)!=-1){
                                       //                    str+='<div class="yuesaomain"><div><img src="/uploadFiles/uploadImgs/'+msg.pd[i].IMGURL+'" alt="" class="selectimg"></div>'
                                       //                    str+='<div><ul><li class="yesaoname"><span class="yesaonames"><img src="../../img/monthmatron/noselect.png" alt="" class="choosemoreimg">'
                                       //                    str+='<input type="checkbox" class="choosemore orange"></span><span>'+msg.pd[i].ESCORTNAME+'</span><span>面试中</span>'
                                       //                    str+='</li><li>月嫂&nbsp;&nbsp;/&nbsp;&nbsp;'+msg.pd[i].NATIVEPLACE+'人士&nbsp;&nbsp;/&nbsp;&nbsp;'+msg.pd[i].SERVICEYEAR+'年服务经验</li>'
                                       //                    str+='<li class="yuesaoprice"><span>￥</span><span>'+msg.pd[i].VALUE+'</span> <span><img src="../../img/monthmatron/slash.png" alt=""></span>'
                                       //                    str+='<span>26天</span><span class="videointerview"><span style="margin-top:.9rem">视频</span></span><span class="wantorder"><span>预约</span></span></li></ul></div> </div>'
                                       //                    // if((msg.pd[i].IMGURL)==''){
                                       //                    //   alert(11);
                                       //                    //     $('.yuesaomain').find('img').attr('src','../../img/monthmatron/teacherimgbg.png');
                                       //                    // }
                                       //                 }
                                       //                else   //没有支付
                                       //                {
                                       //                  str+='<div class="yuesaomain"><div><img src="/uploadFiles/uploadImgs/'+msg.pd[i].IMGURL+'" alt="" class="selectimg"></div>'
                                       //                  str+='<div><ul><li class="yesaoname"><span class="yesaonames"><img src="../../img/monthmatron/noselect.png" alt="" class="choosemoreimg">'
                                       //                  str+='<input type="checkbox" class="choosemore orange"></span><span>'+msg.pd[i].ESCORTNAME+'</span>'
                                       //                  str+='</li><li>月嫂&nbsp;&nbsp;/&nbsp;&nbsp;'+msg.pd[i].NATIVEPLACE+'人士&nbsp;&nbsp;/&nbsp;&nbsp;'+msg.pd[i].SERVICEYEAR+'年服务经验</li>'
                                       //                  str+='<li class="yuesaoprice"><span>￥</span><span>'+msg.pd[i].VALUE+'</span> <span><img src="../../img/monthmatron/slash.png" alt=""></span>'
                                       //                  str+='<span>26天</span><span class="videointerview"> <span>视频</span> <span>面试</span></span><span class="wantorder"><span>预约</span></span></li></ul></div> </div>'
                                       //                  // if((msg.pd[i].IMGURL)==''){
                                       //                  //       $('.selectimg').eq(i).attr('src','../../img/monthmatron/teacherimgbg.png');
                                       //                  //   }
                                       //                }
                                       //       }//推荐的for循环结束
                                       //  }
                                       // else{ //没有支付getpay.pd长度不会大于0
                                         for(i=0;i<msg.pd.length;i++){
                                             if(msg.pd[i].IMGURL){
                                                str+='<div class="yuesaomain"><div><img src="/uploadFiles/uploadImgs/'+msg.pd[i].IMGURL+'" alt="" class="selectimg"></div>'
                                             }else{
                                                str+='<div class="yuesaomain"><div><img src="../../img/monthmatron/teacherimgbg.png" alt="" class="selectimg"></div>'
                                             }
                                             str+='<div><ul><li class="yesaoname"><span class="yesaonames"><img src="../../img/monthmatron/noselect.png" alt="" class="choosemoreimg">'
                                             str+='<input type="checkbox" class="choosemore orange"></span><span>'+msg.pd[i].ESCORTNAME+'</span>'
                                             str+='</li><li>月嫂&nbsp;&nbsp;/&nbsp;&nbsp;'+msg.pd[i].NATIVEPLACE+'人士&nbsp;&nbsp;/&nbsp;&nbsp;'+msg.pd[i].SERVICEYEAR+'年服务经验</li>'
                                             str+='<li class="yuesaoprice"><span>￥</span><span>'+msg.pd[i].VALUE+'</span> <span><img src="../../img/monthmatron/slash.png" alt=""></span>'
                                             str+='<span>26天</span><span class="videointerview"> <span>视频</span> <span>面试</span></span><span class="wantorder"><span>预约</span></span></li></ul></div> </div>'
                                             // if((msg.pd[i].IMGURL)==''){
                                             //                  $('.selectimg').eq(i).attr('src','../../img/monthmatron/teacherimgbg.png');
                                             //              }
                                         }
                                      // } //没有支付getpay.pd长度不会大于0
                                      // //没支付走这个
                                          $('.yuesaomainout').append(str);
                                          $('.selectimg').attr('src','../../img/monthmatron/teacherimgbg.png')
                                          $('.yuesaomainout>.yuesaomain').eq(0).show();
                                          $('.yuesaomainout>.yuesaomain').eq(1).show();
                                          $('.yuesaomainout>.yuesaomain').eq(2).show();
                                          // $('.yuesaomainout>.yuesaomain').eq(3).show();
                                          // $('.yuesaomainout>.yuesaomain').eq(4).show();
                                          // $('.yuesaomainout>.yuesaomain').eq(5).show();
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
                                           var order=$(this).index();
                                           // location.href='selectdetails.html?selectorder='+JSON.stringify(msg.pd[order]);
                                           // location.href='selectdetails.html?'+order+'='+JSON.stringify(msg.pd[order].ESCORTS_ID);
                                           location.href='selectdetails.html?APPLYMATRONLIST_ID='+APPLYMATRONLIST_ID+'&ESCORTS_ID='+msg.pd[order].ESCORTS_ID;
                                            ismove = false
                                       })
                                    //点击进入详情结束
                                    //进到候选月嫂列表
                                   $('.waitselect').on('touchend',function(){
                                       localStorage.setItem('orderstatus','1');
                                       location.href='recommend.html?APPLYMATRONLIST_ID='+APPLYMATRONLIST_ID+'&recommend=1';
                                    })
                                  //点击多选按钮图片改变结束
                                   //点击视频面试按钮 打开支付内容
                                   var videoindex='';
                                    $('.videointerview').on('touchend',function(event){
                                           // alert();
                                          event.stopPropagation();
                                          videoindex=$(this).index('.videointerview');
                                           if($('.videointerview').eq(videoindex).html()=='<span style="margin-top:.9rem">视频</span>'){
                                              $('.blockzhezhao,.zhezhaocontain').hide();
                                              startinterview(msg.pd[videoindex].HXUSERNAME,msg.pd[videoindex].HXPASSWORD,msg.pd[videoindex].ESCORTNAME,msg.pd[videoindex].IMGURL);
                                            }
                                          else{

                                                  $('.blockzhezhao,.zhezhaocontain').show();
                                                   // 支付完成跳转到候选列表
                                                  $('.submituserinfo').on('touchend',function(){
                                                             // alert('支付');
                                                            var timestamp=new Date().getTime(); 
                                                            var randoms1=Math.floor(Math.random()*100);
                                                            var randoms2=Math.floor(Math.random()*100);
                                                            var randoms3=Math.floor(Math.random()*100);
                                                            var falseordercode=99+timestamp+randoms1+randoms2+randoms3;
                                                            var PAYED_ESCORTS_ID=msg.pd[videoindex].ESCORTS_ID; 
                                                                   //通过缓存存储数据 //加缓存
                                                              var IMGURL= msg.pd[videoindex].IMGURL;  
                                                              var ESCORTNAME= msg.pd[videoindex].ESCORTNAME; 
                                                              var NATIVEPLACE= msg.pd[videoindex].NATIVEPLACE; 
                                                              var SERVICEYEAR= msg.pd[videoindex].SERVICEYEAR;  
                                                              var ESCORTS_ID= msg.pd[videoindex].ESCORTS_ID;  
                                                              var HXUSERNAME= msg.pd[videoindex].HXUSERNAME;  
                                                              var HXPASSWORD= msg.pd[videoindex].HXPASSWORD;  
                                                              var MYLEVEL= msg.pd[videoindex].MYLEVEL; 
                                                              var VALUE= msg.pd[videoindex].VALUE;   
                                                              var bat = {"VALUE":VALUE,"MYLEVEL":MYLEVEL,"HXUSERNAME":HXUSERNAME,"HXPASSWORD":HXPASSWORD,"IMGURL":IMGURL,"ESCORTNAME":ESCORTNAME,"NATIVEPLACE":NATIVEPLACE,"SERVICEYEAR":SERVICEYEAR,"ESCORTS_ID":ESCORTS_ID,"data-id":APPLYMATRONLIST_ID};
                                                               var batString = JSON.stringify(bat);
                                                               console.log(batString);
                                                               var keyName = "bat" + ESCORTS_ID;
                                                                for (var i = 0; i < localStorage.length; i++) {
                                                                    if (localStorage.key(i) == keyName) {
                                                                        localStorage.removeItem(keyName);
                                                                    }
                                                                }
                                                            localStorage.setItem("bat"+ESCORTS_ID, batString);
                                                            location.href='../conment/payMethodpage.html?ORDERCODE=' + msg.odpd.ORDERCODE + '&REALMONEY=' + 30*100 + '&STATE='+msg.odpd.STATE+'&payinterview=1'+'&PAYED_ESCORTS_ID='+PAYED_ESCORTS_ID+'&APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID');
                                                  })//支付按钮结束
                                                //关闭支付弹窗
                                                $('.closepaybtn').on('touchend',function(){
                                                     $('.blockzhezhao,.zhezhaocontain').hide();
                                                  })
                                                //关闭支付弹窗
                                          }
                                      });
                                    //点击视频面试按钮 打开支付内容结束
                                    //
                                     //点击预约按钮开始
                                      $('.wantorder').on('touchend',function(event){   
                                          // alert('电话号码是'+msg.pd[videoindex].PHONENUMBER); 
                                            var wantorder=$(this).index('.wantorder');
                                           // alert('msg.pd[wantorder].MYLEVEL'+msg.pd[wantorder].MYLEVEL);
                                            event.stopPropagation();
                                            $('.blockzhezhao,.zhezhaocontain2').show();
                                             //close预约
                                            $('.yuesaoorderclose').on('touchend',function(){
                                                     $('.blockzhezhao,.zhezhaocontain2').hide();
                                                })
                                            //close预约结束
                                            //ajax请求开始
                                            $.ajax({
                                               type: 'GET',
                                               headers: {'hx_token': JianKang.TOKEN_ID},
                                               // 获取月嫂订单的信息
                                               url:'/appuser/Matron/GetApplyMatronByID?APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID'),
                                               success:function(datalist){
                                                    $('.yuesaoname').text('服务人员：'+msg.pd[wantorder].ESCORTNAME);
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
                                                       $('.duringdate').text('锁定服务等待时段：'+formatDate(beforestartTime)+'~'+formatDate(afterstartTime));
                                                      // 提交按钮
                                                      var userdata={
                                                        "ESCORTS_ID":msg.pd[wantorder].ESCORTS_ID
                                                      };
                                                       
                                                   $.ajax({
                                                           type: 'GET',
                                                           headers: {'hx_token':JianKang.TOKEN_ID},
                                                           url:'/appuser/Hospital/GetEscortInfoByEscortsId?ESCORTS_ID='+msg.pd[wantorder].ESCORTS_ID,
                                                           success:function(pricedata){
                                                            // alert(222);
                                                            // alert(JSON.stringify(pricedata));
                                                           var DEPOSIT;
                                                           daycycle=datalist.pd.SERVICECYCLE;
                                                           nowdate=datalist.pd.DUEDATE;// (new Date((datalist.pd.DUEDATE).replace(/-/g,'/')))
                                                           nowdateyear=kaishi(nowdate).getFullYear();
                                                           nowdatemonth=kaishi(nowdate).getMonth();
                                                           nowdatedate=kaishi(nowdate).getDate();
                                                                 //看有几天是节假日 3倍
                                                                 $.ajax({
                                                                    url:'http://www.easybots.cn/api/holiday.php?d='+getAll(nowdate, transferCouponValueTime(nowdateyear,nowdatemonth+1,nowdatedate,daycycle))+'&ak=k381.659a5150a2e8efcd53b75a423e263997@jkzdw.com',
                                                                    type:'GET',
                                                                    success:function(data){
                                                                        // alert(data);
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
                                                                          $('#orderprice').text('预定费:'+returnFloat(DEPOSIT)+'元');
                                                                     }
                                                                   }) //看有几天是节假日 3倍
                                                               //
                                                                        $('.submituserinfo2').on('touchend',function(){
                                                                          // var timestamp=new Date().getTime(); 
                                                                          // var randoms1=Math.floor(Math.random()*100);
                                                                          // var randoms2=Math.floor(Math.random()*100);
                                                                          // var randoms3=Math.floor(Math.random()*100);
                                                                          // var falseordercode=99+timestamp+randoms1+randoms2+randoms3;
                                                                          // var PAYED_ESCORTS_ID=msg.pd[wantorder].ESCORTS_ID; 
                                                                                // 传递一个护工的id告诉他是选的那个 在订单上显示
                                                                                $.ajax({
                                                                                           type: 'POST',
                                                                                           headers: {'hx_token': JianKang.TOKEN_ID},
                                                                                           data: userdata,//要发送的数据（参数）
                                                                                           url:'/appuser/Matron/updateApplyMatron?APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID'),
                                                                                           success:function(adddata){
                                                                                             // alert('adddata的值是'+adddata);
                                                                                            location.href='../conment/payMethodpage.html?ORDERCODE=' + datalist.pd.ORDERCODE + '&REALMONEY=' + DEPOSIT*100 + '&payorder=1&APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID')+'&ESCORTS_ID='+msg.pd[wantorder].ESCORTS_ID;
                                                                                            }
                                                                                })
                                                                               
                                                                      }) // 提交按钮结束
                                                                  }//success
                                                                })//ajax请求开始价格计算
                                                   }
                                              })
                                        })
                                //预约结束
                           
                                 //    }//支付过的面试接口成功的回调函数
                                 // })//支付过的面试接口结束
                               }
                                 //成功之后回调函数结束
                           })
                      //发送ajax结束  推荐列表的结束
                }
             })
     //ajax请求开始 得到下单者键值结束
})
// 、、、kaihis
          // alert(GetQueryString('APPLYMATRONLIST_ID'));
     // var APPLYMATRONLIST_ID =GetQueryString('APPLYMATRONLIST_ID');
                  //设置缓存 补全信息时候用 
                