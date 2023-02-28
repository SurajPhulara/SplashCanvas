import React, { useEffect } from 'react'
import { Canvas } from '../'
import "./Workspace.css"
import { useSelector, useDispatch } from 'react-redux'
import { color_change, tool_change } from '../../app/toolSlice'
import BorderColorIcon from '@mui/icons-material/BorderColor';

import { IconButton, Paper, ToggleButton } from '@mui/material';
import UTurnLeftIcon from '@mui/icons-material/UTurnLeft';
import UTurnRightIcon from '@mui/icons-material/UTurnRight';
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import ShapeLineIcon from '@mui/icons-material/ShapeLine';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import CropDinIcon from '@mui/icons-material/CropDin';
import AllOutIcon from '@mui/icons-material/AllOut';
import CircleIcon from '@mui/icons-material/Circle';
import ViewArrayIcon from '@mui/icons-material/ViewArray';
import CheckIcon from '@mui/icons-material/Check';
import GridOnIcon from '@mui/icons-material/GridOn';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';

import { redo, undo } from '../../app/canvasSlice'
import { toggle_grid } from '../../app/gridSlice'
import { useParams } from 'react-router-dom'
import { toggle_fullscreen } from '../../app/screenSlice'

const Workspace = (props) => {

  // const { uuid } = props.match.params; // get the uuid parameter from props
  const { uuid } = useParams(); // retrieve the UUID from the URL params
  console.log("id of canvas ", uuid); // log the uuid to the console to test
  const grid = useSelector((state) => state.grid.grid)
  const fullscreen = useSelector((state) => state.screen.fullscreen)

  const canvas = useSelector((state) => state.canvas)
  const dispatch = useDispatch();
  return (
    <div className='workspace'>
      <div className="canvas_header">
        <div className="grid">
          {/* <Paper elevation={0} sx={{ display: 'flex', border: (theme) => `1px solid ${theme.palette.divider}`, flexWrap: 'wrap', height:'40px', width:'40px', backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(5px)',}} > */}
          <ToggleButton value="check" selected={grid} onChange={() => { dispatch(toggle_grid()); }} sx={{ height: '40px', width: '40px', backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(5px)', }}>
            <GridOnIcon />
          </ToggleButton>
          {/* </Paper> */}
        </div>
        <div className="tools">
          <Paper elevation={0} sx={{ display: 'flex', padding: '0 10px', border: (theme) => `1px solid ${theme.palette.divider}`, flexWrap: 'wrap', backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(5px)', }} >
            <div className={(canvas.past.length >= 1) ? "tool_option" : "tool_option disable"} onClick={(e) => dispatch(undo())}><IconButton><UTurnLeftIcon sx={{ color: 'black', transform: "rotate(90deg)" }} /></IconButton></div>
            <div className={(canvas.future.length >= 1) ? "tool_option" : "tool_option disable"} onClick={(e) => dispatch(redo())}><IconButton><UTurnRightIcon sx={{ color: 'black', transform: "rotate(270deg)" }} /></IconButton></div>
            <div className="pencil" onClick={(e) => dispatch(tool_change("pencil"))} ><IconButton><BorderColorIcon sx={{ color: 'black' }}></BorderColorIcon></IconButton></div>
            <div className="tool_option" onClick={(e) => dispatch(tool_change("straight_line"))}><IconButton><ShapeLineIcon sx={{ color: 'black' }}></ShapeLineIcon></IconButton></div>
            <div className="tool_option" onClick={(e) => dispatch(tool_change("circle"))}><IconButton><PanoramaFishEyeIcon sx={{ color: 'black' }}></PanoramaFishEyeIcon></IconButton></div>
            <div className="tool_option" onClick={(e) => dispatch(tool_change("ellipse"))}><IconButton><AllOutIcon sx={{ color: 'black' }}></AllOutIcon></IconButton></div>
            <div className="tool_option" onClick={(e) => dispatch(tool_change("rectangle"))}><IconButton><CropDinIcon sx={{ color: 'black' }}></CropDinIcon></IconButton></div>
            <div className="tool_option" onClick={(e) => dispatch(tool_change("triangle"))}><IconButton><ChangeHistoryIcon sx={{ color: 'black' }}></ChangeHistoryIcon></IconButton></div>
            <div className="tool_option" onClick={(e) => dispatch(tool_change("eraser"))}><IconButton><ViewArrayIcon sx={{ color: 'black', transform: "rotate(135deg)" }}></ViewArrayIcon></IconButton></div>
          </Paper>
        </div>
        <div className="colors">
          <Paper elevation={0} sx={{ display: 'flex', padding: '0 10px', border: (theme) => `1px solid ${theme.palette.divider}`, flexWrap: 'wrap', backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(5px)', }} >
            <div className="color-circle" onClick={(e) => dispatch(color_change("black"))}><IconButton><CircleIcon sx={{ color: 'black' }}></CircleIcon></IconButton></div>
            <div className="color-circle" onClick={(e) => dispatch(color_change("red"))}><IconButton><CircleIcon sx={{ color: 'red' }}></CircleIcon></IconButton></div>
            <div className="color-circle" onClick={(e) => dispatch(color_change("blue"))}><IconButton><CircleIcon sx={{ color: 'blue' }}></CircleIcon></IconButton></div>
            <div className="color-circle" onClick={(e) => dispatch(color_change("green"))}><IconButton><CircleIcon sx={{ color: 'green' }}></CircleIcon></IconButton></div>
            <div className="color-circle" onClick={(e) => dispatch(color_change("yellow"))}><IconButton><CircleIcon sx={{ color: 'yellow' }}></CircleIcon></IconButton></div>
            <div className="color-circle" onClick={(e) => dispatch(color_change("purple"))}><IconButton><CircleIcon sx={{ color: 'purple' }}></CircleIcon></IconButton></div>
          </Paper>
        </div>
      </div>
      <div className='canvas_container'>
        <Canvas grid={grid}></Canvas>
      </div>
      <div className="fullscreen_toggle">
          {/* <Paper elevation={0} sx={{ display: 'flex', border: (theme) => `1px solid ${theme.palette.divider}`, flexWrap: 'wrap', height:'40px', width:'40px', backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(5px)',}} > */}
          <ToggleButton value="check" selected={fullscreen} onChange={() => { dispatch(toggle_fullscreen()); }} sx={{ height: '40px', width: '40px', backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(5px)', }}>
            {fullscreen?<FullscreenExitIcon />:<FullscreenIcon />}
          </ToggleButton>
          {/* </Paper> */}
        </div>
    </div>
  )
}

export default Workspace
