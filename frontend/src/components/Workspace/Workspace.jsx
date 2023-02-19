import React from 'react'
import { Canvas } from '../'
import "./Workspace.css"

const Workspace = () => {
  return (
    <div className='workspace'>
      Workspace
      <div className='canvas_container'>
        <Canvas></Canvas>
      </div>
    </div>
  )
}

export default Workspace
