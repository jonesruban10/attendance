import React, { useState, useEffect, useCallback } from 'react';
import './Viewpage.css';
import axios from 'axios';
import { Document, Page, Text, View, StyleSheet, } from '@react-pdf/renderer';
import { isArray, isValidElement } from '../../utils';
import moment from 'moment';


function Viewpage() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchRollNo, setSearchRollNo] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [students, setStudents] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const [loading, setLoading] = useState(true);
  const [selectedTime, setSelectedTime] = useState('');

  const fetchStudents = useCallback(async () => {
    try {
      const response = await fetch("http://localhost/api/AttendanceReport.php?from=" + startDate + "&to=" + endDate + "&time=" + selectedTime + "&batch=" + selectedBatch + "&department=" + selectedDepartment + "&rollno=" + searchRollNo);
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
  }, [startDate, endDate, selectedBatch, selectedDepartment, searchRollNo])

  // Fetch the data

  const handleDownloadPDF = () => {
    const styles = StyleSheet.create({
      table: { width: '100%', border: '1px solid #000' },
      row: { flexDirection: 'row' },
      cell: { flexGrow: 1, padding: 5, border: '1px solid #000' },

    });

    const MyDocument = (
      <Document>
        <Page>
          <View style={styles.table}>
            <View style={styles.row}>
              <Text style={styles.cell}>Name</Text>
              <Text style={styles.cell}>Roll No</Text>
              <Text style={styles.cell}>Department</Text>
              <Text style={styles.cell}>Total Percentage</Text>
            </View>
            {isArray(students) && students?.map((student, index) => (
              <View key={index} style={styles.row}>
                <Text style={styles.cell}>{student.name}</Text>
                <Text style={styles.cell}>{student.rollno}</Text>
                <Text style={styles.cell}>{student.department}</Text>
                <Text style={styles.cell}>{student.totalPercentage}%</Text>
              </View>

            ))}
          </View>
        </Page>
      </Document>
    );

    const blob = new Blob([MyDocument], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'students.pdf';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <form>
        <div className='searchfields'>
          <label>
            From Date:
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </label>
          <label>
            To Date:
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </label>
          <label>
            Search by Roll No:
            <input type="text" value={searchRollNo} onChange={(e) => setSearchRollNo(e.target.value)} />
          </label>
          <label>
            Batch:
            <select id="batch" value={selectedBatch} onChange={(e) => setSelectedBatch(e.target.value)}>
              <option value="">Select Batch</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
            </select>
          </label>
          <label>
            Department:
            <select id="department" value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)}>
              <option value="">Select Department</option>
              <option value="Computer Technology">CT</option>
              <option value="Information Technology">IT</option>
            </select>
          </label>
        </div>
        
        <button type="button" className='viewbutton' onClick={(e) => {
          fetchStudents();
        }}>Submit</button>
        <button className='downlode_btn' onClick={handleDownloadPDF}>Download PDF</button>
      </form>


      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Name</th>
            <th>Roll No</th>
            <th>Department</th>
            <th>Absent Percentage</th>
            <th>Present Percentage</th>
            <th>OD Percentage</th>
          </tr>
        </thead>
        <tbody>
          {isArray(students) && students?.map((student, index) => (
            <tr key={index}>
              <td>{student.date}</td>
              <td>{student.time}</td>
              <td>{student.name}</td>
              <td>{student.rollno}</td>
              <td>{student.department}</td>
              <td>{student.Absent_Percent}%</td>
              <td>{student.Present_Percent}%</td>
              <td>{student.OD_Percent}%</td>
            </tr>
          ))}
        </tbody>
      </table>
      

    </div>
  );
}

export default Viewpage;
