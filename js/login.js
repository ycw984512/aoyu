/*
* @Author: Marte
* @Date:   2018-01-03 13:48:26
* @Last Modified by:   Marte
* @Last Modified time: 2018-01-03 14:08:52
*/

$(".login-wrapper .defaultBtn").click(function(){
    $(".login-wrapper .logway").text("您输入的用户名或密码有误，请重新输入!")
});
var  username = $("#loginform-username").val()||"";
var  password = $("#loginform-password").val()||"";
if(username || password ==""){
       $(".login-wrapper .logway").text("");
}


$(".resi").click(function(){
    $(".res").text("注册成功，请返回首页登录!")
});
