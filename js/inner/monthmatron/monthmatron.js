function backhome(){
  window.jsi.backhome();
}
$(function(){
  // $('html').on('touchend',function(){
  // })
   // $('.usertitle').on('touchend',function(){
   //        // location.href='escortstatus.html';
   //     location.href="orderdetails.html";
   //   })
  localStorage.removeItem('orderstatus');
  localStorage.removeItem('interview');
  var kainaishiprice='';
	var ua = navigator.userAgent.toLowerCase();
	var JianKang=JSON.parse(localStorage.getItem('JianKang')|| '{}');
//   // alert(JianKang.TOKEN_ID);
// 	// 从登陆页面跳转回来时刷新	
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
    }
    if (ua.match(/MicroMessenger/i)=="micromessenger") {
		$('.header-topnav').hide();
	}else{
	     $('#outhomebtn').show();
	     $('#outhomebtn').on('touchend',function(){
	    	 backhome();
	     })
	    // var minAwayBtm = 0;  // 距离页面底部的最小距离
		$(window).scroll(function() {
		    if ( $(window).scrollTop()>=50) {
		        // console.log('触发了');
		    	$('.header-topnav').fadeIn();
		    }
		    else{
		    	$('.header-topnav').fadeOut();

		    }
		});
	}
  // 选择姓名和身份证号
      // if($('#truename').text()=='请选择'){
    $('#truename,.usersIDCard').on('touchend',function(){
             location.href='../MyPage/familyMember.html?L=month';
      })
      // }
   if (localStorage.getItem('Personal')) {
    // alert('缓存'+localStorage.getItem('Personal'));//
        var Personal = JSON.parse(localStorage.getItem('Personal'));
        $('#truename').text(Personal.FAMILYNAME);
        if(Personal.IDCARD){
           $('.usersIDCard').text(Personal.IDCARD);
        }else{
           new TipBox({type:'tip',iconStr:'完善信息',colorType:'month',str:"<p class='thirtySix'><span>请您先完善家庭成员资料</span></p>",Ok:'好的',hasBtn:true,callBack:function(){
               localStorage.removeItem('Personal');
               backhome();
           }});
        }
    }else{
         $.ajax({
            headers: {'hx_token': JianKang.TOKEN_ID},
            type: 'GET',
            url: 'http://admin.jkzdw.com/appuser/Personal/getMemberFamilyById',
            success:function(data){
                for (var i = 0; i < data.pd.length; i++) {
                    if (data.pd[i].ISDEFAULT=='1') {
                        Personal = data.pd[i];
                        // alert('服务器'+Personal);
                        $('#truename').text(Personal.FAMILYNAME);
                        $('.usersIDCard').text(Personal.IDCARD);
                    }
                }
            }
        })
    }
  // 选择姓名结束
  // FAMILYBIRTHDAY生日
	// 月嫂服务类型开始
    $('.servicetypebtn').on('touchstart', function() {
                                   ismove = false
                          })
        $('.servicetypebtn').on('touchmove', function() {
                   ismove = true
          })
        $('.servicetypebtn').on('touchend', function(event) {
              if (ismove) {
                  return
              }
              event.stopPropagation();
              $('#servicetypealert').show();
              $('#escortexperiencealert').hide();
         }) 
	// $('.servicetypebtn').on('touchend',function(){
	// 	 $('#servicetypealert').show();
	// })
	$('#servicetypealert>p').on('touchend',function(evevt){
		evevt.stopPropagation();
		$('#servicetypealert>p').children('.stateCheck').css({'background':''});
		$(this).children('.stateCheck').css({'background':'#01c8c5'});
		 $('#servicetype').text($(this).children('.stateText').text());
		 $('#servicetype').attr('datatype',$(this).children('.stateText').attr('datatype'));
		 $('#servicetypealert').hide();
     var servicetype=JSON.stringify({
      'servicetype':$('#servicetype').text(),
      'servicetypeattr':$('#servicetype').attr('datatype')
     })
      localStorage.setItem('servicetype',servicetype);
		 // if($('#servicetype').text()=='开奶师'){
	  //   	$('.user-info-main-hide').hide();
	  //   }
	  //   else{
	  //   	$('.user-info-main-hide').show();
	  //   }
	    // alert($('#servicetype').attr('datatype'));
	})
  if(localStorage.getItem('servicetype')){
     var servicetype=JSON.parse(localStorage.getItem('servicetype'));
     $('#servicetype').text(servicetype.servicetype);
     $('#servicetype').attr('datatype',servicetype.servicetypeattr);
        //   if($('#servicetype').text()=='开奶师'){
        //   $('.user-info-main-hide').hide();
        // }
        // else{
        //   $('.user-info-main-hide').show();
        // }
    } 
	// 月嫂服务类型end
	//服务经验开始
   $('.escortexperiences').on('touchstart', function(event) {
                                   ismove = false
                          })
        $('.escortexperiences').on('touchmove', function() {
                   ismove = true
          })
        $('.escortexperiences').on('touchend', function() {
              if (ismove) {
                  return
              }
              event.stopPropagation();
           $('#escortexperiencealert').show();
           $('#servicetypealert').hide();
       })
	$('#escortexperiencealert>p').on('touchend',function(evevt){
		evevt.stopPropagation();
		$('#escortexperiencealert>p').children('.stateCheck').css({'background':''});
		$(this).children('.stateCheck').css({'background':'#01c8c5'});
		$('#escortexperience').text($(this).children('.stateText').text());
		$('#escortexperience').attr('dataexperience',$(this).children('.stateText').attr('dataexperience'));
		 $('#escortexperiencealert').fadeOut(1000);
      var escortexperience=JSON.stringify({
      'escortexperience':$('#escortexperience').text(),
      'escortexperienceattr':$('#escortexperience').attr('dataexperience')
     })
       localStorage.setItem('escortexperience',escortexperience);
	})
    if(localStorage.getItem('escortexperience')){
     var escortexperience=JSON.parse(localStorage.getItem('escortexperience'));
     $('#escortexperience').text(escortexperience.escortexperience);
     $('#escortexperience').attr('dataexperience',escortexperience.escortexperienceattr);
    }
	//服务经验结束
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
          	   if(slidetype=='按天选择'){
          	   		$('#servicecycle').text(slidetypedays+'天');
          	   		$('#servicecycle').attr('slidetypedays',slidetypedays);
                   var servicecycle=JSON.stringify({
                    'servicecycle':$('#servicecycle').text(),
                    'slidetypedays':$('#servicecycle').attr('slidetypedays')
                   })
                   localStorage.setItem('servicecycle',servicecycle);
          	   }else if(slidetype=='按月选择'){
          	   		$('#servicecycle').text(slidetypedays+'个月');
          	   		$('#servicecycle').attr('slidetypedays',slidetypedays*30);
                  // alert(slidetypedays*30);
                 var servicecycle=JSON.stringify({
                    'servicecycle':$('#servicecycle').text(),
                    'slidetypedays':$('#servicecycle').attr('slidetypedays')
                   })
                   localStorage.setItem('servicecycle',servicecycle);
          	   }
          	   $('.timechoosecircleall,.blockzhezhao').hide();
          	   $('body').css({'overflow':'visible'});
          })
          if(localStorage.getItem('servicecycle')){
             var servicecycle=JSON.parse(localStorage.getItem('servicecycle'));
             $('#servicecycle').text(servicecycle.servicecycle);
             $('#servicecycle').attr('slidetypedays',servicecycle.slidetypedays);
            } 
          $('.timechoosecircleall').hide();
         
          $('#timeClose').on('touchend',function(){
                $('#servicecycle').text('请选择');
          	    // $('#servicecycle').attr(datatype,'请选择');
          	    $('.timechoosecircleall,.blockzhezhao').hide();
          	     $('body').css({'overflow':'visible'});
          })
	// 选择周期结束
	//预产期开始
			var datearryu=getAll(fun_date(3),fun_date(15)).split(',');
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
			if(fun_dateyear(3)==fun_dateyear(15)){
				//默认年
				$('.swiper-wrapperyear').html("<li class='swiper-slide swiper-slideyear' datatype="+new Date().getFullYear()+">"+ 
				new Date().getFullYear()+"年</li>");
				//在一个月内
				if(fun_datemonth(3)==fun_datemonth(15)){
					//默认月
				      $('.swiper-wrappermonth').html('<li class="swiper-slide swiper-slidemonth" datatype='+fun_datemonth(3)+'>'+fun_datemonth(3)+'月'+'</li>');
				   // 默认日
					for(i=0;i<datearryu.length;i++){
               console.log(datearryu[i]);
						  datearrlengthli+="<li class='swiper-slide swiper-slidedays' datatype='"+datearryu[i]+"'>"+datearryu[i]+"日</li>";
					}
					
				}
				//不在一个月内
				else{
				     $('.swiper-wrappermonth').html('<li class="swiper-slide swiper-slidemonth" datatype='+fun_datemonth(3)+'>'+fun_datemonth(3)+'月'+'</li>'+
						'<li class="swiper-slide swiper-slidemonth" datatype='+fun_datemonth(15)+'>'+fun_datemonth(15)+'月'+'</li>');
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
				$('.swiper-wrappermonth').html("<li class='swiper-slide swiper-slidemonth' datatype="+fun_datemonth(3)+">"+fun_datemonth(3)+"月</li>");
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
	                        if(fun_dateyear(3)!=fun_dateyear(15)){
		                     	$('.swiper-wrappermonth').html('<li class="swiper-slide swiper-slidemonth" datatype='+fun_datemonth(15)+'>'+fun_datemonth(15)+'月'+'</li>');
								// '<li class="swiper-slide swiper-slidemonth" datatype='+fun_datemonth(35)+'>'+fun_datemonth(35)+'月'+'</li>');
			                     for(kk=xiamonthday(datearryu);kk<datearryu.length;kk++){
										  datearrlengthli+="<li class='swiper-slide swiper-slidedays' datatype='"+datearryu[kk]+"'>"+datearryu[kk]+"日</li>";
									    }
									    slidemonth=1;
									    swiperdate.slideTo(0, 0, true)//初始化
									    slidedate='01';
	                     	}
                     }
                     else if(swiper.activeIndex==0){
                     	    datearrlengthli='';
	                        if(fun_dateyear(3)!=fun_dateyear(15)){
		                     	$('.swiper-wrappermonth').html('<li class="swiper-slide swiper-slidemonth" datatype='+fun_datemonth(3)+'>'+fun_datemonth(3)+'月'+'</li>');
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
                      	     if(fun_dateyear(3)==fun_dateyear(15)){
                      	     	slideyear=fun_dateyear(3)
                      	     }
                      	     else{
                      	     	slideyear=fun_dateyear(15)
                      	     }
                      	    for(kk=xiamonthday(datearryu);kk<datearryu.length;kk++){
                										  datearrlengthli+="<li class='swiper-slide swiper-slidedays' datatype='"+datearryu[kk]+"'>"+datearryu[kk]+"日</li>";
                							 }
          							 swiperdate.slideTo(0, 0, true)//初始化
          							 slidedate='01';
                         // alert(slidedate);
          						}
                     else if(swiper.activeIndex==0){
                       	swiperdate.slideTo(0, 0, true)//初始化
                       	slidedate=fun_datedate(3);
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
        $('.timechoosecircleall2,.blockzhezhao').show();
            swiperdate.slideTo(0, 0, true)//初始化
            swipermonth.slideTo(0, 0, true)//初始化
            swiperyear.slideTo(0, 0, true)//初始化
            $('body').css({'overflow':'hidden'});
         })
        //点击确定
        $('#timeOk2').on('touchend',function(even){
          // alert(slidedate);
         var duedate=slideyear+'-'+slidemonth+'-'+slidedate.toString(); 
            $('.timechoosecircleall2,.blockzhezhao').hide();
            $('body').css({'overflow':'visible'});
            $('.calendarinner').text(duedate);
            $('.calendarinner').attr('datatype',duedate);
             var calendarinner=JSON.stringify({
                'calendarinner':$('.calendarinner').text(),
                'calendarinnerattr':$('.calendarinner').attr('datatype')
               })
                localStorage.setItem('calendarinner',calendarinner);
        })
         if(localStorage.getItem('calendarinner')){
           var calendarinner=JSON.parse(localStorage.getItem('calendarinner'));
           $('.calendarinner').text(calendarinner.calendarinner);
           $('.calendarinner').attr('datatype',calendarinner.calendarinnerattr);
          } 
        //取消
        $('#timeClose2').on('touchend',function(){
            $('.calendarinner').text('请选择');
            $('.calendarinner').attr('datatype','请选择');
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
    	// 15位到18位的正则，正则只能验证身份证的格式是否正确，是验证不了真伪的，只有公安
	// 系统里才能验证身份证号真假。
		// var tianshu=/^\+?[1-9][0-9]*$ /
		// var isIDCard=/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
		// var resultIDCard=isIDCard.test($('.isIDCard').val());
		// $('.isIDCard').blur(function(){
		// 	resultIDCard=isIDCard.test($('.isIDCard').val());
		// 	console.log($('.isIDCard').val());
		// 	if(resultIDCard){
		// 		$('.alertyuasu').text('正确');
		// 		$('.alertyuasu').css({'color':'green'});
		// 		$('.alertyuasu').fadeIn().fadeOut(1000);
		// 	}else{
		// 		$('.alertyuasu').text('身份证格式不正确');
		// 		$('.alertyuasu').css({'color':'red'});
		// 		$('.alertyuasu').fadeIn().fadeOut(1000);
		// 	}
		// })
   // // $('.calendarinner').text(getNowFormatDate());
   // $('.calendarinner').text(fun_date(3));//7天后的日期
   // 	// $('.calendarinner').text('2017-1-1');
   //   //选择时间日历插件弹出
   //  $('.calendar').shijian({
   //  	 Hour:false,//是否显示小时
		 // Minute:false,//是否显示分钟
		 // // showNowTime:false,
   //      y:10,//当前年份+10
   //      okfun:function(data){
   //      	// new TipBox({type:'tip',str:'您的服务时间从<br>'+data+'开始',hasBtn:true,dbBtn:false,});
   //          // placeOrder.timeDoctor = data;
   //          console.log(data);
   //          $('.calendarinner').text(data);
   //          // localStorage.setItem('placeOrder', JSON.stringify(placeOrder));
   //      }
   //  })
   //地址的
    $('#detailsaddress').on('keyup',function(){
            localStorage.setItem('detailsaddress',$('#detailsaddress').val());
    })
    if(localStorage.getItem('detailsaddress')){
        $('#detailsaddress').val(localStorage.getItem('detailsaddress'));
    }
    $('#serviceaddress').change(function(){
      localStorage.setItem('serviceaddress',$('#serviceaddress').prop('selectedIndex'));
    })
    if(localStorage.getItem('serviceaddress')){
      $('#serviceaddress').prop('selectedIndex',localStorage.getItem('serviceaddress'));
    }
    //建档医院
    $('#dochospital').on('keyup',function(){
            localStorage.setItem('dochospital',$('#dochospital').val());
    })
    if(localStorage.getItem('dochospital')){
        $('#dochospital').val(localStorage.getItem('dochospital'));
    }
    //籍贯优先级 change改变时候可以多选城市
    // $('.choosearea').change(function(){
    // 		if($('.choosearea').val()=='likecity'){
    // 		    // $('.choosearea').hide();
    // 			$('.choosethree').show();
    			
    // 		}else{
    // 			$('.choosethree').hide();
    // 		}
    // })
    // city开始
		  var choosethreeindex=1;
		  var havechoosespanstr2='';//传给后台的城市名字
       $('.choosecitythree').on('touchstart', function() {
                                   ismove = false
                          })
        $('.choosecitythree').on('touchmove', function() {
                   ismove = true
          })
        $('.choosecitythree').on('touchend', function() {
             if (ismove) {
                      return
                  }
    		  	  choosethreeindex=1;
    		      $('.blockzhezhao,.alertcitychoose').show();
    		      $('.havechoose').remove();
    		      $('.seeallcitys,.havechoose').hide();
    		      $('.choosethreeself').after('<div class="havechoose"></div>');
       })
		  $('.choosethreeself').on('touchend',function(){
		  	  // alert($('.havechoose>span').length);
		       if(choosethreeindex%2!=0){
		          $('.seeallcitys,.citytips').show();
		       }
		       choosethreeindex++;
		  })
		  var ismove = false;
		    $('.seeallcitys>li').on('touchstart', function() {
                                 ismove = false
                        })
          $('.seeallcitys>li').on('touchmove', function() {
                     ismove = true
            })
		  $('.seeallcitys>li').on('touchend',function(){
		  	          if (ismove) {
		                    return
		                }
		  	              $('.havechoose').show();
			               if($('.havechoose>span').length==0){
			                   $('.havechoose').append('<span>'+$(this).text()+'</span>');
			               }
			               else if($('.havechoose>span').length==1){
                        if($(this).text()!=$('.havechoose span').eq(0).text()){
			                     $('.havechoose').append('<span>'+$(this).text()+'</span>');
                        }
			               }
			               else if($('.havechoose>span').length==2){
                         if($(this).text()!=$('.havechoose span').eq(0).text()&&$(this).text()!=$('.havechoose span').eq(1).text()){
                           $('.havechoose').append('<span>'+$(this).text()+'</span>');
                        }
			                   // $('.havechoose').append('<span>'+$(this).text()+'</span>');
			               }
                     // alert($('.havechoose span').text());
			              $('.havechoose>span').on('touchend',function(){
				               $(this).remove();
				               if($('.havechoose>span').length==0){
				               	   $('.havechoose').hide();
				               }
				          })  
				          ismove = false	 
		         })
		  $('.donotcarecity').on('touchend',function(){
		      $('.blockzhezhao,.alertcitychoose,.citytips').hide();
		       $('.havechoose').children('span').remove();
		       $('.wodetext').text('不限');
		     })
		   $('.cancelcitybtn,.blockzhezhao').on('touchend',function(){
		      $('.alertcitychoose,.blockzhezhao,.citytips').hide();
		      $('.havechoose').children('span').remove();
		      $('.wodetext').text('不限');
		  })
		   $('.confirmcitys').on('touchend',function(){
		       if($('.havechoose').html()==''){
		           $('.wodetext').text('不限');
		       }else{
			           var havechoosespanstr='';
			          $('.havechoose>span').each(function(){
			              havechoosespanstr+=$(this).text()+',';
			          })
			          havechoosespanstr=havechoosespanstr.substring(0,(havechoosespanstr.length-1));
			          if(havechoosespanstr){
			            $('.wodetext').text(havechoosespanstr);
			          }
			          else{
			            $('.wodetext').text('不限');
			          }
			          $('.alertcitychoose,.blockzhezhao,.citytips').hide();
		       }
		   })
    // cityend
    //点击获取输入的提交值
    var  flag=false;;
    $('.submituserinfo').on('touchend',function(){
      // // submituserinfoindex++;
      //  alert(2222);
    	var username=$('#truename').text();//姓名
    	var IDCard=$('.usersIDCard').text();//身份证
    	var duedate=$('.calendarinner').text();//预产期日历时间
      var morethreeday=(new Date()).getTime()+24*3600*1000*2;
      var lessfifteenday=(new Date()).getTime()+24*3600*1000*15;
      var yuchanqi=(new Date(duedate)).getTime();
    	var servicetype=$('#servicetype').attr('datatype');//服务类型
    	var servicecycle=$('#servicecycle').attr('slidetypedays');//服务周期
		  var yuchanqi=(new Date(duedate)).getTime();//预产期
    	var dochospital=$('#dochospital').val();//建档医院
    	var serviceaddress='北京市'+$('#serviceaddress').val()+$('#detailsaddress').val();//服务地址
    	var escortcity='';//护工籍贯优先 北京>湖北>江西
    	if($('.wodetext').text()=='不限'){
    		escortcity='';
    	}else{
    		escortcity=$('.wodetext').text();
    	}
    	var escortexperience=$('#escortexperience').attr('dataexperience');//护工工作经验 5年
	    	if($('#truename').text()=='请选择'){
	        	// new TipBox({type:'tip',iconStr:'填写周期',colorType:'month',str:"<p class='thirtySix'><span>请您在表单中填写姓名！</span></p>",Ok:'好的',hasBtn:true});
	        	new TipBox({type:'tip',iconStr:'填写姓名',colorType:'month',str:"<p class='thirtySix'><span>请您在表单中填写姓名！</span></p>",Ok:'好的',hasBtn:true});
	    	}
	    	else if($('.usersIDCard').text()=='请选择'){
	    		// new TipBox({type:'tip',str:'请填写身份证号码',hasBtn:true,dbBtn:false,});
	    		new TipBox({type:'tip',iconStr:'填写身份证号',colorType:'month',str:"<p class='thirtySix'><span>请您填写身份证号码!</span></p>",Ok:'好的',hasBtn:true});
	    		// console.log('a');
	    	}
	    	// else if(!(isIDCard.test($('.isIDCard').val()))){
	    	// 	new TipBox({type:'tip',iconStr:'填写错误',colorType:'month',str:"<p class='thirtySix'><span>身份证号码格式有误,请重试!</span></p>",Ok:'好的',hasBtn:true});
	    	// }
	    	else if($('#servicetype').attr('datatype')=='请选择'){
	    			new TipBox({type:'tip',iconStr:'请选择服务类型',colorType:'month',str:"<p class='thirtySix'><span>请您选择服务类型</span></p>",Ok:'好的',hasBtn:true});
	    	}
	    	else if(duedate=='请选择'){
	    			new TipBox({type:'tip',iconStr:'选择预产期',colorType:'month',str:"<p class='thirtySix'><span>请在表单中选择预产期</span></p>",Ok:'好的',hasBtn:true});
	    	}
        else if((yuchanqi<morethreeday)||(yuchanqi>lessfifteenday)){
            // alert('请写三天之后15日内的日期');
            new TipBox({type:'tip',iconStr:'预产期填写错误',colorType:'month',str:"<p class='thirtySix'><span>预产期请填写第3日-15日内的日期！</span></p>",Ok:'好的',hasBtn:true});
        }
	    	else if(($('#servicecycle').text()=='请选择')&&($('#servicetype').text()!='开奶师')){
	    			new TipBox({type:'tip',iconStr:'填写服务周期',colorType:'month',str:"<p class='thirtySix'><span>请您选择服务周期</span></p>",Ok:'好的',hasBtn:true});
	    	}
			 else if($('#dochospital').val()==''){
	    		new TipBox({type:'tip',iconStr:'填写建档医院',colorType:'month',str:"<p class='thirtySix'><span>请您在表单中填写建档医院！</span></p>",Ok:'好的',hasBtn:true});
	    	}
	    	else if($('#detailsaddress').val()==''){
	    		new TipBox({type:'tip',iconStr:'填写详情地址',colorType:'month',str:"<p class='thirtySix'><span>请您在表单中填写详情地址！</span></p>",Ok:'好的',hasBtn:true});
	    	}
	    	else if($('#escortexperience').text()=='请选择'&&($('#servicetype').text()!='开奶师')){
	    		new TipBox({type:'tip',iconStr:'请选择服务经验',colorType:'month',str:"<p class='thirtySix'><span>请您在表单中选择服务经验</span></p>",Ok:'好的',hasBtn:true});
	    	}
	    	else{
            if (flag) {
                return
            }
            flag=true;  
					    //点击跳转到候选页面
					    // $('.submituserinfo').on('touchend',function(){
					    	//生成数据json 用于发送
					    	var usersinfo={
					    		"SICKNAME":username,//姓名
					    		"IDCARD":IDCard,//身份证
					    		"DUEDATE":duedate,//预产期
					    		"SERVICETYPE":servicetype,//服务类型
					    		"SERVICECYCLE":servicecycle,//周期
					    		"DOCHOSPITAL":dochospital,//建档医院
					    		"SERVICEADDRESS":serviceaddress,//地址
					    		"DEPOSIT":0,//定金
                  "SECONDMONEY":0,//二批应付款
					    		"ESCORTCITY":escortcity,//月嫂籍贯城市
					    		"ESCORTEXPERIENCE":escortexperience//经验
                  // "ORDERCODE":""
					    	}
                // alert(JSON.stringify(usersinfo)); 
                //   if(($('#servicetype').text()=='开奶师')){
                //     $.ajax({
                //                  type: 'GET',
                //                  async:false,
                //                  url:'/appuser/ApplyPOSorderApi/getSysSetupValue?KEYCODE=KAINAISHI_PRICE',
                //                  success:function(price){
                //                        // alert(JSON.stringify(price.pd.VALUE));
                //                        kainaishiprice=price.pd.VALUE;
                //                  }
                //             })
                //     usersinfo={
                //     "SICKNAME":username,//姓名
                //     "IDCARD":IDCard,//身份证
                //     "DUEDATE":duedate,//预产期
                //     "SERVICETYPE":servicetype,//服务类型
                //     "DOCHOSPITAL":dochospital,//建档医院
                //     "SERVICEADDRESS":serviceaddress,//地址
                //     "REALMONEY":kainaishiprice
                //   }
                // }
					    	// alert(JianKang.TOKEN_ID);
					    	// if(JianKang.TOKEN_ID){
					    		//发送ajax开始
                  //
                   
                   // if(flag){
  					    	   $.ajax({
  					                       type: 'POST',
  					                       headers: {'hx_token': JianKang.TOKEN_ID},
  					                       // url:'/appuser/Shop/GetMyShoppingOrderList',
  					                       url:'/appuser/Matron/AddApplyMatron',
  					                       // dataType:'json',
  					                       data: usersinfo,//要发送的数据（参数）
  					                       success:function(data){
                                    // alert(JSON.stringify(data));
  				                                localStorage.removeItem('Personal');
                                          localStorage.removeItem('servicetype');
                                          localStorage.removeItem('escortexperience');
                                          localStorage.removeItem('servicecycle');
                                          localStorage.removeItem('calendarinner');
                                          localStorage.removeItem('detailsaddress');
                                          localStorage.removeItem('serviceaddress');
                                          localStorage.removeItem('dochospital');
                                          // delectyuesao();
  				                           			// if($('#servicetype').text()=='开奶师'){
  				                           			// 		location.href='../conment/payMethod.html?ORDERCODE=' + data.ORDERCODE +'&ordertype=kainaishi&APPLYMATRONLIST_ID='+data.APPLYMATRONLIST_ID;
  				                           			// }
  				                           			// else{
  				                           				  //ajax请求开始
              														    $.ajax({
              														               type: 'GET',
              														               headers: {'hx_token': JianKang.TOKEN_ID},
              														               // url:'/appuser/Shop/GetMyShoppingOrderList',
              														               url:'/appuser/Matron/GetEscortsMatronList?APPLYMATRONLIST_ID='+data.APPLYMATRONLIST_ID,
              														               // dataType:'json',
              														               // data: APPLYMATRONLIST_ID,//要发送的数据（参数）
              														               success:function(msg){
              														               	   var yuesaolength=msg.pd.length;
              														               	   // alert(yuesaolength);
              														               	   //点击出现挑选遮罩层
                    																	         $('.blockzhezhao,.zhezhaocontain').show();
                    																	         $('.closepage').on('touchend',function(){
                    																	    	      $('.blockzhezhao,.zhezhaocontain').hide();
                    																	    	      window.location.reload();
                                                                  // location.href='recommend.html?'+data.APPLYMATRONLIST_ID+'='+data.APPLYMATRONLIST_ID;
                    																	    	      // location.href='../conment/orderList.html';
                    																	           })
                    																	         //主要是根据订单的条件筛选出符合条件的数据来
                    																	         $('.yuesaolength').text(yuesaolength+'位');
                    																	         $('#submituserinfos').on('touchend',function(){
                    																	         	// location.href='recommend.html?data-id='+data.APPLYMATRONLIST_ID;
                    																	         	location.href='recommend.html?APPLYMATRONLIST_ID='+data.APPLYMATRONLIST_ID;
                    																	         })
                                                               flag = false;
              														                }
              														        })
  														                  //ajax请求结束
  				                           			// }
  					                       }
  					                 })
  			             		//发送ajax结束
                   // }//flag=1执行
                  //  else{
                  //   alert('请勿重复提交');
                  // }
	    	    }
    })
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
  