// import necessary libraries and modules
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import "./Canvas.css";
import Drawing from './Draw';

const Canvas = (props) => {
  // retrieve the UUID from the URL params
  const { uuid } = useParams();
  // select the canvas and grid state from the redux store
  const canvas = useSelector((state) => state.canvas);
  const grid = useSelector((state) => state.grid.grid);

  // create refs for the canvas elements
  const canvasRef = useRef(null);
  const canvas2Ref = useRef(null);
  const canvas3Ref = useRef(null);

  // useEffect hook to draw grid lines if grid state is true
  useEffect(()=>{
    const canvas3 = canvas3Ref.current; 
    const ctx3 = canvas3.getContext('2d');
    console.log("gird in the canvas js is  :  ", grid)
    ctx3.beginPath();
    if(grid)
    {
      const GRID_SIZE = 10;

      // draw vertical grid lines
      for (let x = 0; x <= canvas3.width; x += GRID_SIZE) {
        ctx3.moveTo(x, 0);
        ctx3.lineTo(x, canvas3.height);
      }
      // draw horizontal grid lines
      for (let y = 0; y <= canvas3.height; y += GRID_SIZE) {
        ctx3.moveTo(0, y);
        ctx3.lineTo(canvas3.width, y);
      }
      // set stroke color and draw the lines
      ctx3.strokeStyle = "#ddd";
      ctx3.stroke();
    }
    else // clear the grid if grid state is false
    {
      console.log("clearing the canvas  :  ", grid)
      ctx3.clearRect(0, 0, canvas3.width, canvas3.height);
    }
  },[grid])

  // useEffect hook to redraw canvas when changes are made to the canvas state
  useEffect(()=>{
    const ctx = canvasRef.current.getContext('2d');
    const ctx2 = canvas2Ref.current.getContext('2d');
    
    if(canvas.past.length >= 1) // if there are changes in canvas state
    {
      if(canvas.past.length >=1) // if there is more than 1 change in canvas state
      {
        // draw current canvas state onto the second canvas
        ctx2.drawImage(canvasRef.current, 0, 0);
        // clear the original canvas
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
      // load the most recent change in canvas state as an image
      const img = new Image();
      img.src = canvas.past[canvas.past.length-1];
      img.onload = () => {
        // draw the image onto the original canvas
        ctx.drawImage(img, 0, 0);
        // clear the second canvas
        ctx2.clearRect(0, 0, canvas2Ref.current.width, canvas2Ref.current.height);
      }
    } 
    else // clear the original canvas if there are no changes
    {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  },[canvas.past])

  // call Drawing function from Draw.js to handle user input and socket connections
  Drawing(canvasRef, canvas2Ref, canvas3Ref, uuid, props.height)

  // render the three canvas elements within a div
  return (
    <div className='mycanvas'>
      <canvas className="canvas canvas1" ref={canvasRef}>
      </canvas>
      <canvas className="canvas canvas2" ref={canvas2Ref}>
      </canvas>
      <canvas className="canvas canvas2 canvas3" ref={canvas3Ref}>
      </canvas>
    </div>
  )
}

export default Canvas

