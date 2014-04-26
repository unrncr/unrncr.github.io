<?php
require_once($_SERVER["DOCUMENT_ROOT"].'/connections/ToTDB.php');
mysql_select_db($database_ToTDB, $ToTDB);
$names = array();
$update = "SELECT `Model`, `Izhikevich`, Author FROM `BLTeamMembers` WHERE 1";
$result = mysql_query($update) or die(mysql_error());	
while($row = mysql_fetch_array($result))
	$names[] = "[\"".$row['Model']."\",".$row['Izhikevich'].",\"".$row['Author']."\"]";
mysql_close($ToTDB);
echo "[".implode(",", $names)."]";
?>