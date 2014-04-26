<!DOCTYPE html>
<html lang="en">
	<head>
		<title>Surukenza: Registration</title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link href="bootstrap/css/bootstrap.min.css" rel="stylesheet" media="screen">
		<link href="bootstrap/css/bootstrap.css" rel="stylesheet" media="screen">
		<script src="http://code.jquery.com/jquery.js"></script>
		<script src="bootstrap/js/bootstrap.min.js"></script>
		<script src="js/xmlhttp.js"></script>
		<script type="text/javascript" src="js/include/validation.js"></script>
		<script type="text/javascript" src="js/loginuser.js"></script>
		<script type="text/javascript" src="js/register.js"></script>
	</head>
	<body onload="InitRegister()">
		<?php 
			include("macros/loginmacro.html"); 
		?>
		<script>
			document.getElementById("RegisterNav").className = "active";
		</script>
		<div class="container" style="height: 420px;">
			<div class="row">
				<div class="span12">
					<legend>Please Register</legend>
				</div>
			</div>
			<div class="row">
				<div class="span2">
					<label>Username</label>
				</div>
				<div class="span3">
					<input id="RegisterUser" type="text" placeholder="Input Username..." onkeyup="CheckUserNameAvailability()" onkeypress="checkValidateEnter(event)">
				</div>
				<div class="span7">
					<span id="RegUserFault" class="help-block">Minimum 2 characters.</span>		
				</div>
			</div>
			<div class="row">
				<div class="span2">
					<label>Email</label>
				</div>
				<div class="span3">
					<input id="RegisterEmail" type="text" placeholder="Input Email..." onkeypress="checkValidateEnter(event)">
				</div>
				<div class="span7">
					<span id="RegEmailFault" class="help-block">person@gmail.com</span>
				</div>
			</div>
			<div class="row">
				<div class="span2">
					<label>Mobile Phone</label>
				</div>
				<div class="span3">
					<input id="RegisterPhone" type="text" placeholder="Input Phone..." onkeypress="checkValidateEnter(event)">
				</div>
				<div class="span7">
					<span id="RegPhoneFault" class="help-block">Optional.</span>
				</div>
			</div>
			<div class="row">
				<div class="span2">
					<label>Security Question</label>
				</div>
				<div class="span3">
					<input id="RegisterQuestion" type="text" placeholder="Input Security Question..." onkeypress="checkValidateEnter(event)">
				</div>
				<div class="span7">
					<span id="RegSecurityFault" class="help-block">Not case sensitive.</span>
				</div>
			</div>
			<div class="row">
				<div class="span2">
					<label>Security Answer</label>
				</div>
				<div class="span3">
					<input id="RegisterAnswer" type="text" placeholder="Input Security Answer..." onkeypress="checkValidateEnter(event)">
				</div>
				<div class="span7">
					<span id="RegAnswerFault" class="help-block">Not case sensitive.</span>
				</div>
			</div>
			<div class="row">
				<div class="span2">
					<label>Password</label>
				</div>
				<div class="span3">
					<input id="RegisterPassword" type="password" placeholder="Input Password..." onkeypress="checkValidateEnter(event)">
				</div>
				<div class="span7">
					<span id="RegPasswordFault" class="help-block">Minimum 8 characters.</span>
				</div>
			</div>
			<div class="row">
				<div class="span2">
					<label>Confirm Password</label>
				</div>
				<div class="span3">
					<input id="RegisterConfirm" type="password" placeholder="Input Password..." onkeypress="checkValidateEnter(event)">
				</div>
				<div class="span7">
					<span id="RegConfirmFault" class="help-block">Should match password.</span>
				</div>
			</div>
			<div class="row">
				<div class="span12">
					<button id="RegisterButton" type="submit" class="btn btn-primary" onclick="RegisterUser()" onkeypress="checkValidateEnter(event)">Register</button>
				</div>
			</div>
		</div>
		<?php include("macros/footermacro.php");?>
	</body>
</html>	