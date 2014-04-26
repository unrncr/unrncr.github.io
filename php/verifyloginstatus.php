<?php
	require('connections/SuruDB.php');
	mysql_select_db($database_SuruDB, $SuruDB);
	if($sessionID = mysql_real_escape_string($_GET['initsession']))
		setcookie("sessionID", $sessionID);//Initialize cookie
	else	
		$sessionID = $_COOKIE['sessionID'];//continuation: get cookie
	$site = (getenv(HTTP_X_FORWARDED_FOR)) ? getenv(HTTP_X_FORWARDED_FOR) : getenv(REMOTE_ADDR);
	if($sessionID)
	{	//This series of includes is called from within base dirs
		require_once('cfg/time.php');
		require_once('cfg/config.php');
		require_once('functions/chars.php');
		$update = "SELECT Username, SessionID, LastActivity, Entered, DebugMode, Member, ActiveChar FROM Users WHERE SessionID = '" . $sessionID . "' &&  LoginSite = '" . $site . "' LIMIT 1;";
		$result = mysql_query($update) or die(mysql_error());
		if(!mysql_num_rows($result))
		{
			$logged = 0;//SessionID didn't match site and logged SessionID on client
			$sessionID = 0;
			mysql_close($SuruDB);
		}
		else
		{//We have a match, but must verify activity
			$row = mysql_fetch_array($result);
			$member = $row['Member'];
			$char = $row['ActiveChar'];
			$entered = $row['Entered'];
			$debug = $row['DebugMode'];
		
			if((time() - $row['LastActivity']) > (60*$MINUTE) )
			{//clear session id--inactivity--force a logout
				mysql_close($SuruDB);
				$logged = 0;
				$sessionID = 0;
				header('Location: logout.php?timeout=1');
				exit(0);//Force exit
			}
			else
			{//activity okay'ed--proceed and update last action
				$logged = $row['Username'];
				$update = "UPDATE Users SET LastActivity = " . time() . " WHERE SessionID = '".$sessionID."' LIMIT 1;";
				$result = mysql_query($update) or die(mysql_error());
				if($_GET['selectchar'])
					$char = SelectChar($logged, mysql_real_escape_string($_GET['selectchar']));
				mysql_close($SuruDB);
			}
		}
	}
	//No session ID means never logged in from client
?>