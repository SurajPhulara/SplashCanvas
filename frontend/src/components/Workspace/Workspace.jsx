import React, { useEffect } from 'react'
import { Canvas } from '../'
import "./Workspace.css"
import { useSelector, useDispatch } from 'react-redux'
import { color_change, tool_change } from '../../app/toolSlice'
import BorderColorIcon from '@mui/icons-material/BorderColor';

import { IconButton } from '@mui/material';
import UTurnLeftIcon from '@mui/icons-material/UTurnLeft';
import UTurnRightIcon from '@mui/icons-material/UTurnRight';
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import ShapeLineIcon from '@mui/icons-material/ShapeLine';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import CropDinIcon from '@mui/icons-material/CropDin';
import AllOutIcon from '@mui/icons-material/AllOut';
import CircleIcon from '@mui/icons-material/Circle';
import ViewArrayIcon from '@mui/icons-material/ViewArray';

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
          <div className={(canvas.past.length >=1)? "tool_option" : "tool_option disable"} onClick={(e)=>dispatch(undo())}><IconButton><UTurnLeftIcon sx={{transform: "rotate(90deg)"}}/></IconButton></div>
          <div className={(canvas.future.length >=1)? "tool_option" : "tool_option disable"} onClick={(e)=>dispatch(redo())}><IconButton><UTurnRightIcon sx={{transform: "rotate(270deg)"}}/></IconButton></div>
          <div className="pencil" onClick={(e)=>dispatch(tool_change("pencil"))} ><IconButton><BorderColorIcon sx={{}}></BorderColorIcon></IconButton></div>
          <div className="tool_option" onClick={(e)=>dispatch(tool_change("straight_line"))}><IconButton><ShapeLineIcon sx={{}}></ShapeLineIcon></IconButton></div>
          <div className="tool_option" onClick={(e)=>dispatch(tool_change("circle"))}><IconButton><PanoramaFishEyeIcon sx={{}}></PanoramaFishEyeIcon></IconButton></div>
          <div className="tool_option" onClick={(e)=>dispatch(tool_change("ellipse"))}><IconButton><AllOutIcon sx={{}}></AllOutIcon></IconButton></div>
          <div className="tool_option" onClick={(e)=>dispatch(tool_change("rectangle"))}><IconButton><CropDinIcon></CropDinIcon></IconButton></div>
          <div className="tool_option" onClick={(e)=>dispatch(tool_change("triangle"))}><IconButton><ChangeHistoryIcon sx={{}}></ChangeHistoryIcon></IconButton></div>
          <div className="tool_option" onClick={(e)=>dispatch(tool_change("eraser"))}><IconButton><ViewArrayIcon sx={{transform: "rotate(135deg)"}}></ViewArrayIcon></IconButton></div>
        </div>
        <div className="colors">
          <div className="color-circle"onClick={(e)=>dispatch(color_change("black"))}><IconButton><CircleIcon sx={{color: 'black'}}></CircleIcon></IconButton></div>
          <div className="color-circle"onClick={(e)=>dispatch(color_change("red"))}><IconButton><CircleIcon sx={{color: 'red'}}></CircleIcon></IconButton></div>
          <div className="color-circle"onClick={(e)=>dispatch(color_change("blue"))}><IconButton><CircleIcon sx={{color: 'blue'}}></CircleIcon></IconButton></div>
          <div className="color-circle"onClick={(e)=>dispatch(color_change("green"))}><IconButton><CircleIcon sx={{color: 'green'}}></CircleIcon></IconButton></div>
          <div className="color-circle"onClick={(e)=>dispatch(color_change("yellow"))}><IconButton><CircleIcon sx={{color: 'yellow'}}></CircleIcon></IconButton></div>
          <div className="color-circle"onClick={(e)=>dispatch(color_change("purple"))}><IconButton><CircleIcon sx={{color: 'purple'}}></CircleIcon></IconButton></div>
        </div>
      </div>
      <div className='canvas_container'>
        <Canvas></Canvas>
      </div>
    </div>
  )
}

export default Workspace
