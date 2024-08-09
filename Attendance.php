<?php 
error_reporting(E_ALL);
ini_set('display_errors',1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$db_conn=mysqli_connect("localhost","root","","reactphp");
if ($db_conn===false) {
    die("error:could not connect".mysqli_connect_error());    
}

$method=$_SERVER['REQUEST_METHOD'];
switch ($method) {
    case 'GET':
       $batch = $_GET['batch'];
       $department = $_GET['department'];
       $date = $_GET['date'];
       $time = $_GET['time'];
    //    $sql = "";
        $alluser=mysqli_query($db_conn,"SELECT student_db.*,stu_att.status,stu_att.id as attendanceId, stu_att.date, stu_att.time FROM student_db left join (select * from `student_attendance` where date='".$date."' and time='".$time."') as stu_att on stu_att.roll_no =student_db.rollno where student_db.batch='".$batch."' and student_db.department='".$department."'");
        {
            if (mysqli_num_rows($alluser)>0) {
                $data = array();
                while ($row=mysqli_fetch_assoc($alluser)) {
                    $data[]=$row;
                    // $sql = "SELECT student_db.*,truncate(SUM(CASE WHEN stu_att.status = 0 THEN 1 ELSE 0 END) / COUNT(*) * 100,2) AS Absent_Percent,truncate(SUM(CASE WHEN stu_att.status = 1 THEN 1 ELSE 0 END) / COUNT(*) * 100,2) AS Present_Percent ";

                } 
                echo json_encode($data);
                return;
            }
            else{
                echo json_encode(["result"=>"please check the data"]);
                return;
            }
        }
        break;
    case 'POST':
        $userpostdata=json_decode(file_get_contents("php://input"));
        $rollno=$userpostdata->rollno;
        $batch = $userpostdata->batch;
        $department = $userpostdata->department;
        $date = $userpostdata->date;
        $time = $userpostdata->time;
        $status=$userpostdata->status;

        $sql ="INSERT INTO `student_attendance`(`roll_no`, `batch`, `department`, `status`, `date`, `time`, `attendance_at`) VALUES ('$rollno','$batch','$department','$status', '$date','$time',current_timestamp())";
        
        $result=mysqli_query($db_conn,$sql);

        if ($result) {
            echo json_encode(["success"=>"attendance added successfully"]);
            return;
        }
        else{
            echo json_encode(["success"=>"please check the attendance data"]);
            return;
        }
        
        break;
    case 'PUT':
        
        $userpostdata=json_decode(file_get_contents("php://input"));
        $rollno=$userpostdata->rollno;
        $batch = $userpostdata->batch;
        $department = $userpostdata->department;
        $date = $userpostdata->date;
        $time = $userpostdata->time;
        $status=$userpostdata->status;

        
        $result=mysqli_query($db_conn,"UPDATE `student_attendance` set `status` = '".$status."' WHERE id = ".$_GET['id']."");

        if ($result) {
            echo json_encode(["success"=>"attendance added successfully"]);
            return;
        }
        else{
            echo json_encode(["success"=>"please check the attendance data"]);
            return;
        }
        break;
}
?>