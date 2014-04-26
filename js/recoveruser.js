var xmlHttp = GetXmlHttpObject();
var email;

function InitUsernameRecover()
{
	document.getElementById("RecoveryEmail").focus();
}

function checkValidateEnter(e)
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
		ValidateEmail(); 
	}
}

function checkRecoveryEnter(e)
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
		RecoverUsername(); 
	}
}

function ValidateEmail()
{
	var fault = 0;
	email = document.getElementById("RecoveryEmail").value;
	if(!xmlHttp)
	{
		alert("Your browser isn't ajax compatible.");
		return;
	}
	if(xmlHttp.readyState != 0 && xmlHttp.readyState != 4)//Already midprocessing. Override attempt.
		return;
	if(!email)
	{
		document.getElementById("RecoveryEmailFault").innerHTML="This field is mandatory.";
		fault = 1;
	}
	else
	{
		if(!ParseEmail(email))
		{
			document.getElementById("RecoveryEmailFault").innerHTML="Invalid email format.";
			fault = 1;
		}
		else
			document.getElementById("RecoveryEmailFault").innerHTML="";
	}

	if(fault)
		return;//Bad data
	else
	{//validate email
		var regsite = "php/validateemail.php?email="+email;
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
				if(!xmlHttp.responseText)
				{
					document.getElementById("RecoveryEmailFault").innerHTML="Process completed with errors.";
					document.getElementById("RecoveryAnswer").disabled=1;
					document.getElementById("EmailButton").className="btn btn-danger";
					document.getElementById("RecoveryButton").className= "btn btn-primary disabled";
					document.getElementById("RecoverySecurity").innerHTML= "";
					email = 0;
				}
				else if(xmlHttp.responseText == "invalid")
				{
					document.getElementById("RecoveryEmailFault").innerHTML="Email not registered.";	
					document.getElementById("RecoveryAnswer").disabled=1;
					document.getElementById("EmailButton").className="btn btn-warning";
					document.getElementById("RecoveryButton").className= "btn btn-primary disabled";
					document.getElementById("RecoverySecurity").innerHTML= "";
					email = 0;
				} 
				else
				{
					var secquestion = xmlHttp.responseText;
					document.getElementById("RecoveryEmailFault").innerHTML="";
					document.getElementById("RecoveryAnswer").disabled=0;
					document.getElementById("EmailButton").className= "btn btn-success";
					document.getElementById("RecoveryButton").className= "btn btn-primary";
					document.getElementById("RecoverySecurity").innerHTML= secquestion + "?";
				} 
				document.getElementById("EmailButton").innerHTML="Validate";
			}
		}
		document.getElementById("EmailButton").innerHTML="Initiating...";	      		    	
		document.getElementById("EmailButton").className="btn btn-warning disabled";	
		xmlHttp.send(null);
	}
}

function RecoverUsername()
{
	var fault = 0;
	var answer = document.getElementById("RecoveryAnswer").value;
	if(!email)
		return;
	if(!xmlHttp)
	{
		alert("Your browser isn't ajax compatible.");
		return;
	}
	if(xmlHttp.readyState != 0 && xmlHttp.readyState != 4)//Already midprocessing. Override attempt.
		return;
	if(!answer)
	{
		document.getElementById("RecoveryAnswerFault").innerHTML="This field is mandatory.";
		fault = 1;
	}
	else
		document.getElementById("RecoveryAnswerFault").innerHTML="";
	if(fault)
		return;//Bad data
	else
	{//send email for confirmation
		var regsite = "php/usernamereminder.php?email="+email+"&answer="+answer;
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
				if(xmlHttp.responseText == "failure")
				{
					document.getElementById("RecoveryAnswerFault").innerHTML="Incorrect security response!";
					document.getElementById("RecoveryButton").className="btn btn-warning";	
				}
				else if(xmlHttp.responseText == "success")
				{
					document.getElementById("RecoveryAnswerFault").innerHTML="Username sent to your email address!";
					document.getElementById("RecoveryButton").className="btn btn-success";	
				}
				else
				{
					document.getElementById("RecoveryAnswerFault").innerHTML="Process completed with errors.";
					document.getElementById("RecoveryButton").className="btn btn-danger";	
				}
				document.getElementById("RecoveryButton").innerHTML="Recover";
			}
		}
		document.getElementById("RecoveryButton").innerHTML="Initiating...";	      		    	
		document.getElementById("RecoveryButton").className="btn btn-warning disabled";	
		xmlHttp.send(null);
	}
}