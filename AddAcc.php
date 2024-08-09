<?php 
error_reporting(E_ALL);
ini_set('display_errors',1);
header("Access-Control-Allow-Origin:* ");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$db_conn=mysqli_connect("localhost","root","","reactphp");
if ($db_conn==false) {
    die("error:could not connect".mysqli_connect_error());    
}

$method=$_SERVER['REQUEST_METHOD'];
switch ($method) {
    case 'POST':
        $userpostdata=json_decode(file_get_contents("php://input"));
        $userpostdata=json_decode(file_get_contents("php://input"));
        $username=$userpostdata->username;
        $userpassword=$userpostdata->password;
        $status=$userpostdata->status;
        $result=mysqli_query($db_conn,"INSERT INTO `tbl_user`(`username`, `userpassword`, `status`) VALUES
         ('$username','$userpassword','$status')");

        if ($result) {
            echo json_encode(["success"=>"user added successfully"]);
            return;
        }
        else{
            echo json_encode(["success"=>"please check the staff data"]);
            return;
        }
        
        break;
    }
?>