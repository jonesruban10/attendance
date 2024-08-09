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
// echo "test----".$method;die;
switch ($method) {
    case 'GET':
        $batch = $_GET['batch'];
        $department = $_GET['department'];
        $date = $_GET['date'];
        $time = $_GET['time'];
        
        // Query to fetch all selected data along with attendance status
        $alluser = mysqli_query($db_conn, "SELECT student_db.*, stu_att.status, stu_att.id as attendanceId, stu_att.date, stu_att.time FROM student_db LEFT JOIN (SELECT * FROM `student_attendance` WHERE date='$date' AND time='$time') AS stu_att ON stu_att.roll_no = student_db.rollno WHERE student_db.batch='$batch' AND student_db.department='$department'");
        
        if ($alluser) {
            // Fetch the total number of selected data
            $total_selected_data = mysqli_num_rows($alluser);
            
            if ($total_selected_data > 0) {
                $data = array();
                $absent_count = 0;
                $present_count = 0;
                // $od_count = 0;
                
                while ($row = mysqli_fetch_assoc($alluser)) {
                    $data[] = $row;
                    // Count different attendance statuses
                    if ($row['status'] == 0) {
                        $absent_count++;
                    } elseif ($row['status'] == 1) {
                        $present_count++;
                    } 
                    // elseif ($row['status'] == 2) {
                    //     $od_count++;
                    // }
                }
                
                // Calculate percentage of different attendance statuses
                $absent_percentage = ($absent_count / $total_selected_data) * 100;
                $present_percentage = ($present_count / $total_selected_data) * 100;
                // $od_percentage = ($od_count / $total_selected_data) * 100;
                
                // Prepare the result array
                $result = array(
                    "total_selected_data" => $total_selected_data,
                    "absent_percentage" => $absent_percentage,
                    "present_percentage" => $present_percentage,
                    // "od_percentage" => $od_percentage,
                    "data" => $data
                );
                
                // Output the result as JSON
                echo json_encode($result);
            } else {
                echo json_encode(["result" => "No data found for the provided parameters"]);
            }
        } else {
            echo json_encode(["result" => "Error in fetching data"]);
        }
        break;
    
    
    }
?>