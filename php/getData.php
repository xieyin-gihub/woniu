<?php
  include('./conn.php');
  $sqj = 'SELECT * From woniupic';
  $result = $conn->query($sqj);
  $arr = array();
  for($i=0;$i<$result->num_rows;$i++){
    $arr[$i]=$result->fetch_assoc();
  }
  echo json_encode($arr);
?>