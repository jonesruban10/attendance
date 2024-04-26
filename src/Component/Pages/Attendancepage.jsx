import React, { useState, useEffect, useCallback } from 'react';
import './Attendance.css';
import Cards from '../Cards/Cards';
import axios from 'axios';
import moment from 'moment';
import { isArray, isValidElement } from '../../utils';

const Attendancepage = () => {
  const [students, setStudents] = useState([]);

  const updateAttendance = async (student, status) => {
    const formvalues = {
      ...student,
      status: status,
      date: moment().format('YYYY-MM-DD'),
      time: selectedTime
    };
    console.log(formvalues);
    if (isValidElement(student?.attendanceId)) {
      //Update
      const res = await axios.put("http://localhost/api/Attendance.php?id=" + student?.attendanceId, formvalues);
    
    } else {
      //insert
      const res = await axios.post("http://localhost/api/Attendance.php", formvalues);

      console.log(res);
    }
    fetchStudents();
  }

  const [loading, setLoading] = useState(true);
  const [selectedBatch, setSelectedBatch] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const fetchStudents = useCallback(async () => {
    try {
      const currentDate = new moment();
      const date = currentDate.format("YYYY-MM-DD")
      const response = await fetch("http://localhost/api/Attendance.php?date=" + date + "&time=" + selectedTime + "&batch=" + selectedBatch + "&department=" + selectedDepartment);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setStudents(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching data:', error);

    } finally {
      setLoading(false);
    }
  }, [selectedBatch, selectedDepartment, selectedTime])

  // Fetch the data
  useEffect(() => {
    fetchStudents();
  }, [fetchStudents, selectedBatch, selectedDepartment, selectedTime]);

  const handleBatchChange = (event) => {
    setSelectedBatch(event.target.value);
  };

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container'>

      <div className='h1'><h1>Welcome to Attendancepage</h1></div>
      <Cards />
      <div className='filters'>
        <div>
          <label htmlFor="time">Time:</label>
          <select id="batch" value={selectedTime} onChange={(e) => {
            setSelectedTime(isValidElement(e?.target?.value) ? e.target.value : "");
          }}>
            <option value="">Select Time</option>
            <option value="09:45">09:45 AM</option>
            <option value="10:45">10:45 AM</option>
            <option value="12:00">12:00 PM</option>
            <option value="01:45">01:45 PM</option>
            <option value="02:45">02:45 PM</option>
          </select>
        </div>
        <div>
          <label htmlFor="batch">Batch:</label>
          <select id="batch" value={selectedBatch} onChange={handleBatchChange}>
            <option value="">Select Batch</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
          </select>
        </div>

        <div>
          <label htmlFor="department">Department:</label>
          <select id="department" value={selectedDepartment} onChange={handleDepartmentChange}>
            <option value="">Select Department</option>
            <option value="Computer Technology">Computer Technology</option>
            <option value="Information Technology">Information Technology</option>
           
          </select>
        </div>
      </div>
      <div className='Table'>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Roll No</th>
              <th>Degree</th>
              <th>Batch</th>
              <th>Department</th>
              <th>Present/Absent/OD</th>
            </tr>
          </thead >
          <tbody>
            {isArray(students) && students?.map((student, index) => (<tr key={index}>
              <td>{student.name}</td>
              <td>{student.rollno}</td>
              <td>{student.degree}</td>
              <td>{student.batch}</td>
              <td>{student.department}</td>
              <td>
                <select value={student.status} onChange={(e) => {
                  updateAttendance(student, e?.target?.value)
                }}>
                  <option value="0">Absent</option>
                  <option value="1">Present</option>
                  <option value="2">OD</option>
                </select>
              </td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendancepage;