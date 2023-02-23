import React, { useEffect } from 'react'
import { Canvas } from '../'
import "./Workspace.css"
import { useSelector, useDispatch } from 'react-redux'
import { tool_change } from '../../app/toolSlice'
import BorderColorIcon from '@mui/icons-material/BorderColor';

import { store } from '../../app/store'

const Workspace = () => {
  
  const tool = useSelector((state) => state.tool)
  const dispatch = useDispatch()

  return (
    <div className='workspace'>
      <div className="canvas_header">
        <div className="">left</div>
        <div className="tools">
          <div className="pencil" onClick={(e)=>dispatch(tool_change("pencil"))} ><BorderColorIcon></BorderColorIcon></div>
          <div className="straight_line" onClick={(e)=>dispatch(tool_change("straight_line"))}>line</div>
          <div className="straight_line" onClick={(e)=>dispatch(tool_change("circle"))}>circle</div>
          <div className="straight_line" onClick={(e)=>dispatch(tool_change("rectangle"))}>rectangle</div>
          <div className="straight_line" onClick={(e)=>dispatch(tool_change("ellipse"))}>ellipse</div>
        </div>
        <div className="colors">colors</div>
      </div>
      <div className='canvas_container'>
        <Canvas></Canvas>
      </div>
    </div>
  )
}

export default Workspace
