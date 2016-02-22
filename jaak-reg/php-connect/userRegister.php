<?php 

require("Conn.php");
require("MySQLDao.php");

$email = (string)$_POST["email"];
$password = (string)$_POST["password"];
$group_name = (string)$_POST["group_name"];
$firstname = (string)$_POST["firstname"];
$lastname = (string)$_POST["lastname"];

$returnValue = array();

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
}

$dao->closeConnection();

?>