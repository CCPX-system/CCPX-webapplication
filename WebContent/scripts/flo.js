function historyTable(){
	var id =getCookie("u_id");
	var token =getCookie("u_token");


// ------Test data----- //
//  	var result = 	{
// 				"err":"",
// 				"errno":0,
// 				"rsm":[
// 						{
// 							"recordId":100,
// 							"timeStamp":"14-12-1992",
// 							"sellerNameFrom":"Zara",
// 							"sellerNameTo":"AIR CHINA",
// 							"pointsFrom":100,
// 							"pointsTo":200,
// 							"user_from":"Jan"
// 						},
// 						{
// 							"recordId":101,
// 							"timeStamp":"25-10-1993",
// 							"sellerNameFrom":"Victoria's Secret",
// 							"sellerNameTo":"Decathlon",
// 							"pointsFrom":150,
// 							"pointsTo":250,
// 							"user_from":"Florence"
// 						}
// 					 ]
//             }
    $.ajax({
        type : "get",
        data : {'u_id':id,'u_token':token},
        async: false,
        url : "/ccpx/user/gethistory",
        success : function(result){
            if (result.errno==0) { 
				var i;
				$("#history").empty()
                $.each(result.rsm, function (index, val) {
                i = index + 1;
                $("#history").append("<tr><<td>"+val.recordId+"</td><td>"+val.timeStamp+"</td><td>"+val.sellerNameFrom+"</td><td>"+val.pointsFrom+"</td><td>"+val.pointsTo+"</td><td>"+val.sellerNameTo+"</td><td class='col-md-2'><img class='img-circle' src='img/bonus.png' width='50' height='50' /><a href='#'>"+val.user_from+"</a></td></tr>");			
                });
                return true;
            }
            else{
                toastr.warning(result.err, "Warning:CODE "+result.errno); //pop up
            }
        },
        error:function(){
            toastr.error("error", "error");
        }
    });

}
// function getlogo_sellerfrom(){
// 			var id =getCookie("INPUTsellerfrom");
// 			$.ajax({
// 			type : "post",
// 			dataType:"JSON",
// 			data : { id: id
// 			},
// 			async: false,
// 			url	: "info/getSellerProfile",
// 			success : function(result){
// 						$("#logosellerfrom").attr("src",result.seller_Logo);
// 				},
// 			error:function(){
// 					toastr.error("error", "error");
// 				}
// 			})
// 			}
// 			
// function getlogo_sellerto(){
// 			var id =getCookie("INPUTsellerto");
// 			$.ajax({
// 			type : "post",
// 			dataType:"JSON",
// 			data : { id: id
// 			},
// 			async: false,
// 			url	: "info/getSellerProfile",
// 			success : function(result){
// 						$("#logosellerto").attr("src",result.seller_Logo);
// 				},
// 			error:function(){
// 					toastr.error("error", "error");
// 				}
// 			})
			
function getSellerLogo(sellerId){
			$.ajax({
			type : "post",
			dataType:"JSON",
			data : { id: sellerId
			},
			async: false,
			url	: "info/getSellerProfile",
			success : function(result){
//						$("#logoSeller").attr("src",result.seller_Logo);
						return val.seller_Logo;
				},
			error:function(){
					toastr.error("error", "error");
				}
			})
			}
			}


