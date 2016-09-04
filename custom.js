$(document).ready(function()
{
	var company_id = "1";
	getdata(company_id);
	
	function getdata(company_id)
	{
		$.post("http://www.webmaxinfotech.com/packagemgtapp/ajax_load.php",
			{
				task:"loadView",
				compid:company_id
			},
			function(data)
			{	
		  		$("#view").html(data);
			}
		);
	}
	
	$("body").on("click","button.reached",function()
	{
		$(this).attr("data-toggle","modal");
		$(this).attr("data-target","#myModal");
		$("#packageid").attr("value",$(this).prop("id"))
	});
	
	$("#updatepack").click(function()
	{
		var id = $("#packageid").prop("value");
		var rdate = $("#rdate").prop("value");
		if(rdate=="")
		{
			alert("Please Enter Reached Date");	
			$("#rdate").focus();
			return false;
		}
		
		$.post("http://www.webmaxinfotech.com/packagemgtapp/ajax_load.php",
			{
				task:"updateParcel",
				pid:id,
				rdate:rdate
			},
			function(data)
			{	
		  		alert(data);
				location.reload();
			}
		);
	});
	
	/*data submit*/
	$("#save").click(function()
	{
		var status = '';
		var fromcou = $("#fromcou");
		var fromstate = $("#fromstate");
		var fromcity = $("#fromcity");
		var tocou = $("#tocou");
		var tostate = $("#tostate");
		var tocity = $("#tocity");
		var pin = $("#txtpin");
		var courier = $("#courier");
		var weight = $("#txtweight");
		var ddate = $("#txtdate");
		var cmt = $("#comment");
		var err = $("#err");
		err.show();
		if(fromcou.prop("value")=="")
		{
			alert("Please Select From Country");
			err.text("Please Select From Country");
			fromcou.focus();
			return false;
		}
		if(fromstate.prop("value")=="")
		{
			alert("Please Select From State");
			err.text("Please Select From State");
			fromstate.focus();
			return false;
		}
		if(tocou.prop("value")=="")
		{
			alert("Please Select To Country");
			err.text("Please Select To Country");
			tocou.focus();
			return false;
		}
		if(tostate.prop("value")=="")
		{
			alert("Please Select To State");
			err.text("Please Select To State");
			tostate.focus();
			return false;
		}
		if(pin.prop("value")!="" && pin.prop("value").length!=6)
		{
			alert("Please Enter Valid Pincode");
			err.text("Please Enter Valid Pincode");
			pin.focus();
			return false;
		}
		if(courier.prop("value")=="")
		{
			alert("Please Select Courier");
			err.text("Please Select Courier");
			courier.focus();
			return false;
		}
		if(ddate.prop("value")=="")
		{
			alert("Please Select Date");
			err.text("Please Select Date");
			ddate.focus();
			return false;
		}
		err.hide();
		var res = "fromcou" +fromcou.prop("value")+ "\nfromstate" +fromstate.prop("value")+ "\nfromcity" +fromcity.prop("value")+ "\ntocou" +tocou.prop("value")+ "\ntostate" +tostate.prop("value")+ "\ntocity" +tocity.prop("value")+ "\npin" +pin.prop("value")+ "\ncourier" +courier.prop("value")+ "\nweight" +weight.prop("value")+ "\nddate" +ddate.prop("value")+ "\ncmt" +cmt.prop("value")+ "\ncompany_id" +company_id;
		//alert(res);
		$.post("http://www.webmaxinfotech.com/packagemgtapp/ajax_load.php",
			{
				task:"saveParcel",
				fromcou:fromcou.prop("value"),
				fromstate:fromstate.prop("value"),
				fromcity:fromcity.prop("value"),
				tocou:tocou.prop("value"),
				tostate:tostate.prop("value"),
				tocity:tocity.prop("value"),
				pin:pin.prop("value"),
				courier:courier.prop("value"),
				weight:weight.prop("value"),
				ddate:ddate.prop("value"),
				cmt:cmt.prop("value"),
				company_id:company_id
			},
			function(data)
			{	
		  		if(data.trim()=="1")
				{
					alert("Data Saved");
					window.location = "view.html";
				}
				else
					alert("something went wrong\n"+data);
			}
		);
		
		//alert("k");
	});
	/*data submit*/
	
	/*courier*/
	getcourier(company_id);
	
	function getcourier(company_id)
	{
		$.post("http://www.webmaxinfotech.com/packagemgtapp/ajax_load.php",
			{
				task:"loadCourier",
				compid:company_id
			},
			function(data)
			{	
		  		$("#courier").html(data);
			}
		);
	}
	/*courier*/
	
	/*location*/
	getcountry("fromcou");
	getcountry("tocou");

	$("#fromcou").change(function()
	{
		var couid = $("#fromcou").prop("value");
		getstate("fromstate",couid);
	});
	
	$("#fromstate").change(function()
	{
		var stateid = $("#fromstate").prop("value");
		getcity("fromcity",stateid);
	});
	
	$("#tocou").change(function()
	{
		var couid = $("#tocou").prop("value");
		getstate("tostate",couid);
	});
	
	$("#tostate").change(function()
	{
		var stateid = $("#tostate").prop("value");
		getcity("tocity",stateid);
	});

	function getcountry(ele_id)
	{
		$.post("http://www.webmaxinfotech.com/packagemgtapp/ajax_load.php",
			{
				task:"loadCountry"
			},
			function(data)
			{	
		  		$("#"+ele_id).append(data);
			}
		);
	}
	
	function getstate(ele_id,couid)
	{
		$.post("http://www.webmaxinfotech.com/packagemgtapp/ajax_load.php",
			{
				task:"loadState",
				cou:couid
			},
			function(data)
			{	
		  		$("#"+ele_id).html(data);
			}
		);
	}
	
	function getcity(ele_id,stateid)
	{
		$.post("http://www.webmaxinfotech.com/packagemgtapp/ajax_load.php",
			{
				task:"loadCity",
				state:stateid
			},
			function(data)
			{	
		  		$("#"+ele_id).html(data);
			}
		);
	}
	/*location*/
	
	/*animation*/
	setInterval(function()
	{
		var p1 = Math.floor((Math.random() * 255) + 1);
		var p2 = Math.floor((Math.random() * 255) + 1);
		var p3 = Math.floor((Math.random() * 255) + 1);
		
		var o = Math.round(((parseInt(p1) * 299) + (parseInt(p2) * 587) + (parseInt(p3) * 114)) /1000);
		
		if(o > 125) 
		{
			//console.log("r:"+p1+",g:"+p2+",b:"+p3+",light, more "+o);
			var col = rgb2hex(p1,p2,p3);
			var $div = $("body");
			var $a = $("a");
			
	      	$div.animate({"background-color": col}, 5000);
			$div.animate({"color":"#000"}, 250);
			//$a.animate({"color":"#000"}, 1000);
			
			var $b = $("button.btn3");
			$b.animate({"background-color": col}, 5000);
			$b.animate({"color":"#000"}, 250);
		}
		else
		{
			//console.log("r:"+p1+",g:"+p2+",b:"+p3+", dark, less "+o);
			var col = rgb2hex(p1,p2,p3);
			var $div = $("body");
			var $a = $("a");
	      	$div.animate({"background-color": col}, 5000);
			$div.animate({"color":"#fff"},250);
			//$a.animate({"color":"#fff"}, 1000);
			
			var $b = $("button.btn3");
			$b.animate({"background-color": col}, 5000);
			$b.animate({"color":"#fff"}, 250);
		}
	}, 2000);
	
	function rgb2hex(r,g,b)
	{
		var r = byte2Hex(r);
		var g = byte2Hex(g);
		var b = byte2Hex(b);
		var ret = '#' + r + g + b;
		
		if(ret!='#0364AE' && ret!='#4E3218' && ret!='#8E0999' && ret!='#0EE66F' && ret!='#F4C533' && ret!='#917B02' && ret!='#3BC5B8' && ret!='#896B8E' && ret!='#A28689' && ret!='#6751BD' && ret!='#9F036F' && ret!='#BAD6DB' && ret!='#FD4FF3' && ret!='#4BC63F' && ret!='#41B3D6' && ret!='#807D3B' && ret!='#3C2351' && ret!='#33C9E2' && ret!='#D22AA9' && ret!='#3E3284' && ret!='#590CAA' && ret!='#9D4DA8' && ret!='#B680CD' && ret!='#5889DA' && ret!='#0877C2' && ret!='#3EC2C6')
		{
			return ret;
		}
		else
		{
			console.log('ret');
			rgb2hex(r,g,b);
		}
	}
	
	function byte2Hex(n)
	{
		var nybHexString = "0123456789ABCDEF";
		return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
	}
	/*animation*/

});