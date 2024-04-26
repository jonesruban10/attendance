import React from 'react'
import './Dashbord.css'
import Sidebar from "../Sidebar/Sidebar.jsx"
import { Maindash } from '../Maindashs/Maindash.js';



function Dashbord() {
  return (
    <>
      <div className='dashbord'>
        <div className='dashbordglass'>
            {/* <Sidebar/>  */}
          < Sidebar/>
           <Maindash/>
           
        </div>

      </div>
    </>
  )
}

export default Dashbord;