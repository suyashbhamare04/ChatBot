import React from 'react'
import Logo1 from './Images/logo1.jpg'
import LogoAfg from './Images/logoafg.jpeg'
import './Header.css'
import 'bootstrap/dist/css/bootstrap.min.css'


function Header() {
  return (
    <div className='header'>
        <div className='d-flex justify-content-around '>
            <div>
                <img src={Logo1} alt="" />
                
            </div>
            <div className='d-flex align-items-center'>
                <h2>Admin Dashboard</h2>
            </div>
            <div>
                <img src={LogoAfg} alt="" />
                <button class="btn btn-danger">Logout</button>
            </div>
        </div>
       
    </div>
  )
}

export default Header