import { useState
 } from "react";
export  function Validation({formvalue}){
const error={}

const email_pattern=/^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/;

const password_pattern=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-z0-9]{8,}$/;

if (formvalue.username === "") {
    error.username="Name Required";
}


if (formvalue.email === "") {
    error.email="Email Required";
}

else if(!email_pattern.test(formvalue)){
    error.email="Email did'nt Match";
}

if(formvalue.password===""){
    error.password="Password Requird";
}
else if(!password_pattern.test(formvalue.password)){
    error.email="Password did'nt Match";
}
}

// Staff Validation 
export  function ValidationFormStaff({formData}){
    const [errors,setErrors]=useState()
    Object.keys(formData).forEach(key => {
      if (formData[key] === '') {
        errors[key] = `*${key } is required`;
      }
    });
     setErrors(errors);
    return Object.keys(errors).length === 0;
}