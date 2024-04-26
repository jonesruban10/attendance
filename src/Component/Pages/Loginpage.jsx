import React from 'react'
import './Loginpage.css'
import { useState } from 'react';
import axios from 'axios';


function Loginpage() {
  const [formvalue, setFormValue] = useState({ username: '', password: '',  });
  

  const handelInput = (e) => {
    setFormValue({ ...formvalue, [e.target.name]: e.target.value });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (validateFormStaff()) {  

      const formData = { username: formvalue.username, password: formvalue.password};
      const res = await axios.post("http://localhost/api/user.php", formData);

      if (res.data.length > 0) {
        localStorage.setItem('user', JSON.stringify(res.data[0]));
        alert("Login Successfully");
        window.location.href='/';
      }else {
        alert("Invalid UserName or Password")
      }
  
    
    
  }
};
const [errors, setErrors] = useState({});
const validateFormStaff = () => {
  const errors = {};
  Object.keys(formvalue).forEach(key => {
    if (formvalue[key] === '') {
      errors[key] = `*${key } is required`;
    }
  });
  setErrors(errors);
  return Object.keys(errors).length === 0;
};

  return (
    <div className='loginpage'>


      <div>
        <form className="login" onSubmit={handleSubmit}>

          <h1>LOGIN PAGE</h1>
          <label>User Name</label>
          <input type="text" name='username' value={formvalue.username} onChange={handelInput} />
          {errors.username && <p style={{ color: "red" }}>{errors.username}</p>}
          <label >Password</label>
          <input type="text" name='password' value={formvalue.password} onChange={handelInput} />
          {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
          <button className="b1" name='submit'>LOGIN</button>
    </form >

      </div >
</div >

  )
}

export default Loginpage;