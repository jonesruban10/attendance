import React, { useState } from 'react';
import './Staffdetails.css';
import Uplode from '../Sidebar/Uplode';
import axios from 'axios';


const Staffdetails = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    dob: '',
    email: '',
    phno: ''
  });
const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

 

  const handleSubmit = async(e) => {
    e.preventDefault();
    const formvalue={image:formData.image,name:formData.name,username:formData.username,password:formData.password,dob:formData.dob,email:formData.email,phno:formData.phno,};
  const res=await axios.post("http://localhost/api/Staff.php",formvalue);
  if(res.data.succes)
  {
   
    alert("success")
    
  }
    if (validateFormStaff()) {
      alert("Staff Record Saved Successfully");
      
    }
  };
  const [errors, setErrors] = useState({});
  const validateFormStaff = () => {
    const errors = {};
    Object.keys(formData).forEach(key => {
      if (formData[key] === '') {
        errors[key] = `*${key } is required`;
      }
    });
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <div className='staff'>
      <h1 className='heading'>Welcome to Staff Details Page</h1><br /><br />
      <form className='form' onSubmit={handleSubmit}>
        <div className='uplode'>
          <label>Upload Image <Uplode name='image'  value={formData.image} onChange={handleChange}/></label>
        </div>
        <div className='labels'>
          <label>Enter Your Name</label>
          <input type='text' name='name' value={formData.name} onChange={handleChange} placeholder='FULL NAME' /><br />
          {errors.name && <div className="error" style={{color:"red"}}>{errors.name}</div>}
          <label>Enter Your User Name</label>
          <input type='text' name='username' value={formData.username} onChange={handleChange} placeholder='USER NAME' /><br />
          {errors.username && <div className="error" style={{color:"red"}}>{errors.username}</div>}
          <label>Enter Your Password</label>
          <input type='text' name='password' value={formData.password} onChange={handleChange} placeholder='PASSWORD' /><br />
          {errors.password && <div className="error" style={{color:"red"}}>{errors.password}</div>}
          <label>Select Your Date of Birth</label>
          <input type='date' name='dob' value={formData.dob} onChange={handleChange} /><br />
          {errors.dob && <div className="error" style={{color:"red"}}>{errors.dob}</div>}
          <label>Enter your Email id</label>
          <input type='email' name='email' value={formData.email} onChange={handleChange} placeholder='SAMPLE123@GMAIL.COM' /><br />
          {errors.email && <div className="error" style={{color:"red"}}>{errors.email}</div>}
          <label>Enter your Phone Number</label>
          <input type='text' name='phno' value={formData.phno} onChange={handleChange} placeholder='91|123456789' />
          {errors.phno && <div className="error" style={{color:"red"}}>{errors.phno}</div>}
        </div>
        <div className='button'>
          <button className='button' type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Staffdetails;
