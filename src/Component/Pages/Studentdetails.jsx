import React from 'react'
import './Studantdetails.css'
import LOgo from '../Sidebar/vlblogo.jpg'
import { useState } from 'react';
import axios from 'axios';

const Studentdetails = () => {
  const [formData, setFormData] = useState({
    name: '',
    rollno: '',
    dob: '',
    email: '',
    phno: '',
    batch: '',
    degree: '',
    department: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formvalue = {
      name: formData.name,
      rollno: formData.rollno,
      dob: formData.dob,
      email: formData.email,
      phno: formData.phno,
      batch: formData.batch,
      degree: formData.degree,
      department: formData.department,
    };
    const res = await axios.post("http://localhost/api/Student.php", formvalue);
    if (res.data.succes) {

      alert("success")

    }
    if (validateFormStaff()) {
      alert("Student  Record Saved Successfully");
      // You can proceed with form submission here
    }
  };
  const [errors, setErrors] = useState({});
  const validateFormStaff = () => {
    const errors = {};
    Object.keys(formData).forEach(key => {
      if (formData[key] === '') {
        errors[key] = `*${key} is required`;
      }
    });
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };




  return (
    <div className='student'>
      <h1>Welcome to Student Details</h1>
      <div className='info'>
        <img className='pic' src={LOgo} alt='' />
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
            {errors.name && <div className="error" style={{ color: "red" }}>{errors.name}</div>}
          </div>
          <div>
            <label>Roll No:</label>
            <input type="text" name="rollno" value={formData.rollno} onChange={handleChange} />
            {errors.rollno && <div className="error" style={{ color: "red" }}>{errors.rollno}</div>}
          </div>
          <div>
            <label>Date of Birth:</label>
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
            {errors.dob && <div className="error" style={{ color: "red" }}>{errors.dob}</div>}
          </div>
          <div>
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
            {errors.email && <div className="error" style={{ color: "red" }}>{errors.email}</div>}
          </div>
          <div>
            <label>Phone No:</label>
            <input type="text" name="phno" value={formData.phoneNo} onChange={handleChange} />
            {errors.phoneNo && <div className="error" style={{ color: "red" }}>{errors.phoneNo}</div>}
          </div>
          <div>
            <label>Batch:</label>
            <select name="batch" value={formData.batch} onChange={handleChange}>
              <option value="">Select Batch</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
            </select>
            {errors.batch && <div className="error" style={{ color: "red" }}>{errors.batch}</div>}
          </div>
          <div>
            <label>Degree:</label>
            <select name="degree" value={formData.degree} onChange={handleChange}>
              <option value="">Select Degree</option>
              <option value="BSc">BSc</option>
              <option value="Other">Other</option>
            </select>
            {errors.degree && <div className="error" style={{ color: "red" }}>{errors.degree}</div>}
          </div>
          <div>
            <label>Department:</label>
            <select name="department" value={formData.department} onChange={handleChange}>
              <option value="">Select Department</option>
              <option value="Computer Technology">Computer Technology</option>
              <option value="Information Technology">Information Technology</option>
            </select>
            {errors.department && <div className="error" style={{ color: "red" }}>{errors.department}</div>}
          </div>
          <div className='button'>
            <button type="submit" >Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Studentdetails