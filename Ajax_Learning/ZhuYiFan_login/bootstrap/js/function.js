//首页登录时使用的异步验证
function check_login_form(){
{
    $("loginbutton").attr({"disabled":"disabled"});
    var flag = false;
    username = $("#Usernane").val();
    pwd =  $("#password").val();
    var reg = new RegExp("^\\w*$"); // match/cleans the entry (spaces,...), for verifying entry

// this part we will copy-paste everywhere where there are entries
    if (!reg.test(username)) 
    {
        toastr.warning("username contains illegal characters", "Warning"); //pop up
        $("#Usernane").focus(); // focus on input
        return false;
    }
    if (!reg.test(pwd)) 
    {
        toastr.warning("password contains illegal characters", "Warning");
        $("#password").focus();
        return false;
    }
    
    data = {'u_name':username,'u_pw_hash':$.md5(pwd)}; //creating json file
    
    
    $.ajax({
        type : "post",
        data : data,
        async: false,
        url : "/ccpx/user/login",
        success : function(result){
            if (result.errno==0) { // parameter in their response
                toastr.success(result.rsm.token, "info");
                $.cookie('u_id',result.rsm.id);
                $.cookie('u_token',result.rsm.token);
                
                var i = $.cookie('u_id');
                var t = $.cookie('u_token');
                alert(i); //pop-up not necessary
                alert(t);
                location.href="HomePage.html"


            }else{
                toastr.warning(result.err, "Warning:CODE "+result.errno); //pop up
            }
        },
        error:function(){
            toastr.error("error", "error");
        }
    });
    return false;
    
    //toastr.warning(flag.toString(), "DEBUG");
    $("#loginButton").removeAttr("disabled");
    return flag;
}
}

















