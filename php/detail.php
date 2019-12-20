<?php
  include('./conn.php');
  $pid = $_GET['pid'];
  $sqj = "SELECT * FROM woniupic where pid='$pid'";
  $arr = array();
  $result = $conn->query($sqj);
  $arr[0]=$result->fetch_assoc();
  $json = json_encode($arr);
  echo $json;
?>