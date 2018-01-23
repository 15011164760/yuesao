function goBack(){
  // alert('goBack触发啦');
}
function goToOrderPage(){};
var ua = navigator.userAgent.toLowerCase();
// alert(window.location.search);
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
     if(ua.match(/MicroMessenger/i)=="micromessenger") {
           $('.backup img').hide();
        }
   //点击跳转上个页面
    $('.backup').on('touchend',function(){
               // alert(1111);
               // window.location.href="../conment/orderList.html";
        if (/android/.test(ua)) {
            // window.jsi.goBack();
            window.jsi.goToOrderPage();
        }
        else if (/iphone|ipad|ipod/.test(ua)) {
            goBack();
            // goToOrderPage();
        };
      });
     var textcontent='';
      $('.pagebottombtn').hide();
    // 获取订单的详细信息的接口
    $.ajax({
               type: 'GET',
               headers: {'hx_token': JianKang.TOKEN_ID},
               // url:'/appuser/Shop/GetMyShoppingOrderList',
               url:'/appuser/Matron/GetApplyMatronByID?APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID'),
               // dataType:'json',
               // data: APPLYMATRONLIST_ID,//要发送的数据（参数）
               success:function(msg){
                // alert(JSON.stringify(msg));
                // $('html').append('<div style="height:6rem;width:100%">'+msg.pd.ESCORTS_ID+'</div>');
                  var age = new Date().getFullYear()-msg.pd.IDCARD.substring(6, 10); 
                  $('.ordercode').text('订单编号：'+msg.pd.ORDERCODE);
                  if(msg.pd.SERVICETYPE==2){
                    $('.sickname').html('姓名:<font color="#333">'+msg.pd.SICKNAME+'&nbsp;&nbsp;&nbsp;&nbsp;</font> 年龄：<font color="#333">'+age+'岁</font>&nbsp;&nbsp;服务类型: <font color="#333">月嫂</font>');
                  }else if(msg.pd.SERVICETYPE==3){
                    $('.sickname').html('姓名:<font color="#333">'+msg.pd.SICKNAME+'&nbsp;&nbsp;&nbsp;&nbsp;</font> 年龄：<font color="#333">'+age+'岁</font>&nbsp;&nbsp;服务类型: <font color="#333">育儿嫂</font>');
                  }
                  if(msg.pd.SERVICEBEGINTIME){
                    $('.duedate').html('服务时间：<font color="#333">'+msg.pd.SERVICEBEGINTIME+'</font>');
                  }else{
                    $('.duedate').html('预产期:<font color="#333">'+msg.pd.DUEDATE+'</font>');
                  }
                  $('.idcard').html('身份证号:<font color="#333">'+msg.pd.IDCARD+'</font>');
                  $('.dochospital').html('建档医院：<font color="#333">'+msg.pd.DOCHOSPITAL+'</font>')
                  $('.serviceaddress').html('<p class="usertitle"><span>|</span>服务地址</p><li id="addresss"><span><img src="../../img/monthmatron/addre.png" alt="">&nbsp;'+msg.pd.SERVICEADDRESS+'</span></li>');
                  // $('.escortagerange').html('服务员年龄区间: <font color="#333">'+msg.pd.ESCORTAGERANGE.replace(/,/gm,'-')+'岁</font>');
                  // if(msg.pd.ESCORTAGERANGE==''){
                  //                     $('.escortagerange').html('服务员年龄区间: <font color="#333">不限</font>');
                  if(msg.pd.SERVICETYPE==4){
                      $('.user-info-main-hide').hide();
                  }else{
                    // alert(msg.pd.ESCORTEXPERIENCE);
                      $('.servicecycle').html('服务周期: <font color="#333">'+msg.pd.SERVICECYCLE+'天</font>')
                      //                   }
                      $('.escortcity').html('籍贯优先级: <font color="#333">'+msg.pd.ESCORTCITY+'</font>');
                      if(msg.pd.ESCORTCITY==''){
                        $('.escortcity').html('籍贯优先级: <font color="#333">不限</font>');
                      }
                      $('.escortexperience').html('服务经验:<font color="#333">'+msg.pd.ESCORTEXPERIENCE.replace(/,/gm,'-')+'年以上</font>');
                      if(msg.pd.ESCORTEXPERIENCE==''){
                        $('.escortexperience').html('服务经验:<font color="#333">不限</font>');
                      }else if(msg.pd.ESCORTEXPERIENCE=='2,100'){
                        $('.escortexperience').html('服务经验:<font color="#333">2年以上</font>');
                      }else if(msg.pd.ESCORTEXPERIENCE=='5,100'){
                        $('.escortexperience').html('服务经验:<font color="#333">5年以上</font>');
                      }
                  }
                  // alert()
                  //判断这个订单的状态码显示对应的文字
                    if(msg.pd.STATE==0){
                         $('.orderstatusimg').attr('src','../../img/monthmatron/interviewnow.png');
                         $('.orderstatustext').text('请选择服务人员');
                          // $('.pagebottombtn').hide();
                     }
                     else if(msg.pd.STATE==1){
                          $('.orderstatusimg').attr('src','../../img/monthmatron/interviewnow.png');
                          $('.orderstatustext').text('面试中');
                           // $('.pagebottombtn').hide();
                     }
                     else if(msg.pd.STATE==101){
                         $('.orderstatusimg').attr('src','../../img/monthmatron/haveorder.png');
                         $('.orderstatustext').text('已预约');
                         // $('.pagebottombtn').hide();
                     }
                     else if(msg.pd.STATE==2){
                         $('.orderstatusimg').attr('src','../../img/monthmatron/matron.png');
                         $('.orderstatustext').text('待服务');
                         // $('.pagebottombtn').show();
                         // $('.renewbtn').hide();
                         // $('.refondapplication').css({
                         //   'float':'right'
                         // })
                     }
                      else if(msg.pd.STATE==3){
                         $('.orderstatusimg').attr('src','../../img/monthmatron/matron.png');
                         $('.orderstatustext').text('服务中');
                         // $('.renewbtn').text('');
                         // $('.pagebottombtn').show();
                     }
                     else if(msg.pd.STATE==4){
                         $('.orderstatusimg').attr('src','../../img/monthmatron/refond.png');
                         $('.orderstatustext').text('退款申请中');
                         // $('.pagebottombtn').hide();
                     }
                     else if(msg.pd.STATE==5){
                        $('.orderstatusimg').attr('src','../../img/monthmatron/refond.png');
                        $('.orderstatustext').text('退款中');
                        // $('.pagebottombtn').hide();
                     }
                     else if(msg.pd.STATE==6){
                         $('.orderstatusimg').attr('src','../../img/monthmatron/refondbyusimg.png');
                         $('.orderstatustext').text('退款完成');
                         // $('.pagebottombtn').hide();
                     }
                     else if(msg.pd.STATE==7){
                        $('.orderstatusimg').attr('src','../../img/monthmatron/matron.png');
                        $('.orderstatustext').text('已完成');
                        $('.refondapplication').text('');
                        $('.renewbtn').on('touchend',function(){
                            location.href='monthmatron.html';
                        })
                     }
                     else if(msg.pd.STATE==8){
                        // $('.orderstatusimg').attr('src','../../img/monthmatron/refondbyusimg.png');
                        $('.orderstatusimg').attr('src','../../img/monthmatron/waitpay.png');
                        $('.orderstatustext').text('支付超时取消');
                        // $('.pagebottombtn').hide();
                     }
                     else if(msg.pd.STATE==9){
                        $('.orderstatusimg').attr('src','../../img/monthmatron/waitpay.png');
                        $('.orderstatustext').text('用户取消订单');
                        // $('.pagebottombtn').hide();
                         // location.href='cancel.html?APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID')+'&'+'ESCORTS_ID='+GetQueryString('ESCORTS_ID');
                     } else if(msg.pd.STATE==10){
                        $('.orderstatusimg').attr('src','../../img/monthmatron/waitpay.png');
                        $('.orderstatustext').text('经理取消订单');
                        // $('.pagebottombtn').hide();
                         // location.href='cancel.html?APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID')+'&'+'ESCORTS_ID='+GetQueryString('ESCORTS_ID');
                     }
                  //点击状态的时候判断这个订单的状态码 根据这个状态码调取这个页面的状态
                   //点击跳转进入订单状态
                   // alert(msg.pd.STATE);
                  $('.statusbtn').on('touchend',function(event){
                   event.stopPropagation();
                       // 已经提交
                         if(msg.pd.STATE==0){
                             location.href='orderstatus.html?APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID');
                         }
                         //面试中
                         else if(msg.pd.STATE==1){
                             location.href='interview.html?APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID');
                         }
                         //已经预约
                         else if(msg.pd.STATE==101){
                             location.href='haveorder.html?APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID');
                         }
                         //待服务
                         else if(msg.pd.STATE==2){
                             location.href='waittoservice.html?APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID');
                         }
                         //服务中
                         else if(msg.pd.STATE==3){//3
                             location.href='startstatus.html?APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID');
                         }
                         //退款申请中
                         else if(msg.pd.STATE==4){
                             location.href='refondapplication.html?APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID');
                         }
                         //退款中
                         else if(msg.pd.STATE==5){
                             location.href='refond.html?APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID');
                         }
                         //退款已完成
                         else if(msg.pd.STATE==6){
                             location.href='refonded.html?APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID');
                         }
                         //已完成
                         else if(msg.pd.STATE==7){//7
                             location.href='endstatus.html?APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID');
                         }
                         //用户手动取消
                         else if(msg.pd.STATE==9||msg.pd.STATE==8||msg.pd.STATE==10){
                             location.href='cancel.html?APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID');
                         }
                  });
                      // 0.请选择服务人员
                      // 1.面试中      30
                      // 101.已预约  DEPOSIT//定金
                      // 2.待服务    SECONDMONEY//DEPOSIT+SECONDMONEY//定金+二批款
                      // 3.服务中    DEPOSIT+SECONDMONEY//定金+二批款
                      // 4退款申请中  DEPOSIT+SECONDMONEY//定金+二批款
                      // 5退款中     DEPOSIT+SECONDMONEY//定金+二批款
                      // 6退款完成   DEPOSIT+SECONDMONEY//定金+二批款
                      // 7已完成     DEPOSIT+SECONDMONEY//定金+二批款
                      // 8支付超时取消  不知道
                      // 9用户手动取消   不知道
                      // 10经理手动取消  不知道
                      // 11未受理已取消  不知道
                      // from chuanzan
