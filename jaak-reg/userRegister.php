<?php

require("Conn.php");
require("MySQLDao.php");

$email = (string)$_POST["email"];
$password = (string)$_POST["password"];
$group_name = (string)$_POST["group_name"];
$firstname = (string)$_POST["firstname"];
$lastname = (string)$_POST["lastname"];

// $targetDir = "uploads/avatars/";

// if (!file_exists($targetDir)) {
//   mkdir($targetDir, 0777, true);
// }

// $targetDir = $targetDir . "/" . basename($_FILES["file"]["name"]);

$returnValue = array();

// if (!move_uploaded_file($_FILES["file"]["tmp_name"], $targetDir)) {
//   return echo json_encode([
//     "Message" => "There was an error whilst uploading your image",
//     "Status" => "Error"
//   ])
// }

if(empty($email) || empty($password)) {
  $returnValue["status"] = "error";
  $returnValue["message"] = "Missing required field";
  echo json_encode($returnValue);
  return;
}

$dao = new MySQLDao();
$dao->openConnection();
$userDetails = $dao->getUserDetails($email);

if(!empty($userDetails)) {
  $returnValue["status"] = "error";
  $returnValue["message"] = "User already exists";
  echo json_encode($returnValue);
  return;
}

$secure_password = md5($password); // I do this, so that user password cannot be read even by me

$result = $dao->registerUser($email,$secure_password,$group_name,$firstname,$lastname);

if($result) {
  $returnValue["status"] = "Success";
  $returnValue["message"] = "User is registered";
  echo json_encode($returnValue);
  return;
} else {
  $returnValue["status"] = "Error";
  $returnValue["message"] = "Error whilst uploading";
  echo json_encode($returnValue);
  return;
}

$dao->closeConnection();

?>