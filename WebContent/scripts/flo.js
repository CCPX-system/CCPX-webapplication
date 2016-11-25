function historyTable(){
	var id =getCookie("u_id");
	var token =getCookie("u_token");
    $.ajax({
        type : "post",
        data : {'u_id':id,'u_token':token},
        async: false,
        url : "/ccpx/user/login",
        success : function(result){
            if (result.errno==0) { // parameter in their response
				var i;
                $.each(data, function (index, val) {
                i = index + 1;
                $("#history").append("<tr><th scope='row'>1</th><td>"+val.rid+"</td><td>"+val.updateTime+"</td><td>"+val.SellerNameFrom+"</td><td>"+val.pointsFrom+"</td><td>"+val.pointsTo+"</td><td>"+val.SellerNameTo+"</td></tr>");			
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


function historyTable(){
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
        url : "/ccpx/user/login",
        success : function(result){
            if (result.errno==0) { // parameter in their response
				var i;
                $.each(data, function (index, val) {
                i = index + 1;
                $("#exchangesFound").append("<tr><td class='col-md-1'></td><td class='col-md-2'><img id='logosellerfrom' class='img-rounded' width='50' height='50' /> <b>"+val.points_from+"</b> pts </td><td class='col-md-1'><br><i class='glyphicon glyphicon-circle-arrow-right'></i></td><td class='col-md-2'><img id='logosellerto' class='img-rounded' width='50' height='50' /><b>"+val.points_to+"</b> pts</td><td class='col-md-3'><img class='img-circle' src='img/bonus.png' width='50' height='50' /><a href='#'>"+val.user_from+"</a><td class='col-md-1'><button type='button' class='btn btn-info btn-danger' ng-click='make_request()'><i class='glyphicon glyphicon-plus' style='color:black;'></i></button></td></tr>");			
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