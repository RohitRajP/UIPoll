<?php
header('Access-Control-Allow-Origin: *');
include '../config/connect.php';

$uploadDetails = array(); // response JSON array to Client object declaration
$fileName = $_FILES["uploadFile"]["name"];
$fileName = str_replace(' ','_',$fileName);
//echo $fileName;
$desc = $_POST['desc'];
$target_dir = "../images/";
$target_dir = $target_dir . basename( $fileName);
$uploadOk=1;

if (move_uploaded_file($_FILES["uploadFile"]["tmp_name"], $target_dir)) {
    // echo "The file ". basename( $_FILES["uploadFile"]["name"]). " has been uploaded.";
    // list($width, $height) = getimagesize('../images/'.$_FILES["uploadFile"]["name"]);
    $fileName = $_FILES["uploadFile"]["name"];
    $fileAddress = 'https://uipoll.000webhostapp.com/uiPollApi/images/'.$_FILES["uploadFile"]["name"];
    $sql = "INSERT INTO `imgdetails`(`imgName`, `imgLocation`,`imgDesc`) VALUES ('$fileName','$fileAddress','$desc')";  //getting staff details
    $result = $conn->query($sql) or die('Line 15 - imageUpload.php - '.$sql); //storing in result variable
    $sql = "SELECT `imgID` FROM `imgdetails` WHERE `imgName` = '$fileName'";  //getting staff details
    //echo $sql;
    $result = $conn->query($sql) or die('Line 13 - imageUpload.php - '.$sql); //storing in result variable
    if ($result->num_rows > 0)  // check if tuples exsist in result variable
    { 
        while($row = $result->fetch_assoc())  //return NULL for end of rows and returns entire tuple in $row
        {
            array_push($uploadDetails, array(
                "url" => "https://rohitrajp.github.io/UIPoll/?imgId=".$row['imgID'],
            ));
        }
    }
    header('Content-Type: application/json');
    echo json_encode($uploadDetails);  
// echo "width: " . $width . "<br />";
// echo "height: " .  $height;

} else {
    echo "Sorry, there was an error uploading your file.";
}
?>