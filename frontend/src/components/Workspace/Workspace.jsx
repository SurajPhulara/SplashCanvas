import React, { useEffect, useState } from 'react'
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
import GridOnIcon from '@mui/icons-material/GridOn';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';

import { redo, save2, undo } from '../../app/canvasSlice'
import { toggle_grid } from '../../app/gridSlice'
import { useLocation, useParams } from 'react-router-dom'
import { toggle_fullscreen } from '../../app/screenSlice'

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Button } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import host from '../../host/host'
import axios from 'axios'
import Loading from '../Loading/Loading'

const Workspace = (props) => {
  // get the location path
  const location = host + useLocation().pathname;
  console.log(" tist is curr l : : ", location)
  // get the canvas id from the route params
  const { uuid } = useParams();
  console.log("id of canvas ", uuid);
  // get the current grid state from redux
  const grid = useSelector((state) => state.grid.grid)
  // get the current fullscreen state from redux
  const fullscreen = useSelector((state) => state.screen.fullscreen)
  // get the canvas state from redux
  const canvas = useSelector((state) => state.canvas)
  // get the dispatch function from the redux store
  const dispatch = useDispatch();

  // state for the dialog box
  const [open, setOpen] = useState(false);
  // function to open the dialog box
  const handleClickOpen = () => {
    setOpen(true)
  }
  // function to close the dialog box
  const handleClose = () => {
    setOpen(false)
  }

  // functional component for the dialog box
  function SimpleDialog(props) {
    const { onClose, open } = props;
    // function to copy the current location path to the clipboard
    function copy() {
      navigator.clipboard.writeText(location)
    }
    return (
      <Dialog open={open}>
        <DialogTitle>Send form</DialogTitle>
        <List sx={{ pt: 0 }}>
          <ListItem button onClick={() => (console.log("pp"))}>
            <ListItemAvatar sx={{ width: 'fit-content' }}>
              {location}
            </ListItemAvatar>
            <ListItemText />
          </ListItem>
          <div style={{ float: 'right', marginRight: '15px' }}>
            <Button variant="text" sx={{ color: 'gray', marginRight: '20px' }} onClick={onClose} >Cancel</Button>
            <Button variant="outlined" sx={{ color: 'grey' }} onClick={copy} >Copy</Button>
          </div>
        </List>
      </Dialog>
    );
  }

  // state for the canvas height and image
  const [state, setState] = useState(false)
  const [chight, setchight] = useState(100)
  // effect hook to fetch the canvas image and height from the backend
  useEffect(() => {
    axios
      .get(`${host}/get_canvas/${uuid}`)
      .then((response) => {
        // save the canvas image to redux state
        dispatch(save2(response.data.canvas_image))
        // set the canvas height
        setchight(response.data.canvas_height)
        // set the state to true to indicate that the fetch is complete
        setState(true)
      })
      .catch((error) => {
        console.error(error);
        // set the state to true even if there was an error to prevent an infinite loop
        setState(true)
      });
  }, [uuid]);



  // Returns JSX element containing canvas and controls
  return (
    <div className='workspace'>
      <div className="canvas_header">
        {/* Grid toggle button */}
        <div className="grid">
          <Paper elevation={5} sx={{ width: 'fit-content' }}>
            <ToggleButton value="check" selected={grid} onChange={() => { dispatch(toggle_grid()); }} sx={{ height: '40px', width: '40px', backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(5px)', }}>
              <GridOnIcon />
            </ToggleButton>
          </Paper>
        </div>

        {/* Tools section */}
        <div className="tools">
          <Paper elevation={5} sx={{ display: 'flex', padding: '0 10px', border: (theme) => `1px solid ${theme.palette.divider}`, flexWrap: 'wrap', backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(5px)', }} >
            {/* Undo button */}
            <div className={(canvas.past.length >= 1) ? "tool_option" : "tool_option disable"} onClick={(e) => dispatch(undo({uuid}))}><IconButton><UTurnLeftIcon sx={{ color: 'black', transform: "rotate(90deg)" }} /></IconButton></div>
            {/* Redo button */}
            <div className={(canvas.future.length >= 1) ? "tool_option" : "tool_option disable"} onClick={(e) => dispatch(redo({uuid}))}><IconButton><UTurnRightIcon sx={{ color: 'black', transform: "rotate(270deg)" }} /></IconButton></div>
            {/* Pencil tool */}
            <div className="pencil" onClick={(e) => dispatch(tool_change("pencil"))} ><IconButton><BorderColorIcon sx={{ color: 'black' }}></BorderColorIcon></IconButton></div>
            {/* Straight line tool */}
            <div className="tool_option" onClick={(e) => dispatch(tool_change("straight_line"))}><IconButton><ShapeLineIcon sx={{ color: 'black' }}></ShapeLineIcon></IconButton></div>
            {/* Circle tool */}
            <div className="tool_option" onClick={(e) => dispatch(tool_change("circle"))}><IconButton><PanoramaFishEyeIcon sx={{ color: 'black' }}></PanoramaFishEyeIcon></IconButton></div>
            {/* Ellipse tool */}
            <div className="tool_option" onClick={(e) => dispatch(tool_change("ellipse"))}><IconButton><AllOutIcon sx={{ color: 'black' }}></AllOutIcon></IconButton></div>
            {/* Rectangle tool */}
            <div className="tool_option" onClick={(e) => dispatch(tool_change("rectangle"))}><IconButton><CropDinIcon sx={{ color: 'black' }}></CropDinIcon></IconButton></div>
            {/* Triangle tool */}
            <div className="tool_option" onClick={(e) => dispatch(tool_change("triangle"))}><IconButton><ChangeHistoryIcon sx={{ color: 'black' }}></ChangeHistoryIcon></IconButton></div>
            {/* Eraser tool */}
            <div className="tool_option" onClick={(e) => dispatch(tool_change("eraser"))}><IconButton><ViewArrayIcon sx={{ color: 'black', transform: "rotate(135deg)" }}></ViewArrayIcon></IconButton></div>
          </Paper>
        </div>
        <div className="colors">
          <Paper elevation={5} sx={{ display: 'flex', padding: '0 10px', border: (theme) => `1px solid ${theme.palette.divider}`, flexWrap: 'wrap', backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(5px)', }} >
            <div className="color-circle" onClick={(e) => dispatch(color_change("black"))}><IconButton><CircleIcon sx={{ color: 'black' }}></CircleIcon></IconButton></div>
            <div className="color-circle" onClick={(e) => dispatch(color_change("red"))}><IconButton><CircleIcon sx={{ color: 'red' }}></CircleIcon></IconButton></div>
            <div className="color-circle" onClick={(e) => dispatch(color_change("blue"))}><IconButton><CircleIcon sx={{ color: 'blue' }}></CircleIcon></IconButton></div>
            <div className="color-circle" onClick={(e) => dispatch(color_change("green"))}><IconButton><CircleIcon sx={{ color: 'green' }}></CircleIcon></IconButton></div>
            <div className="color-circle" onClick={(e) => dispatch(color_change("yellow"))}><IconButton><CircleIcon sx={{ color: 'yellow' }}></CircleIcon></IconButton></div>
            <div className="color-circle" onClick={(e) => dispatch(color_change("purple"))}><IconButton><CircleIcon sx={{ color: 'purple' }}></CircleIcon></IconButton></div>
            <div className="share-button" onClick={handleClickOpen}><IconButton><PersonAddIcon sx={{color: 'black'}}></PersonAddIcon></IconButton></div>
            <SimpleDialog open={open} onClose={handleClose} />
          </Paper>
        </div>
      </div>
      <div className='canvas_container'>
        {state? <Canvas grid={grid} height={chight}></Canvas> : <Loading></Loading>}
      </div>
      <div className="fullscreen_toggle">
        <Paper elevation={5}>
          <ToggleButton value="check" selected={fullscreen} onChange={() => { dispatch(toggle_fullscreen()); }} sx={{ height: '40px', width: '40px', backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(5px)', }}>
            {/* A conditional rendering of the FullscreenIcon or FullscreenExitIcon based on the fullscreen state */}
            {fullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
          </ToggleButton>
        </Paper>
      </div>
    </div>
  )
}

export default Workspace
