import React from 'react'
import "./Navbar.css"
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='navbar_left'>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/allboards">All boards</NavLink>
      </div>
      <div className='navbar_right'>
        <NavLink to="signin">Sign in</NavLink>
        <NavLink to="signup">Sign up</NavLink>
      </div>
    </div>
  )
}

export default Navbar
