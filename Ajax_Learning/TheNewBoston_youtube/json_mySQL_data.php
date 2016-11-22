<?php
header("Content-Type: application/json");
if (isset($_POST['limit'])) {
	$limit = preg_replace('#[^0-9]#','', $_POST['limit']); // clean POST['limit'], filter everything but numbers
	require_once("connect_db.php"); //referencing database connection files
	$i = 0;
	$jsonData='{';
	
	$sqlString = "SELECT * FROM tablename ORDER BY RAND() LIMIT $limit"; //this is a sql query syntax 
	$query mysql_query($sqlString) or die (mysql_error());
	while ($row = mysql_fetch_array($query)) { 
		$i++;
		$id=$row("id");
		$title...
	
	$jsondData .='}';
	echo $jsondData;
}

//$jsonData .= '"img'.i.'":{"num":"'.i'","src":"'.*src.'","name":"'.$file.'"},';

?>