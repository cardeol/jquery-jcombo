<?php

	include("database.inc.php");	

	  // Get parameters from Array
    $id_country = !empty($_GET['id_country'])?intval($_GET['id_country']):'%%';
	
	$query = "SELECT id_state,state_name FROM combo_states WHERE id_country like '$id_country';";
	
	$result = mysql_query($query);
    $items = array();
    if($result && 
       mysql_num_rows($result)>0) {
        while($row = mysql_fetch_array($result)) {
            $items[$row[0]] = $row[1];
        }        
    }
    mysql_close();	
	header('content-type: application/json; charset=utf-8');
    // convert into JSON format and print
	$response = json_encode($items);
	if(isset($_GET['callback'])) { //json padding
		echo $_GET['callback']."(".$response.")";  
	} else {
		echo $response;			
	}
    
	
?>