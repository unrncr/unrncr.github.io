var xmlHttp = GetXmlHttpObject();
var validName = 0;

function InitRegister()
{
	document.getElementById("RegisterUser").focus();
}

function CheckUserNameAvailability()
{
	var user = document.getElementById("RegisterUser").value;
	if(!user || (user.length < 2))
	{
		validName = 0;
		document.getElementById("RegUserFault").innerHTML="Minimum 2 characters.";
		document.getElementById("RegUserFault").className="help-block";
		return;//Do nothing, no valid name yet.
	}
	if(!xmlHttp)
	{
		alert("Your browser is not AJAX compatible!");
		return;
	}
	if(xmlHttp.readyState != 0 && xmlHttp.readyState != 4)
		return;
	var regsite = "php/checkusernameavailability.php?username="+user;
	xmlHttp.open("GET",regsite,true);
	xmlHttp.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 2000 00:00:00 GMT");
	xmlHttp.setRequestHeader("Cache-Control", "no-cache"); 

	xmlHttp.onreadystatechange=function()
	{
		if(xmlHttp.readyState==4)
		{
			if(xmlHttp.responseText == "available")
			{
				document.getElementById("RegUserFault").innerHTML="This username is available.";
				document.getElementById("RegUserFault").className="text-success";
				validName = user;
			}
			else if(xmlHttp.responseText == "not available")
			{
				document.getElementById("RegUserFault").innerHTML="This username is unavailable!";
				document.getElementById("RegUserFault").className="text-warning";
				validName = 0;
			}
			else
			{
				document.getElementById("RegUserFault").innerHTML="The query completed with errors!";
				document.getElementById("RegUserFault").className="text-error";
				validName = 0;
			}
		}
		else
		{
			document.getElementById("RegUserFault").innerHTML="Checking Availability...";	
			document.getElementById("RegUserFault").className="muted";
		}
	}
	document.getElementById("RegUserFault").innerHTML="Initiating request...";	 
	document.getElementById("RegUserFault").className="muted";
	xmlHttp.send(null);
}

