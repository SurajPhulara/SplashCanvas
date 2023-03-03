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
import CheckIcon from '@mui/icons-material/Check';
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
import PropTypes from 'prop-types';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonAdd from '@mui/icons-material/PersonAdd'
import host from '../../host/host'
import socket from '../../socket/socket'
import axios from 'axios'
import Loading from '../Loading/Loading'

const Workspace = (props) => {

  const location = host + useLocation().pathname; // get the location parameter from props
  console.log(" tist is curr l : : ", location)
  // const { uuid } = props.match.params; // get the uuid parameter from props
  const { uuid } = useParams(); // retrieve the UUID from the URL params
  // socket.emit('join_canvas', uuid)
  console.log("id of canvas ", uuid); // log the uuid to the console to test
  const grid = useSelector((state) => state.grid.grid)
  const fullscreen = useSelector((state) => state.screen.fullscreen)

  const canvas = useSelector((state) => state.canvas)
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  function SimpleDialog(props) {
    const { onClose, open } = props;
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


  const [state, setState] = useState(false)
  const [chight, setchight] = useState(100)
  // let chight = 0;
  useEffect(() => {
    axios
      .get(`${host}/get_canvas/${uuid}`)
      .then((response) => {
        dispatch(save2(response.data.canvas_image))
        setchight(response.data.canvas_height)
        setState(true)
      })
      .catch((error) => {
        console.error(error);
        setState(true)
      });
  }, [uuid]);
  


  return (
    <div className='workspace'>
      <div className="canvas_header">
        <div className="grid">
          {/* <Paper elevation={0} sx={{ display: 'flex', border: (theme) => `1px solid ${theme.palette.divider}`, flexWrap: 'wrap', height:'40px', width:'40px', backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(5px)',}} > */}
          <Paper elevation={5} sx={{ width: 'fit-content' }}>
            <ToggleButton value="check" selected={grid} onChange={() => { dispatch(toggle_grid()); }} sx={{ height: '40px', width: '40px', backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(5px)', }}>
              <GridOnIcon />
            </ToggleButton>
          </Paper>
        </div>
        <div className="tools">
          <Paper elevation={5} sx={{ display: 'flex', padding: '0 10px', border: (theme) => `1px solid ${theme.palette.divider}`, flexWrap: 'wrap', backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(5px)', }} >
            <div className={(canvas.past.length >= 1) ? "tool_option" : "tool_option disable"} onClick={(e) => dispatch(undo({uuid}))}><IconButton><UTurnLeftIcon sx={{ color: 'black', transform: "rotate(90deg)" }} /></IconButton></div>
            <div className={(canvas.future.length >= 1) ? "tool_option" : "tool_option disable"} onClick={(e) => dispatch(redo({uuid}))}><IconButton><UTurnRightIcon sx={{ color: 'black', transform: "rotate(270deg)" }} /></IconButton></div>
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
        {/* <Canvas grid={grid}></Canvas> */}
      </div>
      <div className="fullscreen_toggle">
        {/* <Paper elevation={0} sx={{ display: 'flex', border: (theme) => `1px solid ${theme.palette.divider}`, flexWrap: 'wrap', height:'40px', width:'40px', backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(5px)',}} > */}
        <Paper elevation={5}>
          <ToggleButton value="check" selected={fullscreen} onChange={() => { dispatch(toggle_fullscreen()); }} sx={{ height: '40px', width: '40px', backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(5px)', }}>
            {fullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
          </ToggleButton>
        </Paper>
      </div>
    </div>
  )
}

export default Workspace
