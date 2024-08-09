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
       $batch = isset($_GET['batch']) ? $_GET['batch'] : '';
       $department = isset($_GET['department']) ?  $_GET['department'] : '';
       $from = isset($_GET['from']) ? $_GET['from'] : '';
       $to = isset($_GET['to']) ? $_GET['to'] : '';
       $time = isset($_GET['time']) ? $_GET['time'] : '';
       $rollNo = isset($_GET['rollno']) ? $_GET['rollno'] : '';
       
       $sql = "";

       if($from !== '' && $to !== '') {
        $sql = "SELECT student_db.*,truncate(SUM(CASE WHEN stu_att.status = 0 THEN 1 ELSE 0 END) / COUNT(*) * 100,2) AS Absent_Percent,truncate(SUM(CASE WHEN stu_att.status = 1 THEN 1 ELSE 0 END) / COUNT(*) * 100,2) AS Present_Percent,truncate(SUM(CASE WHEN stu_att.status = 2 THEN 1 ELSE 0 END) / COUNT(*) * 100,2) AS OD_Percent, stu_att.date, stu_att.time FROM student_db left join (select * from `student_attendance` ) as stu_att on stu_att.roll_no =student_db.rollno where `date` between '".$from."' and '".$to."' ";
       }

       if($batch !== '') {
        $sql .= " and student_db.batch = '".$batch."'";
       }

       if($department !== '') {
           $sql .= " and student_db.department = '".$department."'";
        }

       if(isset($rollNo) && $rollNo !== '') {
        $sql .= " and rollno like '%".$rollNo."%'";
       }

       $sql .= " group by `date`, student_db.rollno";
    
        $alluser=mysqli_query($db_conn,$sql);
        {
            if (mysqli_num_rows($alluser)>0) {
                $data = array();
                while ($row=mysqli_fetch_assoc($alluser)) {
                    $data[]=$row;

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
}
?>