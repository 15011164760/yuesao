 function  startinterview(hsname,hspasssword,hname,img){
                              // alert('startinterview触发成功啦');
                              window.jsi.startinterview(hsname,hspasssword,hname,img);
                            }
function goToOrderPage(){};
function goBack(){};
                            // alert(1);
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
      var ua = navigator.userAgent.toLowerCase();
//     //判断是否登录结束
    //点击跳转上个页面
    $('.backup').on('touchend',function(){
          if(localStorage.getItem('orderstatus')){
            localStorage.removeItem('orderstatus');
              location.href='orderstatus.html?APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID');
          }else if(localStorage.getItem('interview')){
                localStorage.removeItem('interview');
              location.href='interview.html?APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID');
          }
          else{
            location.href='monthmatron.html';
          }
      });
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
          $('.serve-num').text(bat["carAry"].length);
          // alert(GetQueryString('APPLYMATRONLIST_ID'));
     var APPLYMATRONLIST_ID =GetQueryString('APPLYMATRONLIST_ID');
                  //设置缓存 补全信息时候用 
                 ////从下单页过来得到的数据
                   $.ajax({
                                 type: 'GET',
                                 headers: {'hx_token': JianKang.TOKEN_ID},
                                 // url:'/appuser/Shop/GetMyShoppingOrderList',
                                 url:'/appuser/Matron/GetEscortsMatronList?APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID'),
                                 // dataType:'json',
                                 data: GetQueryString('APPLYMATRONLIST_ID'),//要发送的数据（参数）
                                 success:function(msg){
                                     // $('html').append(GetQueryString('APPLYMATRONLIST_ID'));
                                     // $('html').append(JSON.stringify(msg));
                                    // alert(JSON.stringify(msg));
                                    // alert(JianKang.TOKEN_ID);
                                    // alert(GetQueryString('APPLYMATRONLIST_ID'));
                                    // alert(msg.odpd.ORDERCODE);
                                    // $('body').text(JSON.stringify(msg.pd[23]));
                                     $.ajax({//这个是面试支付的接口
                                           type: 'GET',
                                           headers: {'hx_token': JianKang.TOKEN_ID},
                                           url:'/appuser/Matron/getPayMatronForInterviewList?ORDERCODE='+msg.odpd.ORDERCODE,
                                           // data:,//要发送的数据（参数）
                                           success:function(getpay){
                                              // alert(JSON.stringify(getpay));
                                           //看是否支付存在 如果存在走这个
                                        var str='';
                                       // 有支付的就走这个
                                       if(getpay.pd.length>0){
                                             // alert('支付过面试费用的');
                                                      var payarr=[];
                                                      // var newpayarr=payarr;
                                              for(i=0;i<msg.pd.length;i++){
                                                     for(j=0;j<getpay.pd.length;j++){//已经支付
                                                          if(msg.pd[i].ESCORTS_ID==getpay.pd[j].ESCORTS_ID){
                                                            payarr.push(getpay.pd[j].ESCORTS_ID);
                                                          }
                                                         }//判断支付的for循环
                                                         // alert(getpay.pd.length);
                                                       if(payarr.indexOf(msg.pd[i].ESCORTS_ID)!=-1){
                                                          // alert('得到已经面试费用的');
                                                           if(msg.pd[i].IMGURL){
                                                              str+='<div class="yuesaomain"><div><img src="/uploadFiles/uploadImgs/'+msg.pd[i].IMGURL+'" alt="" class="selectimg"></div>'
                                                           }else{
                                                              str+='<div class="yuesaomain"><div><img src="../../img/monthmatron/teacherimgbg.png" alt="" class="selectimg"></div>'
                                                           }
                                                          // str+='<div class="yuesaomain"><div><img src="/uploadFiles/uploadImgs/'+msg.pd[i].IMGURL+'" alt="" class="selectimg"></div>'
                                                          str+='<div><ul><li class="yesaoname"><span class="yesaonames"><img src="../../img/monthmatron/noselect.png" alt="" class="choosemoreimg">'
                                                          str+='<input type="checkbox" class="choosemore orange"></span><span>'+msg.pd[i].ESCORTNAME+'</span><span>面试中</span>'
                                                          str+='</li><li>月嫂&nbsp;&nbsp;/&nbsp;&nbsp;'+msg.pd[i].NATIVEPLACE+'人士&nbsp;&nbsp;/&nbsp;&nbsp;'+msg.pd[i].SERVICEYEAR+'年服务经验</li>'
                                                          str+='<li class="yuesaoprice"><span>￥</span><span>'+msg.pd[i].VALUE+'</span> <span><img src="../../img/monthmatron/slash.png" alt=""></span>'
                                                          str+='<span>26天</span><span class="videointerview"><span style="margin-top:.9rem">视频</span></span><span class="wantorder"><span>预约</span></span></li></ul></div> </div>'
                                                       }
                                                      else   //没有支付
                                                       {
                                                         // alert('得到没面试费用的');
                                                        if(msg.pd[i].IMGURL){
                                                            str+='<div class="yuesaomain"><div><img src="/uploadFiles/uploadImgs/'+msg.pd[i].IMGURL+'" alt="" class="selectimg"></div>'
                                                         }else{
                                                            str+='<div class="yuesaomain"><div><img src="../../img/monthmatron/teacherimgbg.png" alt="" class="selectimg"></div>'
                                                         }
                                                        // str+='<div class="yuesaomain"><div><img src="/uploadFiles/uploadImgs/'+msg.pd[i].IMGURL+'" alt="" class="selectimg"></div>'
                                                        str+='<div><ul><li class="yesaoname"><span class="yesaonames"><img src="../../img/monthmatron/noselect.png" alt="" class="choosemoreimg">'
                                                        str+='<input type="checkbox" class="choosemore orange"></span><span>'+msg.pd[i].ESCORTNAME+'</span>'
                                                        str+='</li><li>月嫂&nbsp;&nbsp;/&nbsp;&nbsp;'+msg.pd[i].NATIVEPLACE+'人士&nbsp;&nbsp;/&nbsp;&nbsp;'+msg.pd[i].SERVICEYEAR+'年服务经验</li>'
                                                        str+='<li class="yuesaoprice"><span>￥</span><span>'+msg.pd[i].VALUE+'</span> <span><img src="../../img/monthmatron/slash.png" alt=""></span>'
                                                        str+='<span>26天</span><span class="videointerview"> <span>视频</span> <span>面试</span></span><span class="wantorder"><span>预约</span></span></li></ul></div> </div>'
                                                      }
                                             }//推荐的for循环结束
                                        }
                                       else{ //没有支付getpay.pd长度不会大于0
                                         for(i=0;i<msg.pd.length;i++){
                                             if(msg.pd[i].IMGURL){
                                                str+='<div class="yuesaomain"><div><img src="/uploadFiles/uploadImgs/'+msg.pd[i].IMGURL+'" alt="" class="selectimg"></div>'
                                             }else{
                                                str+='<div class="yuesaomain"><div><img src="../../img/monthmatron/teacherimgbg.png" alt="" class="selectimg"></div>'
                                             }
                                             // str+='<div class="yuesaomain"><div><img src="/uploadFiles/uploadImgs/'+msg.pd[i].IMGURL+'" alt="" class="selectimg"></div>'
                                             str+='<div><ul><li class="yesaoname"><span class="yesaonames"><img src="../../img/monthmatron/noselect.png" alt="" class="choosemoreimg">'
                                             str+='<input type="checkbox" class="choosemore orange"></span><span>'+msg.pd[i].ESCORTNAME+'</span>'
                                             str+='</li><li>月嫂&nbsp;&nbsp;/&nbsp;&nbsp;'+msg.pd[i].NATIVEPLACE+'人士&nbsp;&nbsp;/&nbsp;&nbsp;'+msg.pd[i].SERVICEYEAR+'年服务经验</li>'
                                             str+='<li class="yuesaoprice"><span>￥</span><span>'+msg.pd[i].VALUE+'</span> <span><img src="../../img/monthmatron/slash.png" alt=""></span>'
                                             str+='<span>26天</span><span class="videointerview"> <span>视频</span> <span>面试</span></span><span class="wantorder"><span>预约</span></span></li></ul></div> </div>'
                                         }
                                      } //没有支付getpay.pd长度不会大于0
                                      // //没支付走这个
                                          $('.yuesaomainout').append(str);
                                          $('.selectimg').attr('src','../../img/monthmatron/teacherimgbg.png');
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
                                           location.href='selectdetails.html?APPLYMATRONLIST_ID='+APPLYMATRONLIST_ID+'&ESCORTS_ID='+msg.pd[order].ESCORTS_ID+'&recommend=1';
                                            ismove = false
                                       })
                                    //点击进入详情结束
                                  //点击多选按钮图片改变 
                                  // var index=$(this).index();
                                  // var numbers=0;
                                  //点击的月嫂序号数组，点击哪个就加哪个的序号
                                  var yuesaoarr=[];
                                  $('.choosemore').on('touchend',function(event){
                                               event.stopPropagation();
                                             //如果点击多选按钮就清除之前在详情中已经加入的缓存
                                             // localStorage.removeItem('selectdetails');
                                              var index=$(this).index('.choosemore');
                                              // alert(JSON.stringify(msg.pd[index].VALUE));
                                              // console.log($('.choosemoreimg').eq(index).attr("src"));
                                               if($('.choosemoreimg').eq(index).attr("src")=='../../img/monthmatron/select.png'){
                                                  $('.choosemoreimg').eq(index).attr('src','../../img/monthmatron/noselect.png');
                                                  // numbers--;
                                                  // if(numbers<=0){
                                                  //   numbers=0;
                                                  // }
                                                 // $('.serve-num').text(numbers);
                                                 // $('.serve-num').text(nub);
                                               }
                                               else if($('.choosemoreimg').eq(index).attr("src")=='../../img/monthmatron/noselect.png'){
                                                  $('.serve-num').text($(":checked").length);
                                                  $('.choosemoreimg').eq(index).attr('src','../../img/monthmatron/select.png');
                                                 // console.log($(":checked").length) ;
                                                  // numbers++;
                                                  // $('.serve-num').text(numbers);
                                               }
                                             //点击选中
                                               if(!$(this).is(':checked')){
                                                  // console.log(index);
                                                  // yuesaoarr.push(index);
                                                          //通过缓存存储数据 //加缓存
                                                    var IMGURL= msg.pd[index].IMGURL;  
                                                    var ESCORTNAME= msg.pd[index].ESCORTNAME; 
                                                    var NATIVEPLACE= msg.pd[index].NATIVEPLACE; 
                                                    var SERVICEYEAR= msg.pd[index].SERVICEYEAR;  
                                                    var ESCORTS_ID= msg.pd[index].ESCORTS_ID;  
                                                    var HXUSERNAME= msg.pd[index].HXUSERNAME;  
                                                    var HXPASSWORD= msg.pd[index].HXPASSWORD;  
                                                    var MYLEVEL= msg.pd[index].MYLEVEL;  
                                                    var VALUE= msg.pd[index].VALUE;  
                                                    var bat = {'VALUE':VALUE,"MYLEVEL":MYLEVEL,"HXUSERNAME":HXUSERNAME,"HXPASSWORD":HXPASSWORD,"IMGURL":IMGURL,"ESCORTNAME":ESCORTNAME,"NATIVEPLACE":NATIVEPLACE,"SERVICEYEAR":SERVICEYEAR,"ESCORTS_ID":ESCORTS_ID,"data-id":APPLYMATRONLIST_ID};
                                                     var batString = JSON.stringify(bat);
                                                     console.log(batString);
                                                     // var keyName = "bat" + index;
                                                     var keyName = "bat"+ GetQueryString('APPLYMATRONLIST_ID')+ ESCORTS_ID;
                                                      for (var i = 0; i < localStorage.length; i++) {
                                                          if (localStorage.key(i) == keyName) {
                                                              localStorage.removeItem(keyName);
                                                              localStorage.removeItem(localStorage.key(i));
                                                          }
                                                      }
                                                      localStorage.setItem("bat"+GetQueryString('APPLYMATRONLIST_ID')+ESCORTS_ID, batString);
                                                      //设置加缓存结束
                                                      //开始得到缓存
                                                      // var carAry=new Array();
                                                      //     for (var i = 0; i < localStorage.length; i++) {
                                                      //         var key = localStorage.key(i);
                                                      //         console.log(key);
                                                      //         var localValue = localStorage.getItem(key);
                                                      //         console.log(localValue);
                                                      //         if (key != "bat"&&key.indexOf("bat")>=0) {
                                                      //             var obj = $.parseJSON(localValue);
                                                      //             carAry.push(obj);
                                                      //         }
                                                      //     }
                                                      //   var bat = { "carAry": carAry };
                                                      //   console.log(bat["carAry"]);
                                                      //   console.log(bat["carAry"].length);
                                                      //结束得到
                                               }
                                               //点击取消
                                               else if($(this).is(':checked')){
                                                  //取消时候清除上次选中的那个缓存数据
                                                  // for(j=0;j<yuesaoarr.length;j++){
                                                  //       if(yuesaoarr[j]==index){
                                                  //           yuesaoarr.splice(j, 1);
                                                  //       }
                                                  // }
                                                  //获取所有缓存并且遍历这个缓存
                                                     //开始得到缓存
                                                      // var carAry=new Array();
                                                         var ESCORTS_ID= msg.pd[index].ESCORTS_ID;
                                                          for (var i = 0; i < localStorage.length; i++) {
                                                              var key = localStorage.key(i);
                                                              console.log(key);
                                                                if (localStorage.key(i).indexOf('bat'+GetQueryString('APPLYMATRONLIST_ID'))>=0) {
                                                                  // if(localStorage.key(i).substring(key.length-1)==index){
                                                                  if(localStorage.key(i)=='bat'+GetQueryString('APPLYMATRONLIST_ID')+ESCORTS_ID){
                                                                   // localStorage.removeItem(localStorage.key(i));
                                                                    localStorage.removeItem('bat'+GetQueryString('APPLYMATRONLIST_ID')+ESCORTS_ID);
                                                                  }
                                                                }
                                                          }
                                                      //结束得到
                                                  //没选中时候就删除当前的缓存数据
                                               }
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
                                                    $('.serve-num').text(bat["carAry"].length);
                                     })
                                    //进到候选月嫂列表
                                   $('.gotowaitselect').on('touchend',function(){
                                       location.href='waitselect.html?APPLYMATRONLIST_ID='+APPLYMATRONLIST_ID+'&recommend=1';
                                    })
                                  //点击多选按钮图片改变结束
                                   //点击视频面试按钮 打开支付内容
                                   var videoindex='';
                                    $('.videointerview').on('touchend',function(event){
                                           // alert(111);
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
                                                               var keyName = "bat" +GetQueryString('APPLYMATRONLIST_ID')+ ESCORTS_ID;
                                                                for (var i = 0; i < localStorage.length; i++) {
                                                                    if (localStorage.key(i) == keyName) {
                                                                        localStorage.removeItem(keyName);
                                                                    }
                                                                }
                                                              localStorage.setItem("bat"+GetQueryString('APPLYMATRONLIST_ID')+ESCORTS_ID, batString);
                                                            location.href='../conment/payMethodpage.html?ORDERCODE=' + msg.odpd.ORDERCODE + '&REALMONEY=' + 30*100 + '&payinterview=1'+'&PAYED_ESCORTS_ID='+PAYED_ESCORTS_ID+'&APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID');
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
                                            var wantorder=$(this).index('.wantorder');
                                          // alert(msg.pd[wantorder].ESCORTS_ID); 
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
                                                     // pricedata.pd.VALUE
                                                     // alert('gdsfdf');
                                                    // alert('JSON.stringify(datalist.pd.SERVICECYCLE)='+JSON.stringify(datalist.pd.SERVICECYCLE));
                                                    //appuser/Matron/getMatronPrice
                                                    $('.yuesaoname').text('服务人员：'+msg.pd[wantorder].ESCORTNAME);
                                                    $('.borndate').text('预产期：'+datalist.pd.DUEDATE);
                                                     var startTime = (new Date((datalist.pd.DUEDATE).replace(/-/g,'/'))).getTime();//毫秒数
                                                     var afterstartTime=new Date(startTime+15*24*60*60*1000);//普通时间加上天数就是新的日期的毫秒数
                                                     var beforestartTime=new Date(startTime-15*24*60*60*1000);//普通时间减去天数就是新的日期的毫秒数
                                                     // alert(startTime);
                                                     // alert(datalist.pd.DUEDATE);
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
                                                          // $('#orderprice').text('预定费:222222');
                                                           // alert(getAll(nowdate, transferCouponValueTime(nowdateyear,nowdatemonth+1,nowdatedate,daycycle)));
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
                                                                           // $('.orderrestmoney').text('￥'+returnFloat(orderrestmoney-orderrestmoney*(30/100)));
                                                                           // alert('结束时间'+transferCouponValueTime(nowdateyear,nowdatemonth+1,nowdatedate,daycycle));
                                                                          $('#orderprice').text('预定费:'+returnFloat(DEPOSIT)+'元');
                                                                          // $('#orderprice').text('预定费:11');
                                                                          // alert(DEPOSIT);
                                                                     }
                                                                   }) //看有几天是节假日 3倍
                                                               //
                                                                            // DEPOSIT=(pricedata.pd.VALUE/26)*datalist.pd.SERVICECYCLE*(30/100);
                                                                        $('.submituserinfo2').on('touchend',function(){
                                                                         // alert(DEPOSIT);
                                                                          // alert(msg.pd[wantorder].ESCORTS_ID);
                                                                          // alert(msg.pd[wantorder].MYLEVEL);
                                                                          var timestamp=new Date().getTime(); 
                                                                          var randoms1=Math.floor(Math.random()*100);
                                                                          var randoms2=Math.floor(Math.random()*100);
                                                                          var randoms3=Math.floor(Math.random()*100);
                                                                          var falseordercode=99+timestamp+randoms1+randoms2+randoms3;
                                                                          // appinterview(falseordercode,30);
                                                                          var PAYED_ESCORTS_ID=msg.pd[wantorder].ESCORTS_ID; 
                                                                                // 传递一个护工的id告诉他是选的那个 在订单上显示
                                                                                $.ajax({
                                                                                           type: 'POST',
                                                                                           headers: {'hx_token': JianKang.TOKEN_ID},
                                                                                           data: userdata,//要发送的数据（参数）
                                                                                           url:'/appuser/Matron/updateApplyMatron?APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID'),
                                                                                           success:function(adddata){
                                                                                             // alert('adddata的值是'+adddata);
                                                                                            location.href='../conment/payMethodpage.html?ORDERCODE=' + datalist.pd.ORDERCODE + '&REALMONEY=' + DEPOSIT*100 + '&STATE='+msg.odpd.STATE+'&payorder=1&APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID')+'&ESCORTS_ID='+msg.pd[wantorder].ESCORTS_ID;
                                                                                              // location.href='waittopay.html?APPLYMATRONLIST_ID='+APPLYMATRONLIST_ID;
                                                                                             // location.href='waittoservice.html?APPLYMATRONLIST_ID='+APPLYMATRONLIST_ID+'&'+'ESCORTS_ID='+msg.pd[wantorder].ESCORTS_ID;
                                                                                            }
                                                                                })
                                                                               
                                                                      }) // 提交按钮结束
                                                                  }//success
                                                                })//ajax请求开始价格计算
                                                   }
                                              })
                                        })
                                //预约结束
                                 //
                                 //购物车飞入特效
                                      //购物车飞入状态开始
                                var offset = $(".m-sidebar").offset(); 
                            $(".choosemore").click(function(event){ 
                               if($(this).is(':checked')){
                                  if($('.u-flyer')){
                                    $('.u-flyer').remove();
                                  }
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
                                            top: offset.top+20, //结束位置（必填） 
                                            width: 0, //结束时宽度 
                                            height: 0 //结束时高度 
                                        }, 
                                        onEnd: function(){ //结束回调 
                                            // $("#msg").text('添加候选成功').show().animate({width: '10rem'}, 200).fadeOut(1000); //提示信息 
                                            // addcar.css("cursor","default").removeClass('orange').unbind('click'); 
                                            // $('.u-flyer').destroy(); //移除dom 
                                        } 
                                    }); 
                                  }
                                  else{
                                    // $("#msg").text('取消候选').show().animate({width: '10rem'}, 200).fadeOut(1000); //提示信息 
                                  }
                                }); 
                                //购物车飞入状态结束
                                 //cart endfly
                                 //
                                    }//支付过的面试接口成功的回调函数
                                 })//支付过的面试接口结束
                               }
                                 //成功之后回调函数结束
                           })
                      //发送ajax结束
})
//      function delectyuesao(){
//                                  var arryuesao=[];//已经预定完了需要删除所有的候选的缓存
//                                   for (var i = 0; i < localStorage.length; i++) {
//                                           key = localStorage.key(i);
//                                           if (key != "bat"&&key.indexOf("bat")>=0) {
//                                              arryuesao.push(key);
//                                           }
//                                       }
//                                       // alert(arryuesao);
//                                       for(j=0;j<arryuesao.length;j++){
//                                               if(arryuesao[j] != "bat"&&arryuesao[j].indexOf("bat")>=0){
//                                                   localStorage.removeItem(arryuesao[j]);
//                                               }
//                                       }
//                             }

// delectyuesao();