function RegisterUser()
{
	var user = document.getElementById("RegisterUser").value;
	var email = document.getElementById("RegisterEmail").value;
	var security = document.getElementById("RegisterQuestion").value;
	var answer = document.getElementById("RegisterAnswer").value;
	var passwd = document.getElementById("RegisterPassword").value;
	var conf = document.getElementById("RegisterConfirm").value;
	var phone = document.getElementById("RegisterPhone").value;
	var fault = 0;
	if(xmlHttp.readyState != 0 && xmlHttp.readyState != 4)//Already midprocessing. Override attempt.
		return;
	if(!user)
	{
		document.getElementById("RegUserFault").innerHTML="This field is mandatory.";
		document.getElementById("RegUserFault").className="text-error";
		fault = 1;
	}
	else if(user.length < 2)
	{
		document.getElementById("RegUserFault").innerHTML="Must be a minimum of 2 characters.";
		document.getElementById("RegUserFault").className="text-error";
		fault = 1;
	}
	else
	{
		CheckUserNameAvailability();//Mandatory check
		if(validName == 0)
			fault = 1;
	}
	if(!email)
	{
		document.getElementById("RegEmailFault").innerHTML="This field is mandatory.";
		document.getElementById("RegUserFault").className="text-error";
		fault = 1;
	}
	else
	{
		if(!ParseEmail(email))
		{
			document.getElementById("RegEmailFault").innerHTML="Invalid email format.";
			document.getElementById("RegEmailFault").className="text-error";
			fault = 1;			
		}
		else
		{
			document.getElementById("RegEmailFault").innerHTML="Ok";
			document.getElementById("RegEmailFault").className="help-block";
		}
	}
	if(!security)
	{
		document.getElementById("RegQuestionFault").innerHTML="This field is mandatory.";
		document.getElementById("RegQuestionFault").className="text-error";
		fault = 1;
	}
	else
	{
		document.getElementById("RegSecurityFault").innerHTML="Ok";
		document.getElementById("RegSecurityFault").className="help-block";
	}
	if(phone)
	{
		phone.replace("-","");
		document.getElementById("RegisterPhone").value = phone;
		if(!IsNumber(phone) || (phone.length < 10))
		{
			document.getElementById("RegPhoneFault").innerHTML="Invalid number of digits.";
			document.getElementById("RegPhoneFault").className="text-error";
			fault = 1;
		}
	}
	else
	{
		document.getElementById("RegPhoneFault").innerHTML="Ok";
		document.getElementById("RegPhoneFault").className="help-block";	
	}
	if(!answer)
	{
		document.getElementById("RegAnswerFault").innerHTML="This field is mandatory.";
		document.getElementById("RegAnswerFault").className="text-error";	
		fault = 1;
	}
	else
	{
		document.getElementById("RegAnswerFault").innerHTML="Ok";
		document.getElementById("RegAnswerFault").className="help-block";	
	}
	if(!passwd)
	{
		document.getElementById("RegPasswordFault").innerHTML="This field is mandatory.";
		document.getElementById("RegPasswordFault").className="text-error";	
		fault = 1;
	}
	else
	{
		if(passwd.length < 8)
		{
			document.getElementById("RegPasswordFault").innerHTML="Must be a minimum of 8 characters.";			
			document.getElementById("RegPasswordFault").className="text-error";	
			fault = 1;			
		}
		else if(!ParsePassword(passwd))
		{
			document.getElementById("RegPasswordFault").innerHTML="Must contain minimum 1 upper, lower, number, and misc.";			
			document.getElementById("RegPasswordFault").className="text-error";	
			fault = 1;
		}
		else
		{
			document.getElementById("RegPasswordFault").innerHTML="Ok";
			document.getElementById("RegPasswordFault").className="help-block";				
		}
	}
	if(!conf)
	{
		document.getElementById("RegConfirmFault").innerHTML="This field is mandatory.";
		document.getElementById("RegConfirmFault").className="text-error";	
		fault = 1;
	}		
	else
	{
		if(passwd != conf)
		{
			document.getElementById("RegConfirmFault").innerHTML="Fields mismatch!";
			document.getElementById("RegConfirmFault").className="text-error";	
			fault = 1;
		}
		else
		{
			document.getElementById("RegConfirmFault").innerHTML="Ok";
			document.getElementById("RegConfirmFault").className="help-block";	
		}
	}
	if(fault)
		return;
	else
	{//send email for confirmation
		var regsite = "php/emailregistration.php?user="+user+"&email="+email+"&security="+security+"&answer="+answer+"&passwd="+passwd+"&phone="+phone;
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
				if(xmlHttp.responseText == "ok")
				{
					document.getElementById("RegisterButton").innerHTML="Success!";
					document.getElementById("RegisterButton").className="btn btn-success";
					setTimeout(window.location.href="activateemail.php?email=" + email, 350); 	
				}
				else if(xmlHttp.responseText == "email failure")
				{
					document.getElementById("RegEmailFault").innerHTML="Email address already registered!";
					document.getElementById("RegEmailFault").className="text-error";
					document.getElementById("RegisterButton").innerHTML = "Register";
					document.getElementById("RegisterButton").className="btn btn-primary";
				}
				else
				{
					document.getElementById("RegisterButton").innerHTML="Errors!";
					document.getElementById("RegisterButton").className="btn btn-danger";
				}
			}
			else
			{
				document.getElementById("RegisterButton").innerHTML="Processing...";	      		    	
				document.getElementById("RegisterButton").className="btn btn-warning";
			}
		}
		document.getElementById("RegisterButton").innerHTML="Initiating...";	      		    	
		document.getElementById("RegisterButton").className="btn btn-warning disabled";
		xmlHttp.send(null);
	}
}

function checkRegisterEnter(e)
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
	if(characterCode == 13)//if generated character code is equal to ascii 13 (if enter key)
		RegisterUser(); 
}