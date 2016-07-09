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
	$id = $request->id;
	$tableid = 'u' . $id;
	$createusertable = "CREATE TABLE IF NOT EXISTS $tableid (id VARCHAR(50), name VARCHAR(100), picture VARCHAR(300), myfeel VARCHAR(50), yourfeel VARCHAR(50))";
	if (mysqli_query($conn, $createusertable))
		{
		echo ('User table created successfully');
		}
	  else
		{
		echo "Error: " . $createusertable . "<br />" . mysqli_error($conn);
		}

	$friends = $request->friends->data;
	for ($i = 0; $i < sizeof($friends); $i++)
		{
		$friendname = $friends[$i]->name;
		$friendid = $friends[$i]->id;
		$friendpicture = "https://graph.facebook.com/$friendid/picture?type=large";
                
                

		$addthefriend = "INSERT INTO $tableid (id, name, picture, myfeel, yourfeel)
VALUES ('$friendid','$friendname','$friendpicture','Friend', 'Friend')";

$checkFriend="SELECT * FROM $tableid WHERE id=$friendid";
if(mysqli_num_rows(mysqli_query($conn, $checkFriend))<1)
{
		if (mysqli_query($conn, $addthefriend))
			{
			echo "New record created successfully";

			// header('Location: index.php');

			}
		  else
			{
			echo "Error: " . $addthefriend . "<br />" . mysqli_error($conn);
			}
}
		}

	if ($username != "")
		{
		echo "Server returns: " . $id;
		}
	  else
		{
		echo "Empty username parameter!";
		}
	}
  else
	{
	echo "Not called properly with username parameter!";
	}

mysqli_close($conn);
?>	