// <c:if test="${var.STATE==0}"><span class="label label-important arrowed-in">未支付</span></c:if>
//   <c:if test="${var.STATE==1}"><span class="label label-important arrowed-in">面试中</span></c:if>
//   <c:if test="${var.STATE==2}"><span class="label label-important arrowed-in">待服务</span></c:if>
//   <c:if test="${var.STATE==3}"><span class="label label-success arrowed">服务中</span></c:if>
//   <c:if test="${var.STATE==4}"><span class="label label-success arrowed">退款申请中</span></c:if>
//   <c:if test="${var.STATE==5}"><span class="label label-success arrowed">退款中</span></c:if>
//   <c:if test="${var.STATE==6}"><span class="label label-success arrowed">退款完成</span></c:if>
//   <c:if test="${var.STATE==7}"><span class="label label-success arrowed">已完成 </span></c:if>
//   <c:if test="${var.STATE==8}"><span class="label label-success arrowed">支付超时已取消 </span></c:if>
//   <c:if test="${var.STATE==9}"><span class="label label-success arrowed">用户手动取消</span></c:if>
//   <c:if test="${var.STATE==10}"><span class="label label-success arrowed">经理手动取消</span></c:if>
//   <c:if test="${var.STATE==11}"><span class="label label-success arrowed">未受理超时取消</span></c:if>
//   <c:if test="${var.STATE==101}"><span class="label label-success arrowed">已预约</span></c:if>

                      if(msg.pd.STATE==2||msg.pd.STATE==3){
                         // alert('服务中');
                           //退款的效果开始
                           $('.refondapplication').on('touchend',function(){
                            // alert(11);
                                       $('.blockzhezhao,.header-topfixout').show();
                                       $('.closepageimg,#submituserinfo2').on('touchend',function(){
                                           $('.header-topfixout,.blockzhezhao').hide();
                                           // window.location.reload();
                                       })
                                    $('.selectereason').on('touchend',function(){
                                      $('.selectereason').removeClass("selectereasoncolor");
                                       var index=$(this).index('.selectereason');
                                       $(this).toggleClass("selectereasoncolor");
                                       if($(this).is('.selectereasoncolor')){
                                          // textcontent=$('.selectereasontext').eq(index).text();
                                          // if(index==3){
                                          //     textcontent=$('.selectereasontextinput').val();
                                          // }else{
                                           textcontent=$('.selectereasontext').eq(index).text();
                                          // }
                                       }
                                    
                                    })
                                })//退款的效果结束
                      }
                    $.ajax({
                             type: 'GET',
                             headers: {'hx_token':JianKang.TOKEN_ID},
                             url:'/appuser/Hospital/GetEscortInfoByEscortsId?ESCORTS_ID='+msg.pd.ESCORTS_ID,
                             success:function(data){
                                if(msg.pd.STATE==2){
                                //     //退款的效果
                                //       $('.refondapplication').on('touchend',function(){
                                //                $('.blockzhezhao,.header-topfixout').show();
                                //                $('.closepageimg,#submituserinfo2').on('touchend',function(){
                                //                    $('.header-topfixout,.blockzhezhao').hide();
                                //                    // window.location.reload();
                                //                })
                                //             $('.selectereason').on('touchend',function(){
                                //               $('.selectereason').removeClass("selectereasoncolor");
                                //                var index=$(this).index('.selectereason');
                                //                $(this).toggleClass("selectereasoncolor");
                                //                if($(this).is('.selectereasoncolor')){
                                //                   // if(index!=3){
                                //                    textcontent=$('.selectereasontext').eq(index).text();
                                //                   // }
                                //                }
                                //             // alert(textcontent);
                                //             })
                                //         })//退款的效果结束
                                                 //点击退款开始
                                  $('#submituserinfo').on('touchend',function(){
                                    // alert(222);
                                          if(textcontent==''){
                                            alert('请写入原因');
                                          }
                                          else{
                                             //看有几天是节假日 2倍
                                            $.ajax({
                                              url:'http://www.easybots.cn/api/holiday.php?d='+getAll1(msg.pd.SERVICEBEGINTIME, msg.pd.SERVICEENDTIME)+'&ak=k381.659a5150a2e8efcd53b75a423e263997@jkzdw.com',
                                              type:'GET',
                                              success:function(holiday){
                                                  // alert(JSON.stringify(holiday));
                                                    var jierinum=0;
                                                    for(var p in JSON.parse(holiday)){//遍历json对象的每个key/value对,p为key
                                                      if(JSON.parse(holiday)[p]==2){
                                                        jierinum++;
                                                      } 
                                                    }
                                                   var orderrestmoney=(data.pd.VALUE/26)*msg.pd.SERVICECYCLE+(data.pd.VALUE/26)*jierinum*1;
                                                   var refondmoney=returnFloat(orderrestmoney-orderrestmoney*(30/100));
                                                   // alert(refondmoney);
                                                  $.ajax({
                                                        type: 'POST',
                                                        data: JSON.stringify({
                                                                   'ORDERCODE':msg.pd.ORDERCODE,
                                                                  'REFUNDFEE':refondmoney,
                                                                  'REFUNDREASON':textcontent,
                                                                  'ISREFUND':0
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
                               }//待服务  2
                               else if(msg.pd.STATE==3){
                                   // alert('服务中');
                                   // //退款的效果开始
                                   // $('.refondapplication').on('touchend',function(){
                                   //             $('.blockzhezhao,.header-topfixout').show();
                                   //             $('.closepageimg,#submituserinfo2').on('touchend',function(){
                                   //                 $('.header-topfixout,.blockzhezhao').hide();
                                   //                 // window.location.reload();
                                   //             })
                                   //          $('.selectereason').on('touchend',function(){
                                   //            $('.selectereason').removeClass("selectereasoncolor");
                                   //             var index=$(this).index('.selectereason');
                                   //             $(this).toggleClass("selectereasoncolor");
                                   //             if($(this).is('.selectereasoncolor')){
                                   //                // textcontent=$('.selectereasontext').eq(index).text();
                                   //                // if(index==3){
                                   //                //     textcontent=$('.selectereasontextinput').val();
                                   //                // }else{
                                   //                 textcontent=$('.selectereasontext').eq(index).text();
                                   //                // }
                                   //             }
                                            
                                   //          })
                                   //      })//退款的效果结束
                                      //点击退款开始
                                      $('#submituserinfo').on('touchend',function(){
                                        // alert(textcontent);
                                              if(textcontent==''){
                                                alert('请写入原因');
                                              }
                                              else{
                                                //看有几天是节假日 2倍
                                                $.ajax({
                                                url:'http://www.easybots.cn/api/holiday.php?d='+getAll1(getNowFormatDate(), msg.pd.SERVICEENDTIME)+'&ak=k381.659a5150a2e8efcd53b75a423e263997@jkzdw.com',
                                                type:'GET',
                                                success:function(holiday){
                                                    var jierinum=0;
                                                    for(var p in JSON.parse(holiday)){//遍历json对象的每个key/value对,p为key
                                                      if(JSON.parse(holiday)[p]==2){
                                                        jierinum++;
                                                      } 
                                                    }
                                                    var orderrestmoney=(data.pd.VALUE/26)*dayCount(aftergetnow(1), msg.pd.SERVICEENDTIME)+(data.pd.VALUE/26)*jierinum*1;
                                                    var refondmoney=returnFloat(orderrestmoney);
                                                     // alert(refondmoney);
                                                     // alert(JSON.stringify({
                                                     //               'ORDERCODE':msg.pd.ORDERCODE,
                                                     //              'REFUNDFEE':refondmoney,
                                                     //              'REFUNDREASON':textcontent,
                                                     //              'ISREFUND':0
                                                     //            }));
                                                        $.ajax({
                                                              type: 'POST',
                                                              data: JSON.stringify({
                                                                   'ORDERCODE':msg.pd.ORDERCODE,
                                                                  'REFUNDFEE':refondmoney,
                                                                  'REFUNDREASON':textcontent,
                                                                  'ISREFUND':0
                                                                }),//要发送的数据（参数）
                                                                contentType: "application/json.do" ,
                                                                url:'/appuser/OrderList/applyRefundList',
                                                                success:function(adddata){
                                                                    alert(JSON.stringify(adddata));
                                                                    // alert(getAll1(aftergetnow(1), msg.pd.SERVICEENDTIME));
                                                                    location.href="refondapplication.html?APPLYMATRONLIST_ID="+GetQueryString('APPLYMATRONLIST_ID');
                                                                }
                                                        })
                                                  }
                                                }) //看有几天是节假日 3倍
                                              }
                                          })//点击退款给后台发送ajax
                                        //
                               }//服务中  3
                             }
                           })
                      
                }
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
     function getAll1(start,end){
        var data='';
        function getDate(datestr){
            var temp = datestr.split("-");
            var date = new Date(temp[0],temp[1],temp[2]);
            return date;
        }
        var startTime = getDate(start);
        var endTime = getDate(end);
        while((endTime.getTime()-startTime.getTime())>=0){
            var year = startTime.getFullYear();
            var month = startTime.getMonth().toString().length==1?"0"+startTime.getMonth().toString():startTime.getMonth();
            var day = startTime.getDate().toString().length==1?"0"+startTime.getDate():startTime.getDate();
              data+=(year+'-'+month+'-'+day+',');
            startTime.setDate(startTime.getDate()+1);
        }
        // data.substring(0,data.length-1);
        return data;
    }
   // alert(getAll1('2017-11-11','2018-1-10'));