import React, { useState } from 'react';
import './Signinpage.css'
import axios from 'axios';

const Signinpage = () => {
  const [formvalue, setFormValue] = useState({ username: '', password: '', status: '', });


  const handelInput = (e) => {
    setFormValue({ ...formvalue, [e.target.name]: e.target.value });
  }
  const handelSubmil = async (e) => {
    e.preventDefault();

    const formData = { username: formvalue.username, password: formvalue.password, status: formvalue.status };
    const res = await axios.post("http://localhost/api/AddAcc.php", formData);

    if (res.data.success) {
      setFormValue({ username: '', password: '', status: '' });
    }

    if (validateFormStaff()) {
      alert("Register Successfully");

    }
  };
  const [errors, setErrors] = useState({});
  const validateFormStaff = () => {
    const errors = {};
    Object.keys(formvalue).forEach(key => {
      if (formvalue[key] === '') {
        errors[key] = `*${key} is required`;
      }
    });
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <div className='signinpage'>


      <div>
        <form className="signin" onSubmit={handelSubmil}>

          <h1>Add Account</h1>
          <div>
            <select name='status' value={formvalue.status} onChange={handelInput}>
              <option value="">--select status---</option>
              <option value="Admin">Admin</option>
              <option value="staff">Staff</option>
              <option value="student">Student</option>
            </select>
            {errors.status && <p style={{ color: "red" }}>{errors.status}</p>}
          </div>
          <label>User Name</label>
          <input type="text" name='username' value={formvalue.username} onChange={handelInput} />
          {errors.username && <p style={{ color: "red" }}>{errors.username}</p>}
          <label >Password</label>
          <input type="text" name='password' value={formvalue.password} onChange={handelInput} />
          {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
          <button className="b1" name='submit'>Create Account</button>
        </form >

      </div >
    </div >

  )
}
export default Signinpage
