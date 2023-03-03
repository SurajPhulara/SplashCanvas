import React from 'react'
import "./Home.css"
import { v4 as uuidv4 } from 'uuid'; // import uuidv4 function
import { NavLink } from 'react-router-dom'

const Home = () => {
  const uuid = uuidv4(); // generate a unique UUID
  // console.log(uuid)

  const generate =() => {
    uuid = uuidv4()
  }
  
  return (
    <div className='home'>
      <NavLink to={`/workspace/`+uuid} onClick={generate}>Try a whiteboard now</NavLink>
    </div>
  )
}

export default Home