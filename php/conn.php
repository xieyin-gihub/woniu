<?php
  //中文编译
    header('Content-Type:text/html;charset=UTF-8');
  //连接数据库
  //new mysqli (主机或者域名,用户名,密码,数据库的名称)四个参数;
    
  //创建new mysqli 类
  //创建常量存储需要参数信息
  define('HOST','localhost');//主机名域名
  define('USERNAME','root');//用户名
  define('PASSWORD','wzs325800');//密码
  define('BDNAME','woniu');//数据库名称
  $conn = new mysqli(HOST,USERNAME,PASSWORD,BDNAME);
  

  //在$conn下有个属性是connect_error 当语句执行错误时它就会出现,代表着它的错误原因
  if($conn->connect_error){
    //die函数表示  输出括号内的内容并退出终止执行
    die('数据库连接错误'.$conn->connect_error);
  }
  $conn->query('SET NAMES UTF8');//设置字符编码。
  ?>