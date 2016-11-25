function historyTable(){
	var id =getCookie("u_id");
	var token =getCookie("u_token");
    $.ajax({
        type : "get",
        data : {'u_id':id,'u_token':token},
        async: false,
        url : "/ccpx/user/gethistory",
        success : function(result){
            if (result.errno==0) { // parameter in their response
				var i;
                $.each(result.rsm, function (index, val) {
                i = index + 1;
                $("#history").append("<tr><th scope='row'>1</th><td>"+val.recordId+"</td><td>"+val.timeStamp+"</td><td>"+val.SellerNameFrom+"</td><td>"+val.pointsFrom+"</td><td>"+val.pointsTo+"</td><td>"+val.SellerNameTo+"</td><td class='col-md-3'><img class='img-circle' src='img/bonus.png' width='50' height='50' /><a href='#'>"+val.user_from+"</a></td>
</tr>");			
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
function getlogo_sellerfrom(){
			var id =getCookie("INPUTsellerfrom");
			$.ajax({
			type : "post",
			dataType:"JSON",
			data : { id: id
			},
			async: false,
			url	: "info/getSellerProfile",
			success : function(result){
						$("#logosellerfrom").attr("src",result.seller_Logo);
				},
			error:function(){
					toastr.error("error", "error");
				}
			})
			}
			
function getlogo_sellerto(){
			var id =getCookie("INPUTsellerto");
			$.ajax({
			type : "post",
			dataType:"JSON",
			data : { id: id
			},
			async: false,
			url	: "info/getSellerProfile",
			success : function(result){
						$("#logosellerto").attr("src",result.seller_Logo);
				},
			error:function(){
					toastr.error("error", "error");
				}
			})
			}


function exchangesFound(){
	var sellerfrom = getCookie("INPUTsellerfrom");
	var sellerto = getCookie("INPUTsellerto");
	var pointsfrom = getCookie("INPUTpointsfrom");
	var pointsto = getCookie("INPUTpointsto");
	var id =getCookie("u_id");
	var token =getCookie("u_token");
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
                $("#exchangesFound").append("<tr><td class='col-md-1'></td><td class='col-md-2'><img id='logosellerfrom' class='img-rounded' width='50' height='50' /> <b>"+val.points_from+"</b> pts </td><td class='col-md-1'><br><i class='glyphicon glyphicon-circle-arrow-right'></i></td><td class='col-md-2'><img id='logosellerto' class='img-rounded' width='50' height='50' /><b>"+val.points_to+"</b> pts</td><td class='col-md-3'><img class='img-circle' src='img/bonus.png' width='50' height='50' /><a href='#'>"+val.user_from+"</a><td class='col-md-1'><button type='button' id='makerequest' class='btn btn-info btn-danger' ng-click='makeRequest("+val.user_from+")'><i class='glyphicon glyphicon-plus' style='color:black;'></i></button></td></tr>");			
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

function makeRequest(userFrom){
    $("makerequest").attr({"disabled":"disabled"});
    var flag = false;
    var id =getCookie("u_id");
	var token =getCookie("u_token");
    data = {'u_id':id,'u_token':token,'u_id_to':userFrom}; //creating json file
    
    
    $.ajax({
        type : "post",
        data : data,
        async: false,
        url : "/ccpx/user/make_request",
        success : function(result){
            if (result.errno==0) { // parameter in their response
                toastr.success(result.rsm.token, "Request sent");
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
    $.ajax({
        type : "get",
        data : {'u_id':id,'u_token':token},
        async: false,
        url : "/ccpx/user/Read_notification",
        success : function(result){
            if (result.errno==0) { // parameter in their response
            	var color = "color";
				var i;
                $.each(result.rsm, function (index, val) {
                i = index + 1;
                if val.seen=1 {
            		color="success" }
            	else {
            		color="info" }
                $("#notifTable").append("<tr class='"+color+"'><td class='col-md-1'><br><b>" +val.notifiId+ "</b></td><td class='col-md-1'><br><b>" +val.timeStamp +"</b></td><td class='col-md-1'><br><p>"+ val.content+ "</p></td><td class='col-md-2'><img class='img-circle' src='img/bonus.png' width='50' height='50' /><a href='#'>" +userId+ "</a></td><td class='col-md-1'><br><p>" + val.status+ "<p></td>");
                if val.seen=0 {
                $("#notifTable").append("<td class='col-md-1'><br><div class='col-md-2 col-sm-4 col-xs-6'><button id='seenbutton' name='seenbutton' type='button' class='btn btn-primary center-block' onclick='return markedSeen("+ val.notifiId+ ")' > Marked as seen </button></div></td></tr>");}
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


