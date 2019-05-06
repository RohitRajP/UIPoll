<?php
header('Access-Control-Allow-Origin: *');
    include '../config/connect.php';
    
    $imgId = $_GET['imgId'];
    $opinion = $_GET['opinion'];
    $column  = "react".$opinion;

    $sql = "SELECT `$column` FROM `imgdetails` WHERE `imgId` = '$imgId'";  //getting staff details
    // echo $sql;
    $result = $conn->query($sql) or die('Line 10 - setOpinion.php  - '.$sql); //storing in result variable
    if ($result->num_rows > 0)  // check if tuples exsist in result variable
    { 
        while($row = $result->fetch_assoc())  //return NULL for end of rows and returns entire tuple in $row
        {
            $value = (int)$row[$column]+1;
            $sql2 = "UPDATE `imgdetails` SET `$column`=$value WHERE `imgId` = '$imgId'";  //getting staff details
            // echo $sql2;
            $result2 = $conn->query($sql2) or die('Line 18 - setOpinion.php  - '.$sql2); 
        }
    }

?>