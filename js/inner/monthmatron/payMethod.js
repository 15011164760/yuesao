var newORDERCODE;
var JianKang = JSON.parse(localStorage.getItem('JianKang') || '{}');
var openId = localStorage.getItem('openId');
var ua = navigator.userAgent.toLowerCase();
var payStyle = '';//支付方式
var walletOrderType='';//钱包支付订单类型
var isPay = false;//是否点击支付
function goToOrderPage(){}
function goBack2(){}
function appPay(orderCode,money,payType,orderType,charge){};
function boolsuccess(success){
            $('#time').html(success);
            if (success==1) {
                $('.blockzhezhao,.zhezhaocontain').show();//支付成功显示遮罩层
                if(GetQueryString('ordertype')=='shop'){
                    //点击到详情按钮触发函数
                    shopfunc();
                }else if(GetQueryString('ordertype')=='escort'){
                    ruhufunc();
                }else if(GetQueryString('ordertype')=='kainaishi'){
                    kainaishifunc();
                }else if(GetQueryString('ordertype')=='hospital'){
                    hospitalfunc();
                }else if(GetQueryString('ordertype')=='doctor'){
                    doctorfunc();
                }else if(GetQueryString('ordertype')=='wallet'){
                    walletfunc();
                }else if(GetQueryString('ordertype')=='money'){
                    if (/android/.test(ua)) {
                        window.jsi.goBack();
                    }else if (/iphone|ipad|ipod/.test(ua)) {
                        goBack();
                    }
                }
            }else if (success==2) {
                $('.zhezhaocontain2,.blockzhezhao2').show();
                $('html').on('touchend',function(){
                    if(GetQueryString('ordertype')=='shop'){
                        location.href='../shop/shoplistdetail.html?last=pay&GOODSORDER_ID='+GetQueryString('GOODSORDER_ID');
                    }
                    else if(GetQueryString('ordertype')=='escort'){
                        // window.location.href="../conment/orderList.html";
                        location.href='../escort/escortstatus.html?APPLYHOMEESCORTLIST_ID='+GetQueryString('APPLYHOMEESCORTLIST_ID');
                    }
                    else if(GetQueryString('ordertype')=='kainaishi'){
                        location.href='../escort/kainaishistatus.html?APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID');
                    }
                    else if(GetQueryString('ordertype')=='hospital'){
                        location.href='../hospitalChaperone/hospitalChaperoneForPay.html?APPLYINPATIENTESCORTLIST_ID='+GetQueryString('APPLYINPATIENTESCORTLIST_ID');
                    }else if(GetQueryString('ordertype')=='doctor'){
                        location.href='../accompanyDoctor/forPay.html?APPLYSEEDOCTORESCORTLIST_ID='+GetQueryString('APPLYSEEDOCTORESCORTLIST_ID');
                    }else if(GetQueryString('ordertype')=='wallet'){
                        $('html').on('touchend',function(){
                            window.location.href='../MyPage/wallet.html'; 
                        })
                    }else if(GetQueryString('ordertype')=='money'){
                        if (/android/.test(ua)) {
                            window.jsi.goBack();
                        }else if (/iphone|ipad|ipod/.test(ua)) {
                            goBack();
                        }
                    }
                })
            }else {
                if (/android/.test(ua)) {
                    window.jsi.goToOrderPage();
                }else if (/iphone|ipad|ipod/.test(ua)) {
                    goToOrderPage();
                }
            }
}
                     
