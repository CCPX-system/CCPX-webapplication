<?php
header("Content-Type: application/json");
//$jsondata= file_get_contents("MyList.json");
$var1=$_POST["var1"];
$var2=$_POST["var2"];

$jsondata='{"obj1":{"propertyA":" '.$var1.' ","propertyB":"'.$var2.'"}};
echo $jsondata;

?>