<?php

	$server = "127.0.0.1";
	$user = "root";
	$password = "12345";
	$database = "jcombo.test";


	$link  = mysql_connect($server,$user,$password);
	if(!$link) die("Error in Database");
	
	if(!mysql_select_db($database)) { // create database if not exists
		die("Cannot select database $database");
	};
	 
	
	

?>