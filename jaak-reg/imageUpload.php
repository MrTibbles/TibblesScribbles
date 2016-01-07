<?php

$firstName = $_REQUEST["title"];
$targetDir = "uploads/avatars/";
// $targetDir = "/Users/freddie.tibbles/sites/TibblesScribbles/jaak-reg/uploads/avatars/";

if (!file_exists($targetDir)) {
  mkdir($targetDir, 777, true);
}

echo json_encode([
  "Name" => $_FILES["file"],
  "tmp" => $_FILES["file"]["tmp_name"],
  "name" => $firstName
]);
die();

$targetDir = $targetDir . "/" . basename($_FILES["file"]["name"]);

if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_dir)) {

  echo json_encode([
    "Message" => "The file ". basename($_FILES["file"]["name"]). " has been uploaded.",
    "Status" => "OK"
  ]);

} else {

  echo json_encode([
    "Message" => "Sorry, there was an error uploading your file",
    "Status" => "Error",
    "misc" => $_FILES["file"]
  ]);

}

?>