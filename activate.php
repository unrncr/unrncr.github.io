<!DOCTYPE html>
<html lang="en">
	<head>
		<title>Surukenza: Email Activation</title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link href="bootstrap/css/bootstrap.min.css" rel="stylesheet" media="screen">
		<link href="bootstrap/css/bootstrap.css" rel="stylesheet" media="screen">
		<script src="http://code.jquery.com/jquery.js"></script>
		<script src="bootstrap/js/bootstrap.min.js"></script>
		<script src="js/xmlhttp.js"></script>
		<script type="text/javascript" src="js/loginuser.js"></script>
	</head>
	<body>
		<?php 
			include("macros/loginmacro.html"); 
		?>
		<script>
			document.getElementById("ForgotNav").className = "active";
		</script>
		<div class="container" style="height: 420px;">
			<p class="lead">Attempting Activation</p>
			<?php
				if(!$_GET['email'] || !$_GET['activate'])
					echo("<p>You've either reached this page in error, or the activation process is bugged.</p>");
				else
				{
					require_once('connections/SuruDB.php');
					mysql_select_db($database_SuruDB, $SuruDB);
					$email = mysql_real_escape_string($_GET['email']);
					$activate = mysql_real_escape_string($_GET['activate']);
					$update = "SELECT Username FROM Users WHERE Email = '" . $email . "' && Activate = '" . $activate . "' LIMIT 1;";
					$result = mysql_query($update);
					$row = mysql_fetch_array($result);
					if(!$row['Username'])
					{//Activation and email do not match or do not exist.
						mysql_close($SuruDB);
						echo("<p>The activation code and email data are incorrect. Could not process an activation.</p>");
					}
					else
					{//Activate Account
						$update = "UPDATE Users SET Status = 1, Activate = '0', ActivationDate = '" . time() . "' WHERE Username = '" . $row['Username'] . "' LIMIT 1;";
						$result = mysql_query($update) or die(mysql_error());
						mysql_close($SuruDB);
						echo("<p>Account activated successfully! You may now login as " . $row['Username']	. ".</p>");
					}
				}
			?>
		</div>
		<?php include("macros/footermacro.php");?>
	</body>
</html>	