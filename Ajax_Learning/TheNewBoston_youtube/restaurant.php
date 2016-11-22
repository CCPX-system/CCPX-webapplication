<?php

header('Content-Type: text/xml');
echo '<?xml version="1.0" encoding="UTF-8" standalone="yes" ?>';

echo '<response>';
	$food = $_GET('food');
	$foodArray = array('noodles','rice','dumplings');
	if (in_array($food,$foodArray)) /* is food in foodArray? */
		echo 'Yes we have '.$food.'!';
	elseif ($food='')
		echo 'Enter something';
	else 
		echo 'Sorry, we do not have '.$food.;
echo '</response>';

?>