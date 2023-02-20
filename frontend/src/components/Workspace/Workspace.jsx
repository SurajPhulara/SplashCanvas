import React from 'react'
import { Canvas } from '../'
import "./Workspace.css"

const Workspace = () => {
  return (
    <div className='workspace'>
      <div className="canvas_header">
        <div className="">left</div>
        <div className="tools">tools</div>
        <div className="colors">colors</div>
      </div>
      <div className='canvas_container'>
        <Canvas></Canvas>
      </div>
    </div>
  )
}

export default Workspace
