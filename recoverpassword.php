<!DOCTYPE html>
<html lang="en">
	<head>
		<title>Surukenza: Password Recovery</title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link href="bootstrap/css/bootstrap.min.css" rel="stylesheet" media="screen">
		<link href="bootstrap/css/bootstrap.css" rel="stylesheet" media="screen">
		<script src="http://code.jquery.com/jquery.js"></script>
		<script src="bootstrap/js/bootstrap.min.js"></script>
		<script src="js/xmlhttp.js"></script>
		<script type="text/javascript" src="js/include/validation.js"></script>
		<script type="text/javascript" src="js/recoverpassword.js"></script>
		<script type="text/javascript" src="js/loginuser.js"></script>
	</head>
	<body onload="InitUsernameRecover()">
		<?php 
			if(!$sessionID)
				include("macros/loginmacro.html"); 
			else
				include("macros/usercontrolmacro.html");
		?>
		<script>
			document.getElementById("ForgotNav").className = "active";
		</script>
		<div class="container" style="height: 420px;">
			<div class="row">
				<div class="span12">
					<legend>Password Recovery</legend>
				</div>
			</div>
			<div class="row">
				<div class="span2">
					<label>Username: </label>
				</div>
				<div class="span3">
					<input id="RecoveryUsername" type="text" placeholder="Input username..." onkeypress="checkValidateEnter(event)">
				</div>
				<div class="span7">
					<p id="RecoveryUsernameFault" class="text-error">&nbsp;</p>		
				</div>
			</div>
			<div class="row">
				<div class="span2">
					<label>Email: </label>
				</div>
				<div class="span3">
					<input id="RecoveryEmail" type="text" placeholder="Input email address..." onkeypress="checkValidateEnter(event)">
				</div>
				<div class="span7">
					<p id="RecoveryEmailFault" class="text-error">&nbsp;</p>		
				</div>
			</div>
			<div class="row">
				<div class="span12">
					<button id="EmailButton" type="submit" class="btn btn-primary" onclick="ValidateEmail()">Validate</button>
				</div>
			</div>
			<div class="row">
				<div class="span2">
					<label>Security Question: </label>
				</div>
				<div class="span10">
					<p id="RecoverySecurity">&nbsp;</p>
				</div>
			</div>
			<div class="row">
				<div class="span2">
					<label>Security Answer: </label>
				</div>
				<div class="span3">
					<input id="RecoveryAnswer" disabled="disabled" type="text" placeholder="Input security answer..." onkeypress="checkRecoveryEnter(event)">
				</div>
				<div class="span7">
					<p id="RecoveryAnswerFault" class="help-block">&nbsp;</p>		
				</div>
			</div>
			<div class="row">
				<div class="span12">
					<button id="RecoveryButton" type="submit" class="btn btn-primary disabled" onclick="RecoverPassword()">Register</button>
				</div>
			</div>
		</div>
		<?php include("macros/footermacro.php");?>
	</body>
</html>	