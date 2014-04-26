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
		<script type="text/javascript" src="js/resendactivation.js"></script>
	</head>
	<body>
		<?php 
			include("macros/loginmacro.html"); 
		?>
		<script>
			document.getElementById("ForgotNav").className = "active";
		</script>
		<div class="container" style="height: 420px;">
			<p class="lead">Activation Link Transmission</p>
			<?php 
				include("cfg/config.php");
				$email = $_GET['email'];
				$err = $_GET['err'];
				if(!$email)
					echo("<p>This page was opened erroneously. If you recently registered your account try checking your email to see if an activation link was sent or attempt to register again.</p>");
				else
				{
					$showbutton = 1;
					echo("<p>".GAME_NAME." has sent an email to the specified email account: " . $email ."</p><p>Please check your inbox and click on the link to activate your account.</p><p>If you haven't received an email, first check your spam and then try clicking the button below and ".GAME_NAME." will attempt to resend it.</p>");
					if($err) 
						echo("<p>Note: The prior process was completed with errors. It is possible your account failed to activate.</p>");
				}
				if($showbutton) 
				{ ?>
					<div class="row">
						<div class="span12">
							<button id="ActivateEmail" type="submit" class="btn" onclick="SendActivationEmail('<?php echo $email; ?>')">Resend Email Activation</button>
						</div>
					</div>
				<?php 
				} 
			?>
		</div>
		<?php include("macros/footermacro.php");?>
	</body>
</html>	