import React from 'react'
import './Levae.css'
import LOgo from '../Sidebar/vlblogo.jpg'
import emailjs from '@emailjs/browser'

const Leave = () => {
  const sendEmail = (e) => {
    e.preventDefault();
    console.log(e)
    emailjs
        .sendForm('service_srjikue',
            'template_ntr3qgj',
            e.target, 
           'dV4vhrQi4rh3-QcLD',
       )
        .then((result) => {
             
                console.log('SUCCESS!',result.text);
                alert("Mail Send Successfully")
            },
            (error) => {
                console.log('FAILED...', error.text);
                alert("Mail Not Send Check Internet")
            },
        );
        e.target.reset();
};

//validation logic

  return (
    <>
      
      
      <form className='leave' onSubmit={sendEmail}>
        <h1>Welcome to Leave Form</h1>
        <img  className='pic' src={LOgo} alt='' />
                <label>Name</label>
                <input type="text" name="user_name" placeholder='Username' required/>
                <label>Email</label>
                <input type="email" name="user_email" placeholder='Staffemail@gmail.com' required/>
                <label>Message</label>
                <textarea name="message" placeholder='Type your Message Hear' required/>
                
                <input  type="submit" value="Send" />
                
            </form>
      
    </>
  )
}

export default Leave