$(function() {
    var ORDERCODE = GetQueryString('ORDERCODE');
    var REALMONEY = 0;

    $('.blockzhezhao,.zhezhaocontain').hide();
    $('.blockzhezhao2,.zhezhaocontain2').hide();

    // 返回
        if(ua.match(/MicroMessenger/i)=="micromessenger") {
            $('#header').hide();
        }
         $('#goBack').on('touchstart',function(){
            if(GetQueryString('ordertype')=='shop'){
                window.history.go(-1);//返回+刷新
            }else {
                 if (/android/.test(ua)) {
                        // window.jsi.goBack();
                        window.jsi.goToOrderPage();
                    }else if (/iphone|ipad|ipod/.test(ua)) {
                         // window.location.href="../conment/orderList.html";
                        // alert(22);
                        goToOrderPage();
                    };
            }
        })
    //支付方式
        if(ua.match(/MicroMessenger/i)=="micromessenger") {
            $('.zhifubao').hide();
            $('.lakala').hide();
            $('.wallet').hide();
        }
        if(GetQueryString('ordertype')=="wallet") {
            $('.wallet').hide();
        }
    
    
    if (GetQueryString('ordertype')=='hospital') {
        walletOrderType=20;
        $.ajax({
            url:"/appuser/Hospital/GetApplyInpatientEscortByID.do?APPLYINPATIENTESCORTLIST_ID="+GetQueryString('APPLYINPATIENTESCORTLIST_ID'),
            async: false,
            success:function(data){
                REALMONEY=data.pd.REALMONEY;
            }
        })
    }else if (GetQueryString('ordertype')=='doctor') {
        walletOrderType=30;
        $.ajax({
            url:"/appuser/Hospital/GetApplySeeDoctorEscortByID.do?APPLYSEEDOCTORESCORTLIST_ID="+GetQueryString('APPLYSEEDOCTORESCORTLIST_ID'),
            async: false,
            success:function(data){
                REALMONEY=data.pd.REALMONEY;
            }
        })
    }else if (GetQueryString('ordertype')=='shop') {
        walletOrderType=10;
        $.ajax({
            url:"/appuser/Shop/GetMyShoppingOrderItemByGOODSORDER_ID?GOODSORDER_ID="+GetQueryString('GOODSORDER_ID'),
            async: false,
            success:function(data){
                REALMONEY=data.pd.REALMONEY;
            }
        })
    }
    else if (GetQueryString('ordertype')=='escort') {  //入户
        walletOrderType=40;
        $.ajax({
            url:"/appuser/HomeEscort/GetApplyHomeEscortByID.do?APPLYHOMEESCORTLIST_ID="+GetQueryString('APPLYHOMEESCORTLIST_ID'),
            async: false,
            success:function(data){
                // alert(JSON.stringify(data));
                REALMONEY=data.pd.REALMONEY;
                REALMONEY=0.01;
                // REALMONEY=100;
                // alert('金额是'+REALMONEY);//金额是
            }
        })
    } else if (GetQueryString('ordertype')=='kainaishi') {  //开奶师
             REALMONEY=110;
    }else if (GetQueryString('ordertype')=='money') {
        walletOrderType=99;
        ORDERCODE = GetQueryString('ORDERCODE');
        REALMONEY = GetQueryString('REALMONEY');
    }else if (GetQueryString('ordertype')=='wallet') {
        walletOrderType='mc';
        ORDERCODE = GetQueryString('ORDERCODE');
        REALMONEY = GetQueryString('money');
        $('.ordermoney').text('￥'+GetQueryString('money'));
    }

    if (GetQueryString('STATE')==1||GetQueryString('STATE')==0) {
        $('#time').html(15);
    }else if (GetQueryString('STATE')==101) {
        $('#time').html(60);
    }
    $('.payMoney').text(returnFloat(parseFloat(REALMONEY*100)/100));
    $('#walletOrderMoney').text(returnFloat(parseFloat(REALMONEY*100)/100)+'元');
    $('.orderName').text(ORDERCODE);
    var COM = ''
    $('.weixin').on('touchend', function() {
        if (isPay) {
            return;
        }
        isPay = true;
        payStyle='微信';
        $('.paymethod').text('微信');
        if (ua.match(/MicroMessenger/i)=="micromessenger") {
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
                    // alert(JSON.parse(data.charge.credential.wechat_wap.jsApiParams))
                    ORDERCODE=data.ORDERCODE;
                    newORDERCODE=data.ORDERCODE;
                    $('.orderName').html(newORDERCODE);
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
                                        
                                        $('input').blur();
                                        if (res.err_msg == "get_brand_wcpay_request:ok") {
                                            $('.blockzhezhao,.zhezhaocontain').show();//支付成功显示遮罩层
                                            if(GetQueryString('ordertype')=='shop'){
                                                //点击到详情按钮触发函数
                                                shopfunc();
                                            }
                                            //入户
                                            else if(GetQueryString('ordertype')=='escort'){
                                                ruhufunc();
                                            }
                                            else if(GetQueryString('ordertype')=='kainaishi'){
                                                kainaishifunc();
                                            }
                                            else if(GetQueryString('ordertype')=='hospital'){
                                                hospitalfunc();
                                            }else if(GetQueryString('ordertype')=='doctor'){
                                                doctorfunc();
                                            }else if(GetQueryString('ordertype')=='money'){
                                                window.location.href='../conment/orderList.html';
                                            }
                                        }else{
                                            $('.zhezhaocontain2,.blockzhezhao2').show();
                                            $('.payfailure img').on('touchend',function(){
                                                 // GetQueryString('ORDERCODE')=newORDERCODE;
                                                 window.location.href='../conment/orderList.html';
                                            })
                                        }
                                    }
                                );
                            }
                            if (typeof WeixinJSBridge == "undefined") {
                                
                                if (document.addEventListener) {
                                    document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                                } else if (document.attachEvent) {
                                    document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                                    document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                                }
                            } else {
                                
                                onBridgeReady();
                            }
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    
                    new TipBox({type:'error',iconStr:'系统错误',colorType:'hospital',str:"<p class='thirtySix'><span>抱歉,由于系统原因出错了,请重新尝试操作</span></p>",Ok:'确定',hasBtn:true});
                }      
            })
        }else{
            $.ajax({
                url:'/appuser/lakalaPay/AppCharge',
                type:'POST',
                data:{
                    'REALMONEY':REALMONEY,
                    'ORDERCODE':ORDERCODE,
                    'CHANNEL':'wechat_app'
                },
                success:function(data){
                    console.log(data)
                    ORDERCODE=data.ORDERCODE;
                    newORDERCODE=data.ORDERCODE;
                    $('.orderName').html(newORDERCODE);
                    if (/android/.test(ua)) {
                        window.jsi.appPay(JSON.stringify(data.charge),REALMONEY,'weixin','jiazheng');
                    }else if (/iphone|ipad|ipod/.test(ua)) {
                        appPay(newORDERCODE,REALMONEY,'weixin','jiazheng',data.charge);
                    }
                    
                }
            })        
        }  
    })
    $('.zhifubao').on('touchend', function() {
        if (isPay) {
            return;
        }
        isPay = true;
        payStyle='支付宝';
        $('.paymethod').text('支付宝');
        $.ajax({
            url:'/appuser/lakalaPay/AppCharge',
            type:'POST',
            data:{
                'REALMONEY':REALMONEY,
                'ORDERCODE':ORDERCODE,
                'CHANNEL':'alipay_app'
            },
            success:function(data){
                console.log(data);
                ORDERCODE=data.ORDERCODE;
                $('.orderName').html(ORDERCODE);
                if (/android/.test(ua)) {
                    window.jsi.appPay(JSON.stringify(data.charge),REALMONEY,'zhifubao','jiazheng');
                }else if (/iphone|ipad|ipod/.test(ua)) {
                    appPay(ORDERCODE,REALMONEY,'zhifubao','jiazheng',data.charge);
                }
                
            }
        })  
    })
    $('.lakala').on('touchend', function() {
        if (isPay) {
            return;
        }
        isPay = true;
        payStyle='拉卡拉';
        $('.paymethod').text('拉卡拉');
        $.ajax({
            url:'/appuser/lakalaPay/AppCharge',
            type:'POST',
            data:{
                'REALMONEY':REALMONEY,
                'ORDERCODE':ORDERCODE,
                'CHANNEL':'lakala_app'
            },
            success:function(data){
                ORDERCODE=data.ORDERCODE;
                $('.orderName').html(ORDERCODE);
                if (/android/.test(ua)) {
                    window.jsi.appPay(JSON.stringify(data.charge),REALMONEY,'lakala','jiazheng');
                }else if (/iphone|ipad|ipod/.test(ua)) {
                    appPay(ORDERCODE,REALMONEY,'lakala','jiazheng',data.charge);
                }
                
            }
        }) 
    })
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
                        if (parseFloat($('.payMoney').text())>parseFloat($('#walletMoney').text())){
                            new TipBox({type:'tip',iconStr:'余额不足',colorType:'system',str:"<p class='thirtySix'>钱包余额不足，请充值！</p>",Ok:'确定',hasBtn:true,callBack:function(){
                                window.location.href='../MyPage/wallet.html';
                            }});
                        }else{
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
                                                            if(GetQueryString('ordertype')=='shop'){
                                                                shopfunc();
                                                            }else if(GetQueryString('ordertype')=='escort'){
                                                                ruhufunc();
                                                            }else if(GetQueryString('ordertype')=='kainaishi'){
                                                                kainaishifunc();
                                                            }else if(GetQueryString('ordertype')=='hospital'){
                                                                hospitalfunc();
                                                            }else if(GetQueryString('ordertype')=='doctor'){
                                                                doctorfunc();
                                                            }else if(GetQueryString('ordertype')=='wallet'){
                                                                walletfunc();
                                                            }else if(GetQueryString('ordertype')=='money'){
                                                                if (/android/.test(ua)) {
                                                                    window.jsi.goBack();
                                                                }else if (/iphone|ipad|ipod/.test(ua)) {
                                                                    goBack();
                                                                }
                                                            }
                                                        }else{
                                                            
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
                                                
                                                new TipBox({type:'tip',iconStr:'密码错误',colorType:'system',str:"<p class='thirtySix'>支付密码错误！</p>",Ok:'确定',hasBtn:true});
                                            }
                                        }
                                    })          
                                }    
                            })  
                        }
                            
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

}) 

 //商城成功的封装的函数shopfunc
    function shopfunc(){
        $.ajax({
            type: 'GET',
            headers: {'hx_token': JianKang.TOKEN_ID},
            url:'/appuser/Shop/GetMyShoppingOrderItemByGOODSORDER_ID?GOODSORDER_ID='+GetQueryString('GOODSORDER_ID'),
            success:function(msg){
                $('.ordercode').text(msg.pd.ORDERCODE);
                $('.username').text(msg.pd.NAME);
                $('.ordermoney').text('￥'+msg.pd.REALMONEY);
                $('html').on('touchend',function(){
                    location.href='../shop/shoplistdetail.html?last=pay&GOODSORDER_ID='+GetQueryString('GOODSORDER_ID');
                })
            }
        })
    }
     //开奶师的封装的函数
      function kainaishifunc(){
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
                            $('.ordermoney').text('￥'+msg.pd.REALMONEY);
                            $('html').on('touchend',function(){
                                location.href='../escort/kainaishiorderdetails.html?APPLYMATRONLIST_ID='+GetQueryString('APPLYMATRONLIST_ID');
                             })
                       }
                   })
    }
    //入户的封装的函数ruhufunc
    function ruhufunc(){
        $.ajax({
            type: 'GET',
            headers: {'hx_token': JianKang.TOKEN_ID},
            url:"/appuser/HomeEscort/GetApplyHomeEscortByID?APPLYHOMEESCORTLIST_ID="+GetQueryString('APPLYHOMEESCORTLIST_ID'),            
            success:function(msg){
                // alert(JSON.stringify(msg))
                $('.ordercode').text(msg.pd.ORDERCODE);
                $('.username').text(msg.pd.NAME);
                $('.ordermoney').text('￥'+msg.pd.REALMONEY);
                $('html').on('touchend',function(){
                    location.href='../escort/escortorderdetails.html?APPLYHOMEESCORTLIST_ID='+GetQueryString('APPLYHOMEESCORTLIST_ID');
                })
            }
        })
    }