function exchangesFound(){
	var sellerfrom = getCookie("INPUTsellerfrom");
	var sellerto = getCookie("INPUTsellerto");
	var pointsfrom = getCookie("INPUTpointsfrom");
	var pointsto = getCookie("INPUTpointsto");
	var id = getCookie("u_id");
	var token = getCookie("u_token");
	var logosellerto = getSellerLogo(sellerto);
	var logosellerfrom = getSellerLogo(sellerfrom);
	
// ------Test data----- //
//  	var result = 	{
// 				"err":"",
// 				"errno":0,
// 				"rsm":[
// 						{
// 							"points_from":100,
// 							"points_to":200,
// 							"user_from":"Jan"
// 						},
// 						{
//							"points_from":100,
// 							"points_to":200,
// 							"user_from":"Florence"
// 						}
// 					 ]
//             }
	
    $.ajax({
        type : "post",
        data : {'u_id':id,'u_token':token,'seller_from':sellerfrom,'seller_to':sellerto,'points_from':pointsfrom,'points_to':pointsto},
        async: false,
        url : "/ccpx/user/start_request",
        success : function(result){
            if (result.errno==0) { // parameter in their response
				$.cookie('u_id_from',result.rsm.user_from);
				var i;
                $.each(result.rsm, function (index, val) {
                i = index + 1;
                $("#exchangesFound").append("<tr><td class='col-md-1'></td><td class='col-md-2'><img id='"+logosellerfrom+"' class='img-rounded' width='50' height='50' /> <b>"+val.points_from+"</b> pts </td><td class='col-md-1'><br><i class='glyphicon glyphicon-circle-arrow-right'></i></td><td class='col-md-2'><img id='"+logosellerto+"' class='img-rounded' width='50' height='50' /><b>"+val.points_to+"</b> pts</td><td class='col-md-3'><img class='img-circle' src='img/bonus.png' width='50' height='50' /><a onclick='SeeUserProfile("+val.user_from+")'>"+val.user_from+"</a><td class='col-md-1'><button type='button' id='makerequest' class='btn btn-info btn-danger' ng-click='makeRequest("+val.r_id+")'><i class='glyphicon glyphicon-plus' style='color:black;'></i></button></td></tr>");			
                });
                return true;

            }else{
                toastr.warning(result.err, "Warning:CODE "+result.errno); //pop up
            }
        },
        error:function(){
            toastr.error("error", "error");
        }
    });

}

