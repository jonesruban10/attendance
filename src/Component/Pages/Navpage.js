
import React, { useEffect, useState } from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Attendancepage from './Attendancepage'
import Loginpage from './Loginpage'
import Leave from './Leave.jsx'
import Staffdetails from './Staffdetails'
import Studentdetails from './Studentdetails'
import Viewpage from './Viewpage.jsx'
import Dashboard from '../../Component/Dashbord/Dashbord'
import Signinpage from '../Pages/Signinpage.jsx'
import { isValidElement } from '../../utils.js'
import Homepage from './Homepage.jsx'

const Navpage = () => {

  const [user, setUser] = useState({});

  useEffect(() => {
    const data = isValidElement( localStorage.getItem("user"))? JSON.parse(localStorage.getItem('user')) : {}
    setUser(data);
  },[])

  return (
    <BrowserRouter>
      <Routes>
        {isValidElement(user?.id) ? <Route path="/" element={<Dashboard />}>
          <Route path="" element={<Homepage />} />
          <Route path="attendance" element={<Attendancepage />} />
          <Route path='leaveform' element={<Leave />} />
          <Route path='staffdetails' element={<Staffdetails />} />
          <Route path='studentdetails' element={<Studentdetails />} />
          <Route path='viewpage' element={<Viewpage />} />
          <Route path='addaccount' element={<Signinpage />} />

        </Route> : <><Route path='/' element={<Loginpage />} /><Route path='/logout' element={<Loginpage />} /></>}
        
        
        

      </Routes>
    </BrowserRouter>
  )
}

export default Navpage