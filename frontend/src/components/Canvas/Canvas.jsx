import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import "./Canvas.css"
import Drawing from './Draw'

const Canvas = () => {

  const canvas = useSelector((state) => state.canvas)
  // console.log("qwertyqwerty     ::  ",tool)

  
  const canvasRef = useRef(null);
  const canvas2Ref = useRef(null);
  
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

  Drawing(canvasRef, canvas2Ref)
  
  return (
    <div className='mycanvas'>
      <canvas className="canvas" ref={canvasRef}>
      </canvas>
      <canvas className="canvas canvas2" ref={canvas2Ref}>
      </canvas>
    </div>
  )
}

export default Canvas

