$(document).ready(function(){

    /********** 注册 begin **********/

    //关于获取手机短信验证
    $(document).on("click","._zh_signForm .msgcap.active",function(){
        var inputPhone = $("input[flag='phone']"),
            inputIdCode = $("input[flag='capture']");

        var phoneNum= $.trim(inputPhone.val()),capNum=$.trim(inputIdCode.val());
        var phone_err = getCheckMsg(phoneNum,'phone');
        var cap_erro = getCheckMsg(capNum,'capture');
        if(phone_err!='' || cap_erro!=''){
            if(phone_err!=''){
                inputPhone.parent().next().text(phone_err);
                inputPhone.css({'border': '1px solid #d8535a'});
            }
            if(cap_erro!=''){
                inputIdCode.parent().next().text(cap_erro);
                inputIdCode.css({'border': '1px solid #d8535a'});
            }
            //清空、刷新验证码
            inputIdCode.val('');
            $('#sig_form .codeImg').trigger('click');
            return;
        }else{
            //手机、验证码 前端验证成功后
            getMsgCode(phoneNum,capNum);
        }
    });


    //当输入框获得焦点
    $("#sig_form .form-group input").focus(function(){
        $(this).css({'border': '1px solid #ccc'});
        $(this).parent().parent().find(".help-block").html("");
    });

    //当输入框失去焦点
    $("#sig_form .form-group input").blur(function(){
        var flag = $(this).attr("flag");

        var result=getCheckMsg($.trim($(this).val()),flag);
        if(result!=''){
            $(this).css({'border': '1px solid #d8535a'});
        }else{
            $(this).css({'border': '1px solid #69bd90'});
        }
        $(this).parent().parent().find('.help-block').html(result);

    });
    /********** 注册 end **********/

});
 function getCheckMsg(val,type){
     var result;
    switch (type){
        case 'capture':
            if (!val) {
                result = '验证码不能为空';
            }else{
                var reg_capture = /^[a-zA-Z0-9]+$/;
                if(!reg_capture.test(val)){
                    result ='验证码输入不正确';
                }else{
                    result = '';
                }
            }
            break;
        case 'phone':
            if (!val) {
                result = '验证手机不能为空';
            }else{
                var reg_phone = /^((13[0-9])|(15[^4,\D])|(18[0-9])|(17[0-9]))\d{8}$/;
                if(!reg_phone.test(val)){
                    result ='您的验证手机号输入不正确';
                }else{
                    result = '';
                }
            }
            break;
    }
    return result;

 }

 //倒计时
 function fnCountDown(obj,maxtime){
     obj.text(maxtime+'秒后重新获取');
     if(maxtime==0){
         clearTimeout(sT_CountDown);
         obj.addClass('active');
         obj.text('获取短信验证码');
         return;
     }else{
         sT_CountDown = setTimeout(function(){
             fnCountDown(obj,maxtime);
         },1000);
     }
     maxtime--;
 }

 //获取短信验证码
 function getMsgCode(phoneNum,capNum){
     $.ajax({
         url:'/site/send',
         dataType:'json',
         data:{
             mobile:phoneNum,
             capture:capNum
         },
         success:function(res){
             if(res.code == '0'){
                 $("input[flag='msgcode']").parent().next().html('<span style="color: green;">'+res.msg+'</span>');
                 $("#sig_form .msgcap").removeClass('active');
                 fnCountDown($("#sig_form .msgcap"),res.time);
             }else{
                 $("input[flag='msgcode']").parent().next().text(res.msg);
                 $("input[flag='capture']").css({'border': '1px solid #d8535a'});
                 $("input[flag='capture']").val('');
                 $('#sig_form .codeImg').trigger('click');
             }
         }
     });
 }