<?php
error_reporting(E_ERROR | E_PARSE );
@ini_set('max_execution_time', '0');
@ini_set("memory_limit",'-1');
$url = $_GET["url"];
if (!empty($url) && substr($url,0,4)=='http') {
	$dir = pathinfo($url);
	$host = $dir['dirname'];
	$ext = $dir['extension'];
	$refer = $host.'/';
	$ch = curl_init($url);
	curl_setopt ($ch, CURLOPT_REFERER, $refer);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
	curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 15);
	curl_setopt($ch, CURLOPT_TIMEOUT, 30);
	curl_setopt($ch, CURLOPT_HEADER,0);
	curl_setopt($ch, CURLOPT_POST, 0);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
	curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 1);
	curl_setopt($ch, CURLOPT_BINARYTRANSFER, 1);
	$data = @curl_exec($ch);
	curl_close($ch);
	$types = array(
		'gif'=>'image/gif',
		'jpeg'=>'image/jpeg',
		'jpg'=>'image/jpeg',
		'jpe'=>'image/jpeg',
		'png'=>'image/png',
	);
	$type = $types[$ext] ? $types[$ext] : 'image/jpeg';
	header("Content-type: ".$type);
	echo $data;
}