import React from 'react'
import NavBar from '../NavBar/NavBar'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
      <>
    <NavBar/>
    <div className='vh-100'>
    <Outlet/>
    </div>
    </>
  )
}
