<?php

	include("database.inc.php");	

	$query = "SELECT id_country, country_name FROM combo_countries;";
    $result = mysql_query($query);
    $items = array();
    if($result && 
       mysql_num_rows($result)>0) {
        while($row = mysql_fetch_array($result)) {
            $items[] = array("id" => $row[0], "value" => $row[1]);
        }        
    }
    mysql_close();	
	header('content-type: application/json; charset=utf-8');
	// convert into JSON format and print
	$response = json_encode($items);
	if(isset($_GET['callback'])) {
		echo $_GET['callback']."(".$response.")";  
	} else {
		echo $response;			
	}

	
?>
