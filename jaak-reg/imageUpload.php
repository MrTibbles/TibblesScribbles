<?php

// $targetDir = "/Users/fred/sites/TibblesScribbles/jaak-reg/uploads/avatars/";
$targetDir = "/Users/freddie.tibbles/sites/TibblesScribbles/jaak-reg/uploads/avatars/";

if (!file_exists($targetDir)) {
  mkdir($targetDir, 0777, true);
}

$targetDir = $targetDir . "/" . basename($_FILES["file"]["name"]);

if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_dir)) {
  echo json_encode([
    "Message" => "The file ". basename( $_FILES["file"]["name"]). " has been uploaded.",
    "Status" => "OK",
    "userId" => $_REQUEST["userId"]
  ]);

} else {

  echo json_encode([
    "Message" => "Sorry, there was an error uploading your file: ",
    "Status" => "Error",
    "userId" => $_REQUEST["userId"]
  ]);

}
?>