
var db = null;
var cnt = 0;


function createDatabase()
{
	db = openDatabase("Notes","1.0","HTML5 Ex",200000);
	//alert("Database Created");
	createTable();
	cntRows();
	
	
}

function createTable()
{
	db.transaction(function (tx) 
	{
   		tx.executeSql('CREATE TABLE IF NOT EXISTS LOGS (id INTEGER, log TEXT)');
		cntRows();
		//alert("Table Created");
	});
}

function q(id,logname)
{
	db.transaction(function(tx) 
	{
		tx.executeSql('INSERT INTO LOGS (id,log) VALUES (?, ?)', [id, logname]);
	});
	alert("Logged In Successfully");
	setTimeout(function()
	{
  		window.location = 'index.html';
	}, 200);
}

function del()
{
	db.transaction(function(tx) { tx.executeSql('DELETE FROM LOGS ', []); });
}

function cntRows()
{
	db.transaction(function(tx) 
	{
		tx.executeSql('SELECT * FROM LOGS ', [], function (tx, results)
		{
		   	cnt = results.rows.length;			
			if(cnt > 0)
			{
				jQuery("#user").css("visibility","visible");
				jQuery("#alogin").attr("href","logout.html");
				jQuery("#alogin").html('<i class="nav-icon fa fa-lock"></i>Logout');
			}
			else if(cnt == 0)
			{
				jQuery("#user").css("visibility","hidden");
				jQuery("#alogin").attr("href","login.html");
				jQuery("#alogin").html('<i class="nav-icon fa fa-lock"></i>Login');
			}
	 	}, null);
	});
}



function insertData()
{
	db.transaction(function(tx) 
	{
   		var id = document.getElementById("contactEmailField").value;
		var logname = document.getElementById("contactPassField").value;
		//alert("id:"+id);
		tx.executeSql('SELECT * FROM LOGS ', [], function (tx, results)
		{
		   	var len = results.rows.length, i;
			if(len == 0)
			{
				//alert(id+"\n"+logname);
				q(id,logname);
			}
			else
			{
				if(confirm("An User Already Logged In \n Do You Want Logout Old User?"))
				{
					del();
					q(id,logname);
				}
				//alert("record exist");
				//				
			}
	 	}, null);
	});
}



function profile()
{
	db.transaction(function (tx)
	{
   		tx.executeSql('SELECT * FROM LOGS', [], function (tx, results)
		{
		   	var len = results.rows.length, i;
		   	
		   	for (i = 0; i < len; i++)
			{
				document.getElementById("id").value = results.rows.item(i).id;
				jQuery.post('http://generic.webbyinfotech.in/projs.php',
				{
					profile:true,
					id:results.rows.item(i).id
				},
				function(data)
				{
					data = data.split('$');
					//document.getElementById("id").value = results.rows.item(i).id;
					document.getElementById("contactNameField").value = data[0];
					document.getElementById("contactEmailField").value = data[1];
					document.getElementById("contactConField").value = data[2];
					document.getElementById("contactAddrField").value = data[3];
					jQuery("#loadingProfile").hide();
				}
				);
			  // 
			   
		   	}
			
	 	}, null);
	});
}

function project()
{
	db.transaction(function (tx)
	{
   		tx.executeSql('SELECT * FROM LOGS', [], function (tx, results)
		{
		   	var len = results.rows.length, i;
		   	
		   	for (i = 0; i < len; i++)
			{
				
				jQuery.post('http://generic.webbyinfotech.in/projs.php',
				{
					project:true,
					id:results.rows.item(i).id
				},
				function(data)
				{
					//alert(data);
					jQuery("#portfolioitems").html(data);
				}
				);
			  // 
			   
		   	}
			
	 	}, null);
	});
}

function query()
{
	db.transaction(function (tx)
	{
   		tx.executeSql('SELECT * FROM LOGS', [], function (tx, results)
		{
		   	var len = results.rows.length, i;
		   	
		   	for (i = 0; i < len; i++)
			{
				
				jQuery.post('http://generic.webbyinfotech.in/projs.php',
				{
					query:true,
					id:results.rows.item(i).id
				},
				function(data)
				{
					//alert(data);
					jQuery("#query").html(data);
				}
				);
			  // 
			   
		   	}
			
	 	}, null);
	});
}