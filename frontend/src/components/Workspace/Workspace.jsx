import React, { useEffect } from 'react'
import { Canvas } from '../'
import "./Workspace.css"
import { useSelector, useDispatch } from 'react-redux'
import { tool_change } from '../../app/toolSlice'
import BorderColorIcon from '@mui/icons-material/BorderColor';

import { IconButton } from '@mui/material';
import UTurnLeftIcon from '@mui/icons-material/UTurnLeft';
import UTurnRightIcon from '@mui/icons-material/UTurnRight';
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import ShapeLineIcon from '@mui/icons-material/ShapeLine';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import CropDinIcon from '@mui/icons-material/CropDin';
import AllOutIcon from '@mui/icons-material/AllOut';

import { store } from '../../app/store'
import { redo, undo } from '../../app/canvasSlice'

const Workspace = () => {
  
  const canvas = useSelector((state) => state.canvas)
  const dispatch = useDispatch();

  return (
    <div className='workspace'>
      <div className="canvas_header">
        <div className="">left</div>
        <div className="tools">
          <div className={(canvas.past.length >=1)? "straight_line" : "straight_line disable"} onClick={(e)=>dispatch(undo())}><IconButton><UTurnLeftIcon sx={{transform: "rotate(90deg)"}}/></IconButton></div>
          <div className={(canvas.future.length >=1)? "straight_line" : "straight_line disable"} onClick={(e)=>dispatch(redo())}><IconButton><UTurnRightIcon sx={{transform: "rotate(270deg)"}}/></IconButton></div>
          <div className="pencil" onClick={(e)=>dispatch(tool_change("pencil"))} ><IconButton><BorderColorIcon sx={{}}></BorderColorIcon></IconButton></div>
          <div className="straight_line" onClick={(e)=>dispatch(tool_change("straight_line"))}><IconButton><ShapeLineIcon sx={{}}></ShapeLineIcon></IconButton></div>
          <div className="straight_line" onClick={(e)=>dispatch(tool_change("circle"))}><IconButton><PanoramaFishEyeIcon sx={{}}></PanoramaFishEyeIcon></IconButton></div>
          <div className="straight_line" onClick={(e)=>dispatch(tool_change("ellipse"))}><IconButton><AllOutIcon sx={{}}></AllOutIcon></IconButton></div>
          <div className="straight_line" onClick={(e)=>dispatch(tool_change("rectangle"))}><IconButton><CropDinIcon></CropDinIcon></IconButton></div>
          <div className="straight_line" onClick={(e)=>dispatch(tool_change("triangle"))}><IconButton><ChangeHistoryIcon sx={{}}></ChangeHistoryIcon></IconButton></div>
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
