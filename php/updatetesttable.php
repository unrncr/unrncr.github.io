<?php
require_once($_SERVER["DOCUMENT_ROOT"].'/connections/ToTDB.php');
mysql_select_db($database_ToTDB, $ToTDB);
$hours = $_GET['hours'];
$name = $_GET['name'];

$update = "UPDATE BLTeamMembers SET Hours = ".$hours." WHERE Name = '".$name."' LIMIT 1";
$result = mysql_query($update) or die(mysql_error());
mysql_close($ToTDB);
echo "ok";
?>