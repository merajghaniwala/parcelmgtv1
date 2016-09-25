//$(document).ready(function()
//{
	loadMenus();
	var company_id = "1";
	getdata(company_id);
	getCourierdata(company_id);
	
	
	function loadMenus()
	{
		$.post("http://www.webmaxinfotech.com/packagemgtapp/ajax_load.php",
			{
				task:"loadMenu",
			},
			function(data)
			{	
		  		$("#menu").html(data);
			}
		);
	}
	
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
	
	$("#report").click(function()
	{
		getreportdata(company_id);
	});
	
	function getreportdata(company_id)
	{
		var pin = $("#txtreportpin");
		if(pin.prop("value")=="")
		{
			alert("Please Enter Pincode");
			pin.focus();
			return false;
		}
		$.post("http://www.webmaxinfotech.com/packagemgtapp/ajax_load.php",
			{
				task:"loadReportView",
				compid:company_id,
				pin:pin.prop("value")
			},
			function(data)
			{	
				$("#report_body").html(data);
			}
		);
	}
	
	function getCourierdata(company_id)
	{
		$.post("http://www.webmaxinfotech.com/packagemgtapp/ajax_load.php",
			{
				task:"loadCourierView",
				compid:company_id
			},
			function(data)
			{	
		  		$("#viewCourier").html(data);
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
		var tno = $("#txttno");
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
		if(tno.prop("value")=="")
		{
			alert("Please Enter Tracking Number");
			err.text("Please Enter Tracking Number");
			tno.focus();
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
				tno:tno.prop("value"),
				cmt:cmt.prop("value"),
				company_id:company_id
			},
			function(data)
			{	
		  		if(data.trim()=="1")
				{
					alert("Data Saved");
					fromcou.attr("value","");
					fromstate.attr("value","");
					fromcity.attr("value","");
					tocou.attr("value","");
					tostate.attr("value","");
					tocity.attr("value","");
					pin.attr("value","");
					courier.attr("value","");
					weight.attr("value","");
					ddate.attr("value","");
					tno.attr("value","");
					cmt.attr("value","");
					window.location = "view.html";
				}
				else
					alert("something went wrong\n"+data);
			}
		);
		
		//alert("k");
	});
	
	$("#btnsavecou").click(function()
	{
		var couname = $("#txtcou");
		var coulink = $("#txtlink");
		var urlPattern = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/
		
		if(couname.prop("value")=="")
		{
			alert("Please Enter Courier Name");
			couname.focus();
			return false;
		}
		else if(coulink.prop("value")=="")
		{
			alert("Please Enter Courier Link");
			coulink.focus();
			return false;
		}
		else if(!coulink.prop("value").match(urlPattern))
		{
			alert("Please Enter Valid Courier Link");
			coulink.focus();
			return false;
		}
		else
		{
			var dupli = true;
			$.post("http://www.webmaxinfotech.com/packagemgtapp/ajax_load.php",
				{
					task:"checkCourier",
					courier:couname.prop("value"),
					compid:company_id
				},
				function(data)
				{	
					if(data=="0")
					{
						$.post("http://www.webmaxinfotech.com/packagemgtapp/ajax_load.php",
							{
								task:"saveCourier",
								courier:couname.prop("value"),
								link:coulink.prop("value"),
								compid:company_id
							},
							function(data)
							{	
								alert(data);
								window.location="index.html";
							}
						);
					}
					else
					{
						alert("Please Enter Another Courier Name");
						couname.focus();
						return false;
					}
				}
			);
			
		}
	});
	
	$("body").on("click","i.delparcel",function()
	{
		var id = $(this).prop("id");
		var con = confirm("Are You Sure You Want Delete ?");
		if(con)
		{
			$.post("http://www.webmaxinfotech.com/packagemgtapp/ajax_load.php",
				{
					task:"deleteParcel",
					pid:id
				},
				function(data)
				{	
					alert(data);
					getdata(company_id);
				}
			);
		}
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
	
	/*addcourier*/
	$("#addcourier").click(function()
	{
		$(this).attr("data-toggle","modal");
		$(this).attr("data-target","#myModalCourier");
	});
	
	$("#updatecou").click(function()
	{
		var couname = $("#newcou").prop("value");
		var coulink = $("#txtlink_m");
		var urlPattern = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/
		if(couname=="")
		{
			alert("Please Enter Courier Name");
			$("#newcou").focus();
			return false;
		}
		else if(coulink.prop("value")=="")
		{
			alert("Please Enter Courier Link");
			coulink.focus();
			return false;
		}
		else if(!coulink.prop("value").match(urlPattern))
		{
			alert("Please Enter Valid Courier Link");
			coulink.focus();
			return false;
		}
		else
		{
			var dupli = true;
			$.post("http://www.webmaxinfotech.com/packagemgtapp/ajax_load.php",
				{
					task:"checkCourier",
					courier:couname,
					compid:company_id
				},
				function(data)
				{	
					if(data=="0")
					{
						$.post("http://www.webmaxinfotech.com/packagemgtapp/ajax_load.php",
							{
								task:"saveCourier",
								courier:couname,
								link:coulink.prop("value"),
								compid:company_id
							},
							function(data)
							{	
								alert(data);
								getcourier(company_id);
								$('#myModalCourier').modal('hide');
							}
						);
					}
					else
					{
						alert("Please Enter Another Courier Name");
						$("#newcou").focus();
						return false;
					}
				}
			);
		}
	});
	/*addcourier*/
	
	/*location*/
	getcountry("fromcou");
	getcountry("tocou");

	$("#fromcou").click(function()
	{
		var couid = $("#fromcou").prop("value");
		if(couid!="")
			getstate("fromstate",couid);
	});
	
	$("#fromstate").click(function()
	{
		var stateid = $("#fromstate").prop("value");
		if(stateid!="")
			getcity("fromcity",stateid);
	});
	
	$("#tocou").change(function()
	{
		var couid = $("#tocou").prop("value");
		if(couid!="")
			getstate("tostate",couid);
	});
	
	$("#tostate").change(function()
	{
		var stateid = $("#tostate").prop("value");
		if(stateid!="")
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
	
	function setcou(ele_id,couid)
	{
		$.post("http://www.webmaxinfotech.com/packagemgtapp/ajax_load.php",
			{
				task:"loadCountry",
				couid:couid
			},
			function(data)
			{	
		  		$("#"+ele_id).append(data);
			}
		);
	}
	
	function setstate(ele_id,couid,sid)
	{
		$.post("http://www.webmaxinfotech.com/packagemgtapp/ajax_load.php",
			{
				task:"loadState",
				cou:couid,
				sid:sid
			},
			function(data)
			{	
		  		$("#"+ele_id).html(data);
			}
		);
	}
	
	function setcity(ele_id,stateid,cid)
	{
		$.post("http://www.webmaxinfotech.com/packagemgtapp/ajax_load.php",
			{
				task:"loadCity",
				state:stateid,
				cid:cid
			},
			function(data)
			{	
		  		$("#"+ele_id).html(data);
			}
		);
	}
	/*location*/
	
	$("#btngetfrompin").click(function()
	{
		var pin = $("#txtpinfrom").prop("value");
		if(pin=="")
		{
			alert("Please Enter Pincode");
			$("#txtpinfrom").focus();
			return false;
		}
		$.when(
		$.post("http://www.webmaxinfotech.com/packagemgtapp/ajax_load.php",
			{
				task:"loadallfrompin",
				pin:pin
			},
			function(data)
			{	
		  		console.log(data);
				if(data=="no")
				{
					alert("Please Enter Valid Pincode");
				}
				else
				{
					var res = data.split(":");
					var couid = (res[0].split("-"))[1];
					var stateid = (res[1].split("-"))[1];
					var cityid = (res[2].split("-"))[1];
					console.log(couid+"\n"+stateid+"\n"+cityid);
					setcou("fromcou",couid);
					setstate("fromstate",couid,stateid);
					setcity("fromcity",stateid,cityid);
				}
			}
		)
		);
	});
	
	$("#btngettopin").click(function()
	{
		var pin = $("#txtpin").prop("value");
		if(pin=="")
		{
			alert("Please Enter Pincode");
			$("#txtpin").focus();
			return false;
		}
		$.when(
		$.post("http://www.webmaxinfotech.com/packagemgtapp/ajax_load.php",
			{
				task:"loadallfrompin",
				pin:pin
			},
			function(data)
			{	
		  		console.log(data);
				if(data=="no")
				{
					alert("Please Enter Valid Pincode");
				}
				else
				{
					var res = data.split(":");
					var couid = (res[0].split("-"))[1];
					var stateid = (res[1].split("-"))[1];
					var cityid = (res[2].split("-"))[1];
					console.log(couid+"\n"+stateid+"\n"+cityid);
					setcou("tocou",couid);
					setstate("tostate",couid,stateid);
					setcity("tocity",stateid,cityid);
				}
			}
		)
		);
	});
	
	$("body").on("click","a.coulink",function(event)
	{
		var id = $(this).prop("id");
		var link = $(this).prop("name");
		var target = document.getElementById(id);
		copyToClipboard(document.getElementById(id));
		window.location.href=link;
	});
	
	function copyToClipboard(elem) {
	  // create hidden text element, if it doesn't already exist
		var targetId = "_hiddenCopyText_";
		var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
		var origSelectionStart, origSelectionEnd;
		if (isInput) {
			// can just use the original source element for the selection and copy
			target = elem;
			origSelectionStart = elem.selectionStart;
			origSelectionEnd = elem.selectionEnd;
		} else {
			// must use a temporary form element for the selection and copy
			target = document.getElementById(targetId);
			if (!target) {
				var target = document.createElement("textarea");
				target.style.position = "absolute";
				target.style.left = "-9999px";
				target.style.top = "0";
				target.id = targetId;
				document.body.appendChild(target);
			}
			target.textContent = elem.textContent;
		}
		// select the content
		var currentFocus = document.activeElement;
		target.focus();
		target.setSelectionRange(0, target.value.length);
		
		// copy the selection
		var succeed;
		try {
			  succeed = document.execCommand("copy");
		} catch(e) {
			succeed = false;
		}
		// restore original focus
		if (currentFocus && typeof currentFocus.focus === "function") {
			currentFocus.focus();
		}
		
		if (isInput) {
			// restore prior selection
			elem.setSelectionRange(origSelectionStart, origSelectionEnd);
		} else {
			// clear temporary content
			target.textContent = "";
		}
		return succeed;
	}
	/*animation	
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
			var $menu = $(".navanchor");
			
	      	
			$div.animate({"background-color": col}, 5000);
			
			$div.animate({"color":"#000"}, 250);
			$menu.animate({"color":"#000 !important"}, 250);
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
			var $menu = $(".navanchor");
			
	      	$div.animate({"background-color": col}, 5000);
			$div.animate({"color":"#fff"},250);
			$menu.animate({"color":"#fff !important"}, 250);
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

//});
