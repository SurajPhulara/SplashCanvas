import React from 'react'
import "./Home.css"
import { NavLink } from 'react-router-dom'

const Home = () => {
  return (
    <div className='home'>
      <NavLink to="/Workspace">Try a whiteboard now</NavLink>
    </div>
  )
}

export default Home

