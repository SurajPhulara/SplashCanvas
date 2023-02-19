import React, { useEffect, useRef } from 'react'
import "./Canvas.css"
import Drawing from './Draw'

const Canvas = () => {


  const canvasRef = useRef(null);
  const canvas2Ref = useRef(null);

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
