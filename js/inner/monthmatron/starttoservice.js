function goToOrderPage(){
  // alert('backpre触发啦');
}function goBack(){
  // alert('backpre触发啦');
}
$(function(){
	var ordercodes;//订单编号
    var orderrestmoney;//要交的总价格
    var ESCOR;//护工id
    var cycle;//周期
    var lastmoney;//剩余的价格
    var servicebegintime;//开始时间
    var DEPOSIT = '';//定金
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
        //点击跳转上个页面
    $('.backup').on('touchend',function(){
    	   window.history.go(-1);
      });
    	//宝宝个数开始
   $('.childrennumberbtn').on('touchstart', function(event) {
                                   ismove = false
                          })
        $('.childrennumberbtn').on('touchmove', function() {
                   ismove = true
          })
        $('.childrennumberbtn').on('touchend', function() {
              if (ismove) {
                  return
              }
              // alert(11);
              event.stopPropagation();
           $('#childrennumberalert').show();
            $('#isprematurebirthalert').hide();
            $('html').on('touchend',function(){
				$('#isprematurebirthalert').hide();
		        $('#childrennumberalert').hide();
			})
       })
	$('#childrennumberalert>p').on('touchend',function(evevt){
		evevt.stopPropagation();
		$('#childrennumberalert>p').children('.stateCheck').css({'background':''});
		$(this).children('.stateCheck').css({'background':'#01c8c5'});
		$('#childrennumber').text($(this).children('.stateText').text());
		$('#childrennumber').attr('datatype',$(this).children('.stateText').attr('datatype'));
		 $('#childrennumberalert').fadeOut(1000);
      var childrennumber=JSON.stringify({
      'childrennumber':$('#childrennumber').text(),
      'childrennumberattr':$('#childrennumber').attr('datatype')
     })
       // localStorage.setItem('childrennumber',childrennumber);
	})
    // if(localStorage.getItem('childrennumber')){
    //  var childrennumber=JSON.parse(localStorage.getItem('childrennumber'));
    //  $('#childrennumber').text(childrennumber.childrennumber);
    //  $('#childrennumber').attr('datatype',childrennumber.childrennumberattr);
    // }
	//宝宝个数开始结束
	//是否早产开始
   $('.isprematurebirthbtn').on('touchstart', function(event) {
                                   ismove = false
                          })
        $('.isprematurebirthbtn').on('touchmove', function() {
                   ismove = true
          })
        $('.isprematurebirthbtn').on('touchend', function() {
              if (ismove) {
                  return
              }
              // alert(11);
              event.stopPropagation();
           $('#isprematurebirthalert').show();
           $('#childrennumberalert').hide();
           $('html').on('touchend',function(){
				$('#isprematurebirthalert').hide();
		        $('#childrennumberalert').hide();
			})
       })
	$('#isprematurebirthalert>p').on('touchend',function(evevt){
		evevt.stopPropagation();
		$('#isprematurebirthalert>p').children('.stateCheck').css({'background':''});
		$(this).children('.stateCheck').css({'background':'#01c8c5'});
		$('#isprematurebirth').text($(this).children('.stateText').text());
		$('#isprematurebirth').attr('datatype',$(this).children('.stateText').attr('datatype'));
		 $('#isprematurebirthalert').fadeOut(1000);
      var isprematurebirth=JSON.stringify({
      'isprematurebirth':$('#isprematurebirth').text(),
      'isprematurebirthattr':$('#isprematurebirth').attr('datatype')
     })
       // localStorage.setItem('isprematurebirth',isprematurebirth);
	})
    // if(localStorage.getItem('isprematurebirth')){
    //  var isprematurebirth=JSON.parse(localStorage.getItem('isprematurebirth'));
    //  $('#isprematurebirth').text(isprematurebirth.isprematurebirth);
    //  $('#isprematurebirth').attr('datatype',isprematurebirth.isprematurebirthattr);
    // }
	//是否早产结束
	// 选择周期开始
	var slidetype='按天选择';//周期类型选择
	var slidetypedays=26;//周期类型选择
	 //选择周期的方式
        var swiperdays = new Swiper ('.swiperdays', {
                direction: 'vertical',              //可设置水平(horizontal)或垂直(vertical)
                setWrapperSize :true,               //开启这个设定会在Wrapper上添加等于slides相加的宽高，在对flexbox布局的支持不是很好的浏览器中可能需要用到
                slidesPerView : 3,                  //设置slider容器能够同时显示的slides数量
                centeredSlides : true,              //若为真，那么活动块会居中，而非默认状态下的居左
                speed:100,                          //速度
                roundLengths : true,                //宽高取整
                observer:true,
                width : 400, //你的slide宽度,
                height : 250, //你的slide宽度,
                onSlideChangeEnd: function(swiper){
                    slidetype=$('.swiper-slidetype').eq(swiper.activeIndex).text();
                    if(slidetype=='按天选择'){
                    	slidetypedays=26;
                    	$('#swiper-wrappertong').html('<li class="swiper-slide" datatype="26">26天</li><li class="swiper-slide" datatype="42">42天</li><li class="swiper-slide" datatype="52">52天</li>');
                     }
                     else if(slidetype=='按月选择'){
                     	slidetypedays=1;//初始化
  $('#swiper-wrappertong').html("<li class='swiper-slide'  datatype='1'>1个月</li>"+
                        		"<li class='swiper-slide'  datatype='2'>两个月</li>"+
                        		"<li class='swiper-slide'  datatype='3'>三个月</li>"+
                        		"<li class='swiper-slide'  datatype='4'>四个月</li>"+
                        		"<li class='swiper-slide'  datatype='5'>五个月</li>"+
                        		"<li class='swiper-slide'  datatype='6'>六个月</li>"+
                        		"<li class='swiper-slide'  datatype='7'>七个月</li>"+
                        		"<li class='swiper-slide'  datatype='8'>八个月</li>"+
                        		"<li class='swiper-slide'  datatype='9'>九个月</li>"+
                        		"<li class='swiper-slide'  datatype='10'>十个月</li>"+
                   	    		"<li class='swiper-slide'  datatype='11'>十一个月</li>"+ 
                   	    		"<li class='swiper-slide'  datatype='12'>十二个月</li>");
                     }
                     swiperdaysdetail.slideTo(0, 0, true)//初始化
                }   
            })
        //天数计算
          var swiperdaysdetail = new Swiper ('.swiperdaysdetail', {
                direction: 'vertical',              //可设置水平(horizontal)或垂直(vertical)
                setWrapperSize :true,               //开启这个设定会在Wrapper上添加等于slides相加的宽高，在对flexbox布局的支持不是很好的浏览器中可能需要用到
                slidesPerView : 3,                  //设置slider容器能够同时显示的slides数量
                centeredSlides : true,              //若为真，那么活动块会居中，而非默认状态下的居左
                speed:100,                          //速度
                roundLengths : true,                //宽高取整
                observer:true,
                width : 400, //你的slide宽度,
                height : 250, //你的slide宽度,
                // spaceBetween: 30,                   //间距
                onSlideChangeEnd: function(swiper){
                     slidetypedays=$('#swiper-wrappertong li').eq(swiper.activeIndex).attr('datatype');
                     // alert(slidetypedays);
                }   
            })
          //解决滑动
            $('#servicecycles').on('touchstart', function() {
                                   ismove = false
                                })
              $('#servicecycles').on('touchmove', function() {
                         ismove = true
                })
              $('#servicecycles').on('touchend', function() {
                    if (ismove) {
                        return
                    }
                	  $('.timechoosecircleall,.blockzhezhao').show();
                	  swiperdays.slideTo(0, 0, true);
                	  swiperdaysdetail.slideTo(0, 0, true)//初始化
                	  $('body').css({'overflow':'hidden'});
               })
          $('#timeOk').on('touchend',function(){
          	   // alert(slidetypedays);
          	   if(slidetype=='按天选择'){
          	   		$('#servicecycle').text(slidetypedays+'天');
          	   		$('#servicecycle').attr('datatype',slidetypedays);
                   var servicecycle=JSON.stringify({
                    'servicecycle':$('#servicecycle').text(),
                    'slidetypedays':$('#servicecycle').attr('datatype')
                   })
                   cycle=$('#servicecycle').attr('datatype');
       	           servicebegintime=$('.calendarinner').text();
                   yusaoinfo(ESCOR,cycle,servicebegintime);
                   // localStorage.setItem('servicecycle',servicecycle);
          	   }else if(slidetype=='按月选择'){
          	   		$('#servicecycle').text(slidetypedays+'个月');
          	   		$('#servicecycle').attr('datatype',slidetypedays*30);
                  // alert(slidetypedays*30);
                 var servicecycle=JSON.stringify({
                    'servicecycle':$('#servicecycle').text(),
                    'slidetypedays':$('#servicecycle').attr('datatype')
                   })
                 cycle=$('#servicecycle').attr('datatype');
                 // alert(cycle);
       	         servicebegintime=$('.calendarinner').text();
       	         // alert(servicebegintime);
                 yusaoinfo(ESCOR,cycle,servicebegintime);
                   // localStorage.setItem('servicecycle',servicecycle);
          	   }
          	   $('.timechoosecircleall,.blockzhezhao').hide();
          	   $('body').css({'overflow':'visible'});
          })
          // if(localStorage.getItem('servicecycle')){
          //    var servicecycle=JSON.parse(localStorage.getItem('servicecycle'));
          //    $('#servicecycle').text(servicecycle.servicecycle);
          //    $('#servicecycle').attr('datatype',servicecycle.slidetypedays);
          //    yusaoinfo(ESCOR,cycle,servicebegintime);
          //   } 
          $('.timechoosecircleall').hide();
         
          $('#timeClose').on('touchend',function(){
                // $('#servicecycle').text('请选择');
          	    // $('#servicecycle').attr(datatype,'请选择');
          	    $('.timechoosecircleall,.blockzhezhao').hide();
          	     $('body').css({'overflow':'visible'});
          })
	// 选择周期结束
	//预产期开始
			var datearryu=getAll(fun_date(-7),fun_date(7)).split(',');
			datearryu.pop();
      // alert(datearryu);
			var datearrlengthli='';//这个月的
			function xiamonthday(canshu){
				//知道下个月的1好在数组中的位置函数
				for(i=0;i<datearryu.length;i++){
					if(datearryu[i]>datearryu[i+1]){
						return i+1
					}
				}
			}
			//显示年   同一年
			if(fun_dateyear(-7)==fun_dateyear(7)){
				//默认年
				$('.swiper-wrapperyear').html("<li class='swiper-slide swiper-slideyear' datatype="+new Date().getFullYear()+">"+ 
				new Date().getFullYear()+"年</li>");
				//在一个月内
				if(fun_datemonth(-7)==fun_datemonth(7)){
					//默认月
				      $('.swiper-wrappermonth').html('<li class="swiper-slide swiper-slidemonth" datatype='+fun_datemonth(-7)+'>'+fun_datemonth(-7)+'月'+'</li>');
				   // 默认日
					for(i=0;i<datearryu.length;i++){
                      console.log(datearryu[i]);
						  datearrlengthli+="<li class='swiper-slide swiper-slidedays' datatype='"+datearryu[i]+"'>"+datearryu[i]+"日</li>";
					}
					
				}
				//不在一个月内
				else{
				     $('.swiper-wrappermonth').html('<li class="swiper-slide swiper-slidemonth" datatype='+fun_datemonth(-7)+'>'+fun_datemonth(-7)+'月'+'</li>'+
						'<li class="swiper-slide swiper-slidemonth" datatype='+fun_datemonth(7)+'>'+fun_datemonth(7)+'月'+'</li>');
					 for(dd=0;dd<xiamonthday(datearryu);dd++){
					  	      console.log(dd);
							  datearrlengthli+="<li class='swiper-slide swiper-slidedays' datatype='"+datearryu[dd]+"'>"+datearryu[dd]+"日</li>";
						}
				   }
			}
			//不同年的
			else{
				//两个年
				$('.swiper-wrapperyear').html("<li class='swiper-slide swiper-slideyear' datatype="+new Date().getFullYear()+">"+ 
					new Date().getFullYear()+"年</li>"+
				" <li class='swiper-slide swiper-slideyear' datatype="+(new Date().getFullYear()+1)+">"+(new Date().getFullYear()+1)+"年</li>");
				//两个月
				// $('.swiper-wrappermonth').html('<li class="swiper-slide swiper-slidemonth" datatype='+fun_datemonth(3)+'>'+fun_datemonth(3)+'月'+'</li>'+
				// 		'<li class="swiper-slide swiper-slidemonth" datatype='+fun_datemonth(15)+'>'+fun_datemonth(15)+'月'+'</li>');
				$('.swiper-wrappermonth').html("<li class='swiper-slide swiper-slidemonth' datatype="+fun_datemonth(-7)+">"+fun_datemonth(7)+"月</li>");
			   //显示第一个月
			   for(dd=0;dd<xiamonthday(datearryu);dd++){
					  	      console.log(dd);
							  datearrlengthli+="<li class='swiper-slide swiper-slidedays' datatype='"+datearryu[dd]+"'>"+datearryu[dd]+"日</li>";
						}	
			}
			$('#swiper-wrappertong2').html(datearrlengthli);
			var slideyear=$('.swiper-slideyear').eq(0).attr('datatype');
			var slidemonth=$('.swiper-slidemonth').eq(0).attr('datatype');
			var slidedate=$('.swiper-slidedays').eq(0).attr('datatype');
			// alert(slidedate);
			// var slideyear='';
			// var slidemonth='';
			// var slidedays='';
			//年
        var swiperyear = new Swiper ('.swiperyear', {
                direction: 'vertical',              //可设置水平(horizontal)或垂直(vertical)
                setWrapperSize :true,               //开启这个设定会在Wrapper上添加等于slides相加的宽高，在对flexbox布局的支持不是很好的浏览器中可能需要用到
                slidesPerView : 3,                  //设置slider容器能够同时显示的slides数量
                centeredSlides : true,              //若为真，那么活动块会居中，而非默认状态下的居左
                speed:100,                          //速度
                roundLengths : true,                //宽高取整
                observer:true,
                 width : 400, //你的slide宽度,
                height : 200, //你的slide宽度,
                onSlideChangeEnd: function(swiper){
                	 datearrlengthli='';
                     slideyear=$('.swiper-slideyear').eq(swiper.activeIndex).attr('datatype');
                     if(swiper.activeIndex==1){
                     	    datearrlengthli='';
	                        if(fun_dateyear(-7)!=fun_dateyear(7)){
		                     	$('.swiper-wrappermonth').html('<li class="swiper-slide swiper-slidemonth" datatype='+fun_datemonth(7)+'>'+fun_datemonth(7)+'月'+'</li>');
								// '<li class="swiper-slide swiper-slidemonth" datatype='+fun_datemonth(35)+'>'+fun_datemonth(35)+'月'+'</li>');
			                     for(kk=xiamonthday(datearryu);kk<datearryu.length;kk++){
										          datearrlengthli+="<li class='swiper-slide swiper-slidedays' datatype='"+datearryu[kk]+"'>"+datearryu[kk]+"日</li>";
									          }
									    slidemonth=01;
									    swiperdate.slideTo(0, 0, true)//初始化
									    slidedate=01;
	                     	}
                     }
                     else if(swiper.activeIndex==0){
                     	    datearrlengthli='';
	                        if(fun_dateyear(-7)!=fun_dateyear(7)){
		                     	$('.swiper-wrappermonth').html('<li class="swiper-slide swiper-slidemonth" datatype='+fun_datemonth(-7)+'>'+fun_datemonth(7)+'月'+'</li>');
								// '<li class="swiper-slide swiper-slidemonth" datatype='+fun_datemonth(35)+'>'+fun_datemonth(35)+'月'+'</li>');
								 for(n=0;n<xiamonthday(datearryu);n++){
						  	      console.log(n);
								  datearrlengthli+="<li class='swiper-slide swiper-slidedays' datatype='"+datearryu[n]+"'>"+datearryu[n]+"日</li>";
							    }
							     slidemonth=12;
								 swiperdate.slideTo(0, 0, true)//初始化
								 slidedate=fun_datedate(3);
	                     	}
                     }
                    $('#swiper-wrappertong2').html(datearrlengthli);
                    // swipermonth.slideTo(0, 0, true)//初始化
                    // swiperdate.slideTo(0, 0, true)//初始化
                }   
            })
       //月
        var swipermonth = new Swiper ('.swipermonth', {
                direction: 'vertical',              //可设置水平(horizontal)或垂直(vertical)
                setWrapperSize :true,               //开启这个设定会在Wrapper上添加等于slides相加的宽高，在对flexbox布局的支持不是很好的浏览器中可能需要用到
                slidesPerView : 3,                  //设置slider容器能够同时显示的slides数量
                centeredSlides : true,              //若为真，那么活动块会居中，而非默认状态下的居左
                speed:100,                          //速度
                roundLengths : true,                //宽高取整
                observer:true,
                width : 400, //你的slide宽度,
                height : 200, //你的slide宽度,
                onSlideChangeEnd: function(swiper){
                	// swipermonth.slideTo(0, 0, true)//初始化
                	datearrlengthli='';
                    slidemonth=$('.swiper-slidemonth').eq(swiper.activeIndex).attr('datatype');
                      if(swiper.activeIndex==1){
                      	     if(fun_dateyear(-7)==fun_dateyear(7)){
                      	     	slideyear=fun_dateyear(-7)
                      	     }
                      	     else{
                      	     	slideyear=fun_dateyear(7)
                      	     }
                      	    for(kk=xiamonthday(datearryu);kk<datearryu.length;kk++){
										  datearrlengthli+="<li class='swiper-slide swiper-slidedays' datatype='"+datearryu[kk]+"'>"+datearryu[kk]+"日</li>";
							 }
							 swiperdate.slideTo(0, 0, true)//初始化
							 slidedate=01;
						}
                     else if(swiper.activeIndex==0){
                     	swiperdate.slideTo(0, 0, true)//初始化
                     	slidedate=fun_datedate(-7);
                     	for(jj=0;jj<xiamonthday(datearryu);jj++){
								  datearrlengthli+="<li class='swiper-slide swiper-slidedays' datatype='"+datearryu[jj]+"'>"+datearryu[jj]+"日</li>";
						}
                     }
                     $('#swiper-wrappertong2').html(datearrlengthli);
                     // swiperdate.slideTo(0, 0, true)//初始化
                     
                }   
            }) 
            //日期 
        var swiperdate = new Swiper ('.swiperdate', {
                direction: 'vertical',              //可设置水平(horizontal)或垂直(vertical)
                setWrapperSize :true,               //开启这个设定会在Wrapper上添加等于slides相加的宽高，在对flexbox布局的支持不是很好的浏览器中可能需要用到
                slidesPerView : 3,                  //设置slider容器能够同时显示的slides数量
                centeredSlides : true,              //若为真，那么活动块会居中，而非默认状态下的居左
                speed:100,                          //速度
                roundLengths : true,                //宽高取整
                observer:true,
                width : 400, //你的slide宽度,
                height : 200, //你的slide宽度,
                onSlideChangeEnd: function(swiper){
                	slidedate=$('.swiper-slidedays').eq(swiper.activeIndex).attr('datatype');
                	// alert(slidedate);
                }   
            })
         $('.calendarinner').on('touchstart', function() {
                                   ismove = false
                          })
        $('.calendarinner').on('touchmove', function() {
                   ismove = true
          })
        $('.calendarinner').on('touchend', function() {
              if (ismove) {
                  return
              }
              // alert('ok');
        $('.timechoosecircleall2,.blockzhezhao').show();
            swiperdate.slideTo(0, 0, true)//初始化
            swipermonth.slideTo(0, 0, true)//初始化
            swiperyear.slideTo(0, 0, true)//初始化
            $('body').css({'overflow':'hidden'});
         })
        //点击确定
        $('#timeOk2').on('touchend',function(even){
         var duedate=slideyear+'-'+slidemonth+'-'+slidedate.toString(); 
            $('.timechoosecircleall2,.blockzhezhao').hide();
            $('body').css({'overflow':'visible'});
            $('.calendarinner').text(duedate);
            $('.calendarinner').attr('datatype',duedate);
             var calendarinner=JSON.stringify({
                'calendarinner':$('.calendarinner').text(),
                'calendarinnerattr':$('.calendarinner').attr('datatype')
               })
                // localStorage.setItem('calendarinner',calendarinner);
               cycle=$('#servicecycle').attr('datatype');
       	       servicebegintime=$('.calendarinner').text();
       	       yusaoinfo(ESCOR,cycle,servicebegintime);
        })
         // if(localStorage.getItem('calendarinner')){
         //   var calendarinner=JSON.parse(localStorage.getItem('calendarinner'));
         //   $('.calendarinner').text(calendarinner.calendarinner);
         //   $('.calendarinner').attr('datatype',calendarinner.calendarinnerattr);
         //   yusaoinfo(ESCOR,cycle,servicebegintime);
         //  } 
        //取消
        $('#timeClose2').on('touchend',function(){
            // $('.calendarinner').text('请选择');
            // $('.calendarinner').attr('datatype','请选择');
        	$('.timechoosecircleall2,.blockzhezhao').hide();
            $('body').css({'overflow':'visible'});
        })
         $('.blockzhezhao').on('touchend',function(){
            $('.timechoosecircleall2,.blockzhezhao,.timechoosecircleall').hide()
         })
         $('html').on('touchend',function(){
            $('#servicetypealert').hide();
            $('#escortexperiencealert').hide();
         })
	//预产期结束
 //服务周期用之下单页面填写的信息  使用订单详情页面的接口 得到这个服务周期
$.ajax({
       type: 'GET',
       headers: {'hx_token': JianKang.TOKEN_ID},
       async:false,
       url:'/appuser/Matron/GetApplyMatronByID?APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID'),
       success:function(msg){
                      // alert(JSON.stringify(msg));
       	              ESCOR=msg.pd.ESCORTS_ID;
       	              cycle=msg.pd.SERVICECYCLE;
       	              ordercodes=msg.pd.ORDERCODE;
       	              // ordercodes=msg.pd.SERVICEBEGINTIME;
                      servicebegintime=msg.pd.DUEDATE;
       	              DEPOSIT=msg.pd.DEPOSIT;//定金
                       // alert('定金的是'+DEPOSIT);
       	              $('.calendarinner').text(msg.pd.DUEDATE);
       	              $('.calendarinner').attr('datatype',msg.pd.DUEDATE);
	       	          $('#servicecycle').text(msg.pd.SERVICECYCLE+'天');
	       	          $('#servicecycle').attr('datatype',msg.pd.SERVICECYCLE);
					  yusaoinfo(ESCOR,cycle,servicebegintime);
		}//成功之后
    })
    //点击时候
    $('#childrennumberalert>p,#isprematurebirthalert>p').on('touchend',function(){
       	              	 yusaoinfo(ESCOR,cycle,servicebegintime);
       	              })
   //月嫂信息函数 得到等级
  function yusaoinfo(ESCORTS_ID,daycycle,startdates){
    // alert('定金的是'+DEPOSIT);
    var endserviceday=GetEndDate(startdates,daycycle);//结束的时间
  	// alert('月嫂执行函数'+getAll1('2017-1-10','2018-1'));
  	   $.ajax({
               type: 'GET',
               headers: {'hx_token':JianKang.TOKEN_ID},
               url:'/appuser/Hospital/GetEscortInfoByEscortsId?ESCORTS_ID='+ESCOR,
               success:function(yusaoinfo){
               	  //看有几天是节假日 2倍
               	  $.ajax({
		              url:'http://www.easybots.cn/api/holiday.php?d='+getAll1(startdates,endserviceday)+'&ak=k381.659a5150a2e8efcd53b75a423e263997@jkzdw.com',
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
               	         //订单不考虑二胎和早产的总的价格
               	         orderrestmoney=(yusaoinfo.pd.VALUE/26)*daycycle+(yusaoinfo.pd.VALUE/26)*jierinum*1;
				    	 if(($('.childrennumber').attr('datatype')==1)&&($('.isprematurebirth').attr('datatype')==0)){
				    	 	lastmoney=returnFloat(orderrestmoney-DEPOSIT);
				         	$('.orderrestmoney').text('￥'+returnFloat(lastmoney));
				         }
				    	 else if(($('.childrennumber').attr('datatype')==2)&&($('.isprematurebirth').attr('datatype')==0)){
				    	 	lastmoney=returnFloat(orderrestmoney*(1+20/100)-DEPOSIT);
				         	$('.orderrestmoney').text('￥'+returnFloat(lastmoney));
				         }
				         else if(($('.childrennumber').attr('datatype')==1)&&($('.isprematurebirth').attr('datatype')==1)){
				    	 	lastmoney=returnFloat(orderrestmoney*(1+20/100)-DEPOSIT);
				         	// alert('hhhh222');
				         	$('.orderrestmoney').text('￥'+returnFloat(lastmoney));
				         }
				         else if(($('.childrennumber').attr('datatype')==2)&&($('.isprematurebirth').attr('datatype')==1)){
				    	 	lastmoney=returnFloat(orderrestmoney*(1+20/100+20/100)-DEPOSIT);
				         	$('.orderrestmoney').text('￥'+returnFloat(lastmoney));
				         }
				         // alert(orderrestmoney);
				         // alert(lastmoney);
		               }
		            }) //看有几天是节假日 3倍
	          }
		})
  	}//月嫂信息函数
   	  //点击确定按钮
 $('.confirmbtn').on('touchend',function(){
 	           // alert(orderrestmoney);
 	           // alert(lastmoney);
			   var servicecycle=$('#servicecycle').attr('datatype');//服务周期
			   var servicebegintime=$('.calendarinner').text();//开始时间
			   var serviceendtime=GetEndDate(servicebegintime,servicecycle);//结束时间
			   var childrennumber=$('.childrennumber').attr('datatype');//孩子个数
			   var isprematurebirth=$('.isprematurebirth').attr('datatype');//孩子个数
			   var userdata={
			   	      "SERVICEBEGINTIME":servicebegintime,//开始的服务时间
			   	      "SERVICEENDTIME": serviceendtime,//结束的服务时间计算出的
			   	      "SERVICECYCLE":servicecycle,//服务周期
			   	      "CHILDRENNUMBER":childrennumber,//出生孩子数
			   	      "ISPREMATUREBIRTH":isprematurebirth,//是否早产
			   	      "ESCORTS_ID":ESCOR,//护工id
			   	      "APPLYMATRONLIST_ID":GetQueryString('APPLYMATRONLIST_ID'),//订单主键
			   	      // "orderrestmoney":orderrestmoney//订单不考虑二胎和早产的总的价格
			   	  }
			   	  if(cycle==''){
			   	  	new TipBox({type:'tip',iconStr:'填写周期',colorType:'month',str:"<p class='thirtySix'><span>请填写周期</span></p>",Ok:'好的',hasBtn:true});
			   	  }
			   	  else if(cycle<0){
			   	  	new TipBox({type:'error',iconStr:'填写错误',colorType:'month',str:"<p class='thirtySix'><span>您好，您输入的周期有误</span></p><p class='thirtySix'><span> 请</span><span class='color'>【重新填写】</span><span>！</span></p>",Ok:'好的',hasBtn:true});
			   	  }
			   	  else{
					 	$.ajax({
					               type: 'POST',
					               headers: {'hx_token': JianKang.TOKEN_ID},
					               data: userdata,//要发送的数据（参数）
					               url:'/appuser/Matron/updateApplyMatron?APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID'),
					               success:function(data){
					               	// alert(ordercodes);
					                  location.href='../conment/payMethodpage.html?REALMONEY='+lastmoney*100+'&ORDERCODE='+ordercodes+'&orderallmoney=1'+'&APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID');
					                }
					    })
			   	  }
 })//提交结束
