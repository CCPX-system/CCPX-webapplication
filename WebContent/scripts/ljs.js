function getSellerInfoByIndustryID(id) {
            $.ajax({
                type: "POST",
                dataType:"JSON",
                url: "info/getSellerInfoByIndustryID",
                async: false,
                data: { id: id
                },
                success: function (data) {
                var i;
                $("#sellerInfo").empty();
                $.each(data, function (index, val) {
                i = index + 1;
                $("#sellerInfo").append("<tr><th scope='row'>"+i+"</th><td>"+val.seller_Name+"</td><td><img class='media-object' src='"+val.seller_Logo+"' alt='...' width='50px'></td><td>"+val.seller_Description+"</td></tr>");
                });
                return true;
                }     
            });
        }
 function getIndustryInfo() {
            $.ajax({
                type: "POST",
                dataType:"JSON",
                url: "info/getIndustryInfo",
                async: false,
                success: function (data) {
                $.each(data, function (index, val) {
                $("#industry").append("<div class='col-md-1 col-sm-2 col-xs-3 thumb'><button class='thumbnail center-block' style='overflow: hidden' id='"+val.industry_id+"' onClick ='getSellerInfoByIndustryID(this.id)'><img class='img-responsive' src='"+val.industryType_Logo+"'></button></div>");
                });
                return true;
                }     
            });
        }
 function getSellerInfo() {
            $.ajax({
                type: "POST",
                dataType:"JSON",
                url: "info/getSellerInfo",
                async: false,
                success: function (data) {
                var i;
                $.each(data, function (index, val) {
                i = index + 1;
                $("#sellerInfo").append("<tr><th scope='row'>"+i+"</th><td>"+val.seller_Name+"</td><td><img class='media-object' src='"+val.seller_Logo+"' alt='...' width='50px'></td><td>"+val.seller_Description+"</td></tr>");
                });
                return true;
                }     
            });
        }
 
 
 
 function validateSeller_Username() {
		 var uname=document.getElementById("username").value;
		 if(uname.length < 3 || uname.length > 20) {
				$("#usernameError").text("Length must be between 3~20!");
				showError($("#usernameError"));
				return false;
			}
		 else{
$.ajax({
	 type: "POST",
    dataType:"JSON",
    url: "seller/validateSeller_Username",
    async: false,
    data: {username: uname
    },
	success:function (data) {
		if(data.message == "exist") {
			$("#usernameError").text("Username already exist!");
			document.getElementById("usernameError").style.color="Red";
			return false;
		}else{
			$("#usernameError").text("User name available.");
			document.getElementById("usernameError").style.color="Green";
			return true;
		}
	}
});
		 }
}

 

 
 
function TipForUsername(){
$("#usernameError").text("Input username.");
document.getElementById("usernameError").style.color="Black";
}

function getValidateResult(){
	var result = document.getElementById("usernameError");
	if(result=="User name available."){
		return true;
	}else{
		return false;
	}
	}

function searchByKey(x)
{
var keyword=document.getElementById(x).value;
            $.ajax({
                type: "POST",
                dataType:"JSON",
                url: "info/getSellerInfoByKeyWord",
                async: false,
                data: { keyword: keyword
                },
                success: function (data) {
                var i;
                $("#sellerInfo").empty();
                $.each(data, function (index, val) {
                i = index + 1;
                $("#sellerInfo").append("<tr><th scope='row'>"+i+"</th><td>"+val.seller_Name+"</td><td><img class='media-object' src='"+val.seller_Logo+"' alt='...' width='50px'></td><td>"+val.seller_Description+"</td></tr>");
                });
                return true;
                }   
            });
}



function registSeller() {
    var seller_Name=document.getElementById("seller_Name").value;  
    var seller_Address=document.getElementById("Address").value;  
    var seller_Telephone=document.getElementById("Telephone").value;  
    var seller_Email=document.getElementById("Email").value;  
    var seller_Username=document.getElementById("username").value;
    var seller_Password=document.getElementById("userpassword").value;  
    var industryType_id=document.getElementById("Industry").value; 
    var seller_Description=document.getElementById("Description").value; 
        $.ajaxFileUpload({
            type: "POST",
            dataType:"text",
            url: "seller/registSeller",
            secureuri : false,
            fileElementId : "Logo",
            async: false,
            data: {
            seller_Name:seller_Name,
            seller_Address:seller_Address,
            seller_Telephone:seller_Telephone,
            seller_Email:seller_Email,
            seller_Username:seller_Username,
            seller_Password:seller_Password,
            industryType_id:industryType_id,
            seller_Description:seller_Description
            },
            success: function (data) {//返回数据的数据不能用object形式读，ajaxFileUpload代码有问题
            	if(data=="success"){
            	location.href="PayMemberFee.html";
            	}
            	else if(data=="false_exception"){
            		alert("system exceptions! Please try again.");
            	}else if(data=="false_format_not_correct"){
            		alert("Image format is not correct!");
            	}else if(data=="false_type_null"){
            		alert("File format cannot be empty!");
            	}else if(data=="false_size_too_big")
            		alert("The picture is too big!");
            	}
        });
    }

