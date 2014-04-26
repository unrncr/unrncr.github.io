function InitLogin()
{
	document.getElementById("UsernameInput").focus();
	AllowLogin();
}

function AllowLogin()
{
	var user = document.getElementById("UsernameInput").value;
	var passwd = document.getElementById("PasswordInput").value;
	if(user && passwd)
	{
		document.getElementById("LoginButton").className = "btn btn-small btn-primary";
		return 1;
	}
	else
	{
		document.getElementById("LoginButton").className = "btn btn-small btn-primary disabled";
		return 0;
	}
}

function checkLoginEnter(e)
{ //e is event object passed from function invocation
	var characterCode;
	if(e && e.which)
	{ //if which property of event object is supported (NN4)
		e = e;
		characterCode = e.which; //character code is contained in NN4's which property
	}
	else
	{
		e = event;
		characterCode = e.keyCode; //character code is contained in IE's keyCode property
	}
	if(characterCode == 13)
	{ //if generated character code is equal to ascii 13 (if enter key)
		if(AllowLogin())
			LoginUser(); 
	}
}

function LoginUser()
{
	var user = document.getElementById("UsernameInput").value;
	var passwd = document.getElementById("PasswordInput").value;
	var email = 0;
	if(!xmlHttp || ((xmlHttp.readyState != 0) && (xmlHttp.readyState != 4)) )
	{//Already midprocessing. Override attempt.
		alert("Please wait until the process is completed.");
		return;
	}
	if(!AllowLogin())
		return;
	var regsite = "php/attemptlogin.php?user="+user+"&passwd="+passwd;
	xmlHttp.open("GET",regsite,true);
	xmlHttp.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 2000 00:00:00 GMT");
	xmlHttp.setRequestHeader("Cache-Control", "no-cache"); 

	if(!xmlHttp)
	{
		alert("Your browser is not AJAX compatible!");
		return;
	}
	xmlHttp.onreadystatechange=function()
	{  	
		if(xmlHttp.readyState==4)
		{
			var responseType = xmlHttp.responseText.split(":");
			if(responseType[0] == "complete")
			{
				document.getElementById("LoginButton").className = "btn btn-small btn-success";
				document.getElementById("LoginButton").innerHTML = "Success!";
				window.location.href="mychars.php?initsession="+responseType[1]; 	
			}
			else if(responseType[0] == "failure")
			{		
				document.getElementById("LoginButton").className = "btn btn-small btn-primary";
				document.getElementById("LoginButton").innerHTML = "Login";
			}
			else if(responseType[0] == "email")
			{
				document.getElementById("LoginButton").className = "btn btn-small btn-primary";
				document.getElementById("LoginButton").innerHTML = "Activation...";
				window.location.href="activateemail.php?email="+responseType[1]; 	
			}
			else
			{
				document.getElementById("LoginButton").className = "btn btn-small btn-danger";
				document.getElementById("LoginButton").innerHTML = responseType[0];
			}
		}
		else
		{
			document.getElementById("LoginButton").className = "btn btn-small btn-warning";
			document.getElementById("LoginButton").innerHTML = "Processing...";
		}
	}
	document.getElementById("LoginButton").className = "btn btn-small btn-warning disabled";
	document.getElementById("LoginButton").innerHTML = "Initiating...";
	xmlHttp.send(null);
}