function makeRequest(offerId){
    $("makerequest").attr({"disabled":"disabled"});
    var flag = false;
    var id =getCookie("u_id");
	var token =getCookie("u_token");
    data = {'u_id':id,'u_token':token,'u_id_to':userFrom,'r_id':offerId}; //creating json file
    
    
    $.ajax({
        type : "post",
        data : data,
        async: false,
        url : "/ccpx/user/make_request",
        success : function(result){
            if (result.errno==0) { // parameter in their response
                toastr.success(result.rsm.token, "Request sent");
                alert('Request sent to the user successfully!');
                location.href="ExchangeStatus.html"


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
    $("#makerequest").removeAttr("disabled");
    return flag;
}


function loadNotif(){
	var id =getCookie("u_id");
	var token =getCookie("u_token");
	
	
//------Test data----- //
//  	var result = 	{
// 				"err":"",
// 				"errno":0,
// 				"rsm":[
// 						{
// 							"notifiId":69,
// 							"timeStamp":"25-10-1993",
// 							"content":"Free blowjob for all the Chinese guys born North of China given by:",
// 							"userId":"Mademoiselle Coco",
// 							"status":"Link here",
// 							"seen":0
// 						},
// 						{
// 							"notifiId":72,
// 							"timeStamp":"14-12-1994",
// 							"content":"Free blowjob for all the Chinese guys born South of China given by:",
// 							"userId":"Cerise de Groupama",
// 							"status":"Link here",
// 							"seen":1
// 						},
// 					 ]
//             }
	
	
	
    $.ajax({
        type : "get",
        data : {'u_id':id,'u_token':token},
        async: false,
        url : "/ccpx/user/Read_notification",
        success : function(result){
            if (result.errno==0) { 
            	var color = "color";
				var i;
				$("#notifTable").empty();	
                $.each(result.rsm, function (index, val) {
                i = index + 1;
                if (val.seen==1) {
            		color="success" }
            	else {
            		color="info" }	
                $("#notifTable").append("<tr class='"+color+"'><td class='col-md-1'><br><b>" +val.notifiId+ "</b></td><td class='col-md-1'><br><b>" +val.timeStamp +"</b></td><td class='col-md-1'><br><p>"+ val.content+ "</p></td><td class='col-md-2'><img class='img-circle' src='img/bonus.png' width='50' height='50' /><a href='#'>" +val.userId+ "</a></td><td class='col-md-1'><br><p>" + val.status+ "<p></td>");
                if (val.seen==0) {
                $("#notifTable").append("<td class='col-md-1'><br><div class='col-md-1 col-sm-2 col-xs-3'><button id='seenbutton' name='seenbutton' type='button' class='btn btn-primary center-block' onclick='return markedSeen("+ val.notifiId+ ")' > Marked as seen </button></div></td></tr>");}
                else {
                $("#notifTable").append("<td class='col-md-1'><br><b>Seen</b></td></tr>");
                }
                });
               return true;
            }else{
                toastr.warning(result.err, "Warning:CODE "+result.errno); //pop up
            }
        },
        error:function(){
            toastr.error("error", "error");
        }
    });
}

function markedSeen(notificationId){
	$("seenbutton").attr({"disabled":"disabled"});
    var flag = false;
    var id =getCookie("u_id");
	var token =getCookie("u_token");
    data = {'u_id':id,'u_token':token,'u_id_to':userFrom,'n_id':notificationId};  
    $.ajax({
        type : "post",
        data : data,
        async: false,
        url : "/ccpx/user/seen_notification",
        success : function(result){
            if (result.errno==0) { // parameter in their response
                toastr.success(result.rsm.token, "Marked as seen");
                location.href="Notification.html"


            }else{
                toastr.warning(result.err, "Warning:CODE "+result.errno); //pop up
            }
        },
        error:function(){
            toastr.error("error", "error");
        }
    });
    return false;
    $("#seenbutton").removeAttr("disabled");
    return flag;
}


function ShowUserProfile(){
		/* var  rsm =   {
						"userName":"Blabla",
						"userPicture":1,
						"wechatid":"CutePussy"
					}
				
				$("#userPicture").attr("src",result.rsm.userPicture);
				$("#userName").val(result.rsm.userName);
				$("#userWechat").text(result.rsm.userWechat);	*/
						
        		var id =getCookie("otheruserid");
        		$.ajax({
					type : "post",
					dataType:"JSON",
					data : { id: id
					},
					async: false,
					url	: "ccpx/user/getUserProfile",
					success : function(result){
								if (result.errno==0) { 
								$("#userPicture").attr("src",result.rsm.userPicture);
								$("#userName").val(result.rsm.userName);
								$("#userWechat").text(result.rsm.userWechat);
								var i;
								$("#pointsTable").empty();	
                				$.each(result.rsm.exchanges, function (index, val) {
                					var logosellerfrom = getSellerLogo(val.sellerfrom);
                					var logosellerto = getSellerLogo(val.sellerto);
                					i = index + 1;
                					$("#pointsTable").append("<tr><td class='col-md-1'></td><td class='col-md-2'><img class='img-rounded' src='"+val.logosellerfrom+"' width='50' height='50' /><b>"+val.pointsFrom+"</b>pts</td><td class='col-md-1'><br><i class='glyphicon glyphicon-circle-arrow-right'></i></td><td class='col-md-2'><img class='img-rounded' src='"+val.logosellerto+"' width='50' height='50' /><b>"+val.pointdFrom+"</b>pts</td><td class='col-md-3'><img class='img-circle' src='img/bonus.png' width='50' height='50' /><a onclick='SeeUserProfile("+result.rsm.username+")'>"+result.rsm.userName+"</a></td><td class='col-md-1'><button type='button' onclick='makerequest("+val.exchId+")' class='btn btn-info btn-danger'>Add</button></td></tr>");
                				});
                				$.cookie("otheruserid", null, { path: '/' });
                				}
                				else{
               					 toastr.warning(result.err, "Warning:CODE "+result.errno);
          						}
                				}
        		});
        		
function SeeUserProfile(data){
	setCookie("otheruserid",data);
	location.href="UserProfilePage.html";
	

}

function getUserExchangeOffers(){
 	var id =getCookie("u_id");
	var token =getCookie("u_token");
    data = {'u_id':id,'u_token':token};  
    $.ajax({
        type : "post",
        data : data,
        async: false,
        url : "/ccpx/user/seen_notification",
        success : function(result){
            if (result.errno==0) { // parameter in their response
            	var i;
				$("#exchangeOffersList").empty();	
                $.each(result.rsm, function (index, val) {
                i = index + 1;
                var img1;
            	var img2;
            	var img3;
            	var candiList = eval(val.candidates);
            	if (candiList.length==0){
            		img1="img/user.png";
            		img2="img/user.png";
            		img3="img/user.png";
            	}
            	if (candiList.length==1){
            		img1=val.candidates[0].userPicture;
            		img2="img/user.png";
            		img3="img/user.png";
            	}
            	if (candiList.length==2){
            		img1=val.candidates[0].userPicture;
            		img2=val.candidates[1].userPicture;
            		img3="img/user.png";
            	}
            	if (candiList.length==3){
            		img1=val.candidates[0].userPicture;
            		img2=val.candidates[1].userPicture;
            		img3=val.candidates[2].userPicture;
            	}
            	var logosellerfrom = getSellerLogo(val.sellerFrom);
                var logosellerto = getSellerLogo(val.sellerTo);
                $("#exchangeOffersList").append("<tr><td class='col-md-1'></td><td class='col-md-2'><img class='img-rounded' src='"+logosellerfrom+"' width='50' height='50' /><b>"+val.pointsFrom+"</b> pts</td><td class='col-md-1'><br><i class='glyphicon glyphicon-circle-arrow-right'></i></td><td class='col-md-2'><img class='img-rounded' src='"+logosellerto+"' width='50' height='50' /><b>"+val.pointsTo+"</b>pts</td><td class='col-md-3'><p>Candidates:<button type='button' onclick='goSelectPage("+val.offer_id+")' ' class='btn btn-success btn-xs' style='border-radius:50px;'><i class='glyphicon glyphicon-eye-open' ></i> &nbsp; select &nbsp; </button> </p><img class='img-circle' src='"+img1+"' width='50' height='50' /><img class='img-circle' src='"+img2+"' width='50' height='50' /><img class='img-circle' src='"+img3+"' width='50' height='50' /></td><td class='col-md-1'><button type='button' class='btn btn-danger btn-xs' style='border-radius:50px;' onclick='deleteOffer("+val.offer_id+")'><i class='glyphicon glyphicon-trash'></i></button></td></tr>")});
                }
            else{
                toastr.warning(result.err, "Warning:CODE "+result.errno); //pop up
            }
        },
        error:function(){
            toastr.error("error", "error");
        }
    });

function goSelectPage(offerID){
	setCookie("select_candidate_offer_id",offerID);
		location.href="SelectUserPage.html";

}


}
function getUserExchangeRequests(){
	var id =getCookie("u_id");
	var token =getCookie("u_token");
    data = {'u_id':id,'u_token':token};  
    $.ajax({
        type : "post",
        data : data,
        async: false,
        url : "/ccpx/user/seen_notification",
        success : function(result){
            if (result.errno==0) { // parameter in their response
            	var i;
				$("#exchangeRequestsList").empty();	
                $.each(result.rsm, function (index, val) {
                i = index + 1;
            	var logosellerfrom = getSellerLogo(val.sellerFrom);
                var logosellerto = getSellerLogo(val.sellerTo);
                $("#exchangeRequestsList").append("<tr><td class='col-md-1'></td><td class='col-md-2'><img class='img-rounded' src='"logosellerfrom"' width='50' height='50' /><b>"+val.pointsFrom+"</b>pts</td><td class='col-md-1'><br><i class='glyphicon glyphicon-circle-arrow-right'></i></td><td class='col-md-2'><img class="img-rounded" src='"+logosellerto+"' width='50' height='50' /><b>"+val.pointsTo+"</b>pts</td><td class='col-md-2'><img class='img-circle' src='"+userPartner_picture+"' width='50' height='50' /><a onclick='SeeUserProfile("+val.userPartner+")'>"+val.userPartner+"</a></td><td class='col-md-1'>"+val.status+"</td><td class='col-md-1'><button type='button' class='btn btn-danger btn-xs' style='border-radius:50px;' id='deleteOffer("+val.offer_id+")' name='deleteofferbutton'><i class='glyphicon glyphicon-trash'></i></button></td></tr>")}
                );
                }
            else{
                toastr.warning(result.err, "Warning:CODE "+result.errno); //pop up
            }
        },
        error:function(){
            toastr.error("error", "error");
        }
    });
}

function deleteOffer(offer_id){
	$("deleteofferbutton").attr({"disabled":"disabled"});
    var flag = false;
    var id =getCookie("u_id");
	var token =getCookie("u_token");
    data = {'u_id':id,'u_token':token,'offer_id':offer_id};  
    $.ajax({
        type : "post",
        data : data,
        async: false,
        url : "/ccpx/user/deleteOffer",
        success : function(result){
            if (result.errno==0) { // parameter in their response
                toastr.success(result.rsm.token, "Offer deleted!");
                location.href="ExchangeStatus.html"


            }else{
                toastr.warning(result.err, "Warning:CODE "+result.errno); //pop up
            }
        },
        error:function(){
            toastr.error("error", "error");
        }
    });
    return false;
    $("#deleteofferbutton").removeAttr("disabled");
    return flag;
}

function showCandidates(){
    		var offerId =getCookie("select_candidate_offer_id");
            $.ajax({
			type : "post",
			dataType:"JSON",
			data : {'offer_id': offerId
			},
			async: false,
			url	: "ccpx/user/showCandidate",
			success : function(result){
						if (result.errno==0) { 
						$("#PointsFrom").text("src",result.rsm.pointsFrom);
						$("#PointsTo").text("src",result.rsm.pointsTo);
						var logosellerfrom=getSellerLogo(result.rsm.sellerFrom);
						$("#logosellerfrom").attr("src",logosellerfrom);
						var logosellerto = getSellerLogo(result.rsm.sellerTo);
						$("#logosellerto").attr("src",logosellerto);
						var i;
						$("#candidatesTable").empty();	
						$.each(result.rsm.requests, function (index, val) {
							i = index + 1;
							$("#candidatesTable").append("<tr><td class='col-md-1'></td><td class='col-md-2'><img class='img-rounded' src='"+logosellerto+"' width='50' height='50' /><b>"+val.proposition+"</b>pts</td><td class='col-md-3'><p><img class='img-circle' src='"+val.candidatePicture+"' width='50' height='50' /><a onclick='SeeUserProfile("+val.candidate+")'>"+val.candidate+"</a></p><p>"+val.candidateWechat+"</p></td><td class='col-md-1'><button id='acceptRequestButton' type='button' class='btn btn-info btn-danger' onclick='accept_request("+val.request_id+")'> Accept </button></td><td id='rejectRequestButton' class='col-md-1'><button type='button' class='btn btn-info btn-danger' onclick='reject_request("+val.request_id+")'> Reject </button> </td> </tr> ");
						});
//						$.cookie("select_candidate_offer_id", null, { path: '/' });

						}
						else{
						 toastr.warning(result.err, "Warning:CODE "+result.errno);
						}
						}
			});
}

function accept_request(offer_id){
	$("acceptRequestButton").attr({"disabled":"disabled"});
    var flag = false;
    var id =getCookie("u_id");
    var token =getCookie("u_token");
    data = {'u_id':id,'u_token':token,'r_id':offer_id};  
    $.ajax({
        type : "post",
        data : data,
        async: false,
        url : "/ccpx/user/accept_request",
        success : function(result){
            if (result.errno==0) { // parameter in their response
                toastr.success(result.rsm.token, "Request accepted! Transaction complete!");
                location.href="HistoryPage.html"


            }else{
                toastr.warning(result.err, "Warning:CODE "+result.errno); //pop up
            }
        },
        error:function(){
            toastr.error("error", "error");
        }
    });
    return false;
    $("#acceptRequestButton").removeAttr("disabled");
    return flag;
}

function reject_request(offer_id){
	$("rejectRequestButton").attr({"disabled":"disabled"});
    var flag = false;
    var id =getCookie("u_id");
    var token =getCookie("u_token");
    data = {'u_id':id,'u_token':token,'r_id':offer_id};  
    $.ajax({
        type : "post",
        data : data,
        async: false,
        url : "/ccpx/user/accept_request",
        success : function(result){
            if (result.errno==0) { // parameter in their response
                toastr.success(result.rsm.token, "User rejected!");
                location.href="SelectUserPage.html"


            }else{
                toastr.warning(result.err, "Warning:CODE "+result.errno); //pop up
            }
        },
        error:function(){
            toastr.error("error", "error");
        }
    });
    return false;
    $("#rejectRequestButton").removeAttr("disabled");
    return flag;
}
