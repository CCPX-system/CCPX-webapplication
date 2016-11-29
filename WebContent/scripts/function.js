/******************** quentin ************************/

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

function edit_profile(){
{
    //$("registerbutton").attr({"disabled":"disabled"});
    var flag = false;
    username = $("#Usernane").val();
    pwd =  $("#password").val();
	wechatid = $("wechatId").val();
	email = $("Email").val();
	/*phonenumber = $("PhoneNumber").val();*/
	oldpwd = $("useroldpassword").val();
	newpwd = $("userpassword").val();
	confirmpwd = $("confirmPassword").val();
	
    var reg = new RegExp("^\\w*$"); // match/cleans the entry (spaces,...), for verifying entry
	var filter = /^(([^<>()[]\.,;:s@"]+(.[^<>()[]\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/; // filter for email adress

// this part we will copy-paste everywhere where there are entries

	if (!filter.test(email.value)){
		toastr.warning("Your mail adress is not valid", "Warning");
        $("#Email").focus();
        return false;
	}
	/*
	if(!isNaN(phonenumber)){
		toastr.warning("Your phone number is not valid", "Warning");
        $("#PhoneNumber").focus();
        return false;
	}
	*/
    if (!reg.test(newpwd)) 
    {
        toastr.warning("password contains illegal characters", "Warning");
        $("#userpassword").focus();
        return false;
    }
	if(newpwd != confirmpwd)
	{
		toastr.warning("New password and Confirm password are different", "Warning");
        $("#userpassword").focus();
        return false;
	}
    
    data = {'wechat_id':wechatid,'new_pw_hash':$.md5(newpwd), 'email':email/*, 'phone_number':phonenumber*/}; //creating json file
    
    
    $.ajax({
        type : "post",
        data : data,
        async: false,
        url : "/ccpx/user/edit_profile", ///////////////////////// won't work because of this file
        success : function(result){
            if (result.errno==0) { // parameter in their response
                if($.md5(oldpwd) != getCookie("u_pw_hash")){ ///////////////////////////////////////////////get the value of the current password/////////////////////////////////////////////////
					toastr.warning("Your old password is not valid", "Warning");
					$("#useroldpassword").focus();
					return false;
				}else{
					toastr.success(result.rsm.token, "info");
					location.href="MyAccount.html"
				}
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


/******************************working*****************************/
function get_recent_activity(){
{
    $("makeoffer").attr({"disabled":"disabled"});
    var flag = false;
    sellerA = $("#selectbasic1").val();
    sellerB = $("#selectbasic2").val();

    data = {'seller-from':sellerA,'seller_to':sellerB}; //creating json file

    $.ajax({
        type : "get",
        data : data,
        async: false,
        url : "/ccpx/user/getReference",
        success : function(result){
				if (result.errno==0) { // parameter in their response
                toastr.success(result.rsm.token, "info");
				var rate_value = [];
				$.each(result.rsm, function (index, val){
					$("#recentActivityTable").append("<tr><td class='col-md-1'></td><td class='col-md-2'><img class='img-rounded' src='img/blue.png' width='50' height='50' /><b>" + result.rsm.points_from + "</b> pts</td><td class='col-md-1'><br><i class='glyphicon glyphicon-circle-arrow-right'></i></td><td class='col-md-2'><img class='img-rounded' src='img/blue.png' width='50' height='50'/><b>" + result.rsm.points_to + "</b> pts</td><td class='col-md-3'><img class='img-circle' src='img/bonus.png' width='50' height='50' /><a href='#'>" + result.rsm.user_from + "</a></td><td class='col-md-1'><br><i class='glyphicon glyphicon-circle-arrow-right'></i></td><td class='col-md-3'><img class='img-circle' src='img/bonus.png' width='50' height='50'/><a href='#'>' + result.rsm.user_to + '</a></td><td class='col-md-2'>time stamp</td></tr>");
					var a = (result.rsm.points_from)/(result.rsm.points_to);
					rate_value.push(a);
					return true;
				});
				Highcharts.chart('graphcontainer', {title: {text: 'Latest Exchanges',x: -20},subtitle: {text: '',x: -20},xAxis: {categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']},yAxis: {title: {text: 'Rates'},plotLines: [{value: 0,width: 1,color: '#808080'}]},tooltip: {valueSuffix: ''},legend: {},series: [{name: 'Rate evolution', data: rate_value }]});
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
/***********************************************************/


function get_profile(){
	var id = getCookie("u_id");
	var token = getCookie("u_token");
	$.ajax({
		type : "get",
		dataType:"JSON",
		data : {u_id: id, u_token: token},
		async: false,
		url	: "/ccpx/user/myprofile", 
		success : function(result){
			if (result.errno==0) { // parameter in their response
                toastr.success(result.rsm.token, "info");
				$.cookie('u_pw_hash',result.rsm.u_pw_hash);
				/*$("#userName").append(result.rsm.u_name);*/
				$("#wechatId").text(result.rsm.wechatid);
				$("#Email").text(result.rsm.u_email);
				/*$("#PhoneNumber").text(result.rsm."");*/
				$("#userpassword").text(result.rsm.u_pw_hash);
                location.href="MyAccount.html"
            }else{
                toastr.warning(result.err, "Warning:CODE "+result.errno); //pop up
            }
			
		},
		error:function(){
			toastr.error("error", "error");
		}
	})
}

 function getSellerInfo() {
	$.ajax({
		type: "POST",
		dataType:"JSON",
		url: "info/getSellerInfo",
		async: false,
		var i;
		success: function (data) {
			$.each(data, function (index, val) {
				$("#selectbasic1").append("<option value="+ i +">" + val.seller_Name + "</option>");
				$("#selectbasic2").append("<option value="+ i +">" + val.seller_Name + "</option>");
				i += 1;
			});
			return true;
		}     
	});
}

function find_an_offer(){
{
    $("submitbutton").attr({"disabled":"disabled"});
    var flag = false;
    seller_from = $("#selectbasic1").val();
    seller_to =  $("#selectbasic2").val();
	points_from = $("#pts").val();
    points_to =  $("#pts2").val();
	u_id = getCookie("u_id");
	u_token = getCookie("u_token");
    
    data = {'seller_from':seller_from,'seller_to':seller_to, 'points_from':points_from, 'points_to':points_to, 'u_id': u_id, 'u_token':u_token}; //creating json file
        
    $.ajax({
        type : "post",
        data : data,
        async: false,
        url : "/ccpx/user/find_an_offer", ///////////////////////// won't work because of this file
        success : function(result){
            if (result.errno==0) { // parameter in their response
				toastr.success(result.rsm.token, "info");
				location.href="ExchangesFound.html"
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

function make_an_offer(){
{
    $("findbutton").attr({"disabled":"disabled"});
    var flag = false;
    seller_from = $("#selectbasic1").val();
    seller_to =  $("#selectbasic2").val();
	points_from = $("#pts").val();
    points_to =  $("#pts2").val();
	u_id = getCookie("u_id");
	u_token = getCookie("u_token");
    
    data = {'seller_from':seller_from,'seller_to':seller_to, 'points_from':points_from, 'points_to':points_to, 'u_id': u_id, 'u_token':u_token}; //creating json file
        
    $.ajax({
        type : "post",
        data : data,
        async: false,
        url : "/ccpx/user/making_an_offer", 
        success : function(result){
            if (result.errno==0) { // parameter in their response
				toastr.success(result.rsm.token, "info");
				location.href="ExchangesFound.html"
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

 function logout() {
	 
	 var delete_cookie = function(name) {
		document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	};
	delete_cookie('u_id');
	delete_cookie('u_token');
	location.href="MainPage.html";
}








