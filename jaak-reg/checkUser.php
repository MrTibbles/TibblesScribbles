<?php 

require("Conn.php");
require("MySQLDao.php");

$email = (string)$_POST["email"];

$returnValue = array();

$dao = new MySQLDao();
$dao->openConnection();
$userDetails = $dao->getUserDetails($email);

if(!empty($userDetails)) {
  $returnValue["status"] = "error";
  $returnValue["message"] = "User already exists";
  echo json_encode($returnValue);
  return;
} else {
  $returnValue["status"] = "Success";
  $returnValue["message"] = "User does not exist";
  echo json_encode($returnValue);
  return;
}

$dao->closeConnection();

?>