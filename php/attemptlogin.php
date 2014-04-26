<?php
require_once('../connections/SuruDB.php');
require_once('../cfg/config.php');
require_once('../cfg/generators.php');
require_once('../cfg/encrypt.php');
require_once('../cfg/time.php');
mysql_select_db($database_SuruDB, $SuruDB);
srand(time());
$user = mysql_real_escape_string(strtolower($_GET['user']));
$passwd = mysql_real_escape_string($_GET['passwd']);
$passwd = encrypt($passwd);
$passwd = preg_quote($passwd, "'");
$update = "SELECT Status, Email FROM Users WHERE Username = '" . $user . "' && Password = '" . $passwd . "' LIMIT 1;";
$result = mysql_query($update) or die(mysql_error());
$row = mysql_fetch_array($result);
if(!$row['Email'])
{//Username password do not exist or mismatch
	mysql_close($SuruDB);
	echo("failure");
}				
else if($row['Status'] == "0")
{//Account never activated
	mysql_close($SuruDB);
	echo("email:". $row['Email']);//User is reminded to activate this specific email
}
else if($row['Status'] == "2")
{//User has been ridded
	mysql_close($SuruDB);
	echo("failure");
}
else
{//At this point, login is valid. Updating account with login info.
	$site = (getenv(HTTP_X_FORWARDED_FOR)) ? getenv(HTTP_X_FORWARDED_FOR) : getenv(REMOTE_ADDR);
	$sessionID = rand(1, 1000000);
	$update = "UPDATE Users SET SessionID = '" . $sessionID . "', LoginSite = '" . $site . "', LoginTime = '" . time() . "', LastActivity = '" . time() . "' WHERE Username = '" . $user . "' LIMIT 1;";
	$result = mysql_query($update) or die(mysql_error());
	mysql_close($SuruDB);
	echo("complete:". $sessionID);
}
?>