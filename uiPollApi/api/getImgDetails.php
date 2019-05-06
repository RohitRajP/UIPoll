<?php
header('Access-Control-Allow-Origin: *');
    include '../config/connect.php';
    
    mysqli_set_charset($conn, 'utf8'); // making sure mysqli character set is UFT 8 ( reason forgot )
    
    $imgDetails= array(); // response JSON array to Client object declaration
    $imgId = $_GET['imgId'];
    $sql = "SELECT `imgDesc`,`imgName` FROM `imgdetails` WHERE `imgId` = '$imgId'";  //getting staff details
    //echo $sql;
    $result = $conn->query($sql) or die('Line 13 - welcome.php'); //storing in result variable
    if ($result->num_rows > 0)  // check if tuples exsist in result variable
    { 
        while($row = $result->fetch_assoc())  //return NULL for end of rows and returns entire tuple in $row
        {
            array_push($imgDetails, array(
                "name" => $row['imgName'],
                "desc" => $row['imgDesc'], 
            ));
        }
    }
    header('Content-Type: application/json');
    echo json_encode($imgDetails);   
?>