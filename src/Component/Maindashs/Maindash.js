import React from 'react'
import './Maindash.css'

import { Outlet } from 'react-router-dom'



export const Maindash = () => {
  return (
    <div className='MainDash'>

      <Outlet />

    </div>
  )
}
