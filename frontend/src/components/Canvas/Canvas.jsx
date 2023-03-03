import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import socket from '../../socket/socket'
import "./Canvas.css"
import Drawing from './Draw'

const Canvas = (props) => {
  

  const { uuid } = useParams(); // retrieve the UUID from the URL params
  const canvas = useSelector((state) => state.canvas)
  const grid = useSelector((state) => state.grid.grid)

  
  const canvasRef = useRef(null);
  const canvas2Ref = useRef(null);
  const canvas3Ref = useRef(null);
  
  useEffect(()=>{

    const canvas3 = canvas3Ref.current; 
    
    const ctx3 = canvas3.getContext('2d');
    console.log("gird in the canvas js is  :  ", grid)
    ctx3.beginPath();
    if(grid)
    {
      const GRID_SIZE = 10;

      for (let x = 0; x <= canvas3.width; x += GRID_SIZE) {
        ctx3.moveTo(x, 0);
        ctx3.lineTo(x, canvas3.height);
      }
      for (let y = 0; y <= canvas3.height; y += GRID_SIZE) {
        ctx3.moveTo(0, y);
        ctx3.lineTo(canvas3.width, y);
      }
      ctx3.strokeStyle = "#ddd";
      ctx3.stroke();
    }
    else
    {
      console.log("clearing the canvas  :  ", grid)
      ctx3.clearRect(0, 0, canvas3.width, canvas3.height);
    }
  },[grid])

  useEffect(()=>{
    const ctx = canvasRef.current.getContext('2d');
    const ctx2 = canvas2Ref.current.getContext('2d');
    
    if(canvas.past.length >= 1)
    {
      if(canvas.past.length >=1)
      {
        ctx2.drawImage(canvasRef.current, 0, 0);
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
      const img = new Image();
      img.src = canvas.past[canvas.past.length-1];
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
        ctx2.clearRect(0, 0, canvas2Ref.current.width, canvas2Ref.current.height);
      }
    } 
    else
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  },[canvas.past])
  
  Drawing(canvasRef, canvas2Ref, canvas3Ref, uuid, props.height)

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

