<?php 
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$db_conn = mysqli_connect("localhost", "root", "", "reactphp");
if ($db_conn === false) {
    die("Error: Could not connect to the database. " . mysqli_connect_error());    
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'POST':
        $userpostdata = json_decode(file_get_contents("php://input"));
        
        $name = $userpostdata->name;
        $rollno = $userpostdata->rollno;
        $dob = $userpostdata->dob;
        $email = $userpostdata->email;
        $phno = $userpostdata->phno;
        $batch = $userpostdata->batch;
        $degree = $userpostdata->degree;
        $department = $userpostdata->department;
        
        $result = mysqli_query($db_conn, "INSERT INTO `student_db`(`name`, `rollno`, `dob`, `email`, `phno`, `batch`, `degree`, `department`) 
        VALUES ('$name','$rollno','$dob','$email','$phno','$batch','$degree','$department')");

        if ($result) {
            echo json_encode(["success" => "User added successfully"]);
            return;
        }
        else {
            echo json_encode(["error" => "Please check the user data"]);
            return;
        }
        
        break;
}
?>