function checkSeller() {
 var uname=document.getElementById("ID").value;  // 找到元素
 var passwd=document.getElementById("password").value;  // 找到元素
 if (uname == "") {
     alert("Username cannot be empty");
     return false;
 }
 else if (passwd == "") {
     alert("Password cannot be empty");
     return false;
 }
 else {
     $.ajax({
         type: "POST",
         dataType:"JSON",
         url: "seller/checkSeller",
         async: false,
         data: { username: uname,
             password: passwd
         },
         success: function (data) {
             if (data.message == "success") {
                 setCookie("sellerid",data.sellerid);
                 setCookie("sellername",data.sellername);
                 location.href="HomePageSeller.html";
                 //location.href="ListOfSellersPage.jsp";
             }
             else{
             alert(data.message);
             return false;
             }
         }
     });
 }
 } 


function setCookie(name,value)
{
var Days = 30;
var exp = new Date();
exp.setTime(exp.getTime() + Days*24*60*60*1000);
document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

function getCookie(name)
{
var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
if(arr=document.cookie.match(reg))
return unescape(arr[2]);
else
return null;
}

function delCookie(name)
{
var exp = new Date();
exp.setTime(exp.getTime() - 1);
var cval=getCookie(name);
if(cval!=null)
document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}

function updateProfile()
{

    var updateName = document.getElementById("seller_Name").value;
//     if (updateName==null)
// 		updateName = SellerName;
		 
    var updateUserName = document.getElementById("seller_Username").value;
// 	if (updateUsername==null)
// 		updateUserName = Seller_username;      
		
    var updateDescription = document.getElementById("seller_Description").value;   	
// 	if (updateDescription==null)
// 		updateDescription = SellerDescription;
		
    var updateEmail = document.getElementById("seller_Email").value;  
//     if (updateEmail==null)
// 		updateEmail = SellerEmail;
		
    var updatePhone = document.getElementById("seller_Phone").value;
// 	if (updatePhone==null)
// 		updatePhone = SellerPhone; 
		 
	var updateAddress = document.getElementbyId("seller_Address").value; 
//     if (updateAddress==null)
// 		updateAddress = SellerAddress;
		
    var updatePassword = document.getElementById("seller_Password").value;
// 	if (updatePassword==null)
// 		updatePassword = SellerPassword;
		
    var updateIndustryType= document.getElementById("seller_Type").value;  
//  	if (updateType==null)
// 		updateIndustry = IndustryTypeId;   
  
    $.ajaxFileUpload({
            type: "POST",
            dataType:"text",
            url: "seller/updateUserinfo",
            secureuri : false,
            fileElementId : "updateLogo",
            async: false,
            data: {
            seller_Name:updateName,
            seller_Address:updateAddress,
            seller_Telephone:updateTelephone,
            seller_Email:updateEmail,
            seller_Username:updateUsername,
            seller_Password:updatePassword,
            industryType_id:updateIndustry,
            seller_Description:updateDescription
            },
            success: function (data) {//返回数据的数据不能用object形式读，ajaxFileUpload代码有问题
            	if(data=="success"){
            	location.href="BusinessProfile.html";
            	}
            	else if(data=="false_exception"){
            		alert("system exceptions! Please try again.");
            	}else if(data=="false_format_not_correct"){
            		alert("Image format is not correct!");
            	}else if(data=="false_type_null"){
            		alert("File format cannot be empty!");
            	}else if(data=="false_size_too_big")
            		alert("The picture is too big!");
            	}
        });
    }
        
 function IndustryTypeDropdown() {
            $.ajax({
                type: "POST",
                dataType:"JSON",
                url: "info/getIndustryInfo",
                async: false,
                success: function (data) {
//                 $("#industryDrop").append("<select id='UpdateType' name='selectbasic1' class='form-control'>")
                var i;
                $("#industryDrop").append("<option value='zero'> Select new type </option>")
                $.each(data, function (index, val) {
                i = index + 1;
                $("#industryDrop").append("<option value='"+val.industry_id+"'>"+val.industry_name+" </option>")
                });
//                $("#industryDrop").append("</select>")
                return true;
                }     
            });
        }
        
        
function ShowProfile(){
        		var id =getCookie("sellerid");
        		$.ajax({
        		type : "post",
        		dataType:"JSON",
        		data : { id: id
                },
        		async: false,
        		url	: "info/getSellerProfile",
        		success : function(result){
							$("#companyLogo").attr("src",result.seller_Logo);
							$("#sellerName").text(result.seller_Name);
							$("#sellerType").text(result.industryType_id);
							$("#Seller_userName").text(result.seller_Username);
							$("#sellerEmail").text(result.seller_Email);
							$("#sellerDescription").text(result.seller_Description);
							$("#sellerPhone").text(result.seller_Telephone);
							$("#sellerAddress").text(result.seller_Address);
							$("#sellerPassword").text(result.seller_Password);
					},
				error:function(){
						toastr.error("error", "error");
					}
        		})
        		}