// }//zhifu函数
 
    

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
function  GetEndDate(startDate,cycledays){//开始时间个天数计算结束的日期
            var oldTime = (new Date(startDate)).getTime(); //得到毫秒数
		 	var newdata=oldTime+cycledays*24*60*60*1000;//普通时间加上天数就是新的日期的毫秒数
		 	var mynewdataend=new Date(newdata);//转化成时间格式 在下面获取就可以
		 	var myyearend=mynewdataend.getFullYear();
			var mymonthend=mynewdataend.getMonth()+1;
			var mydateend=mynewdataend.getDate();
    	    var SERCIVEENDTIME=myyearend+'-'+mymonthend+'-'+mydateend;
    	    // alert(SERCIVEENDTIME);
    	    return SERCIVEENDTIME;
    	}
 //判断几天以后的日期
function fun_date(aa){
        var date1 = new Date(),
        time1=date1.getFullYear()+"-"+(date1.getMonth()+1)+"-"+date1.getDate();//time1表示当前时间
        var date2 = new Date(date1);
        date2.setDate(date1.getDate()+aa);
        var time2 = date2.getFullYear()+"-"+(date2.getMonth()+1)+"-"+date2.getDate();
        return time2;
    }
    //判断几天以后的年份
 function fun_dateyear(aa){
        var date1 = new Date(),
        time1=date1.getFullYear()+"-"+(date1.getMonth()+1)+"-"+date1.getDate();//time1表示当前时间
        var date2 = new Date(date1);
        date2.setDate(date1.getDate()+aa);
        var time2 = date2.getFullYear();
        return time2;
    }
      //判断几天以后的月份
     function fun_datemonth(aa){
        var date1 = new Date(),
        time1=date1.getFullYear()+"-"+(date1.getMonth()+1)+"-"+date1.getDate();//time1表示当前时间
        var date2 = new Date(date1);
        date2.setDate(date1.getDate()+aa);
        var time2 = (date2.getMonth()+1);
        if(time2<10){
        	time2='0'+time2
        }else{
        	time2=time2
        }
        return time2;
    }
    //判断几天以后的日期
      function fun_datedate(aa){
        var date1 = new Date(),
        time1=date1.getFullYear()+"-"+(date1.getMonth()+1)+"-"+date1.getDate();//time1表示当前时间
        var date2 = new Date(date1);
        date2.setDate(date1.getDate()+aa);
        var time2 = date2.getDate();
        // alert(time2);
        return time2;
    }
    //
    
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
     function getAll(start,end){
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
            // data+=(year+'-'+month+'-'+day+',');
            data+=day+',';
            startTime.setDate(startTime.getDate()+1);
        }
        return data;
    }
   
   