//住院的封装的函数
    function hospitalfunc(){
        $.ajax({
            type: 'GET',
            headers: {'hx_token': JianKang.TOKEN_ID},
            url:'/appuser/Hospital/GetApplyInpatientEscortByID.do?APPLYINPATIENTESCORTLIST_ID='+GetQueryString('APPLYINPATIENTESCORTLIST_ID'),
            success:function(msg){
                $('.ordercode').text(msg.pd.ORDERCODE);
                $('.username').text(msg.pd.NAME);
                $('.ordermoney').text('￥'+msg.pd.ORDERMONEY);
                $('html').on('touchend',function(){
                    location.href='../hospitalChaperone/hospitalChaperoneService.html?APPLYINPATIENTESCORTLIST_ID='+GetQueryString('APPLYINPATIENTESCORTLIST_ID');
                })
            }
        })
    }
//就医的封装的函数
    function doctorfunc(){
        $.ajax({
            type: 'GET',
            headers: {'hx_token': JianKang.TOKEN_ID},
            url:'/appuser/Hospital/GetApplySeeDoctorEscortByID.do?APPLYSEEDOCTORESCORTLIST_ID='+GetQueryString('APPLYSEEDOCTORESCORTLIST_ID'),
            success:function(msg){
                $('.ordercode').text(msg.pd.ORDERCODE);
                $('.username').text(msg.pd.NAME);
                $('.ordermoney').text('￥'+msg.pd.ORDERMONEY);
                $('html').on('touchend',function(){
                    location.href='../accompanyDoctor/forService.html?APPLYSEEDOCTORESCORTLIST_ID='+GetQueryString('APPLYSEEDOCTORESCORTLIST_ID');
                })
            }
        })
    }
//钱包充值的封装的函数
    function walletfunc(){
        $('.ordercode').text($('.orderName').html());
        $('.username').text(payStyle);
        $('html').on('touchend',function(){
            window.location.href='../MyPage/wallet.html'; 
        })
    }