<?php

// http://stackoverflow.com/questions/18382740/cors-not-working-php

if (isset($_SERVER['HTTP_ORIGIN']))
	{
	header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
	header('Access-Control-Allow-Credentials: true');
	header('Access-Control-Max-Age: 86400'); // cache for 1 day
	}

// Access-Control headers are received during OPTIONS requests

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS')
	{
	if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
	if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
	exit(0);
	}
 

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "test";

$conn = mysqli_connect($servername, $username, $password, $dbname);

// Check connection

if ($conn)
	{
	echo "Connection successful";
	}

if (!$conn)
	{
	die("Connection failed: " . mysqli_connect_error());
	}

// http://stackoverflow.com/questions/15485354/angular-http-post-to-php-and-undefined

$postdata = file_get_contents("php://input");

if (isset($postdata))
	{
	$request = json_decode($postdata);
	$ofid=$request->friendid;
	$friendid = 'u'.$request->friendid;
	$myid = $request->myid;
	$umyid='u'.$myid;
	$feeling=$request->feeling;
	$myname=$request->name;
	$mypicture=$request->picture;

	$checkList="SELECT * FROM $friendid WHERE id=$myid";

	if(mysqli_num_rows(mysqli_query($conn, $checkList)) > 0)
	{
		echo mysqli_num_rows(mysqli_query($conn, $checkList));
		$updateFeeling="UPDATE $friendid SET yourfeel='$feeling' WHERE id=$myid";
		mysqli_query($conn,$updateFeeling);
	}

	else
	{
		$addfeeling="INSERT INTO $friendid (id, name, picture, myfeel, yourfeel)
VALUES ('$myid','$myname','$mypicture','Friend', '$feeling') ";
mysqli_query($conn,$addfeeling);
	}

$addmyfeeling="UPDATE $umyid SET myfeel='$feeling' WHERE id=$ofid";
mysqli_query($conn, $addmyfeeling);

	
	
	}
 

mysqli_close($conn);
?>	