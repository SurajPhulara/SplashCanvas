
import { useEffect } from "react"

import { useSelector, useDispatch } from 'react-redux'
import { save } from "../../app/canvasSlice";

import { store } from '../../app/store'

const Drawing = (canvasRef, canvas2Ref) => {
  
  const dispatch = useDispatch()

  // The default tool used for drawing
  // const tool = useSelector((state) => state.tool.tool)
  // console.log(" say hello to : ",tool)
  // const tool = "pencil";
  
  // Indicates whether the user is currently drawing on the canvas or not
  let isDrawing = false;
  
  useEffect(() => {
    
    // Get references to the two canvas elements passed in as props
    const canvas = canvasRef.current;
    const canvas2 = canvas2Ref.current;
    
    // Set the initial dimensions of the canvas elements
    canvas.width = window.innerWidth - 20;
    canvas.height = window.innerHeight+20;
    canvas2.width = window.innerWidth - 20;
    canvas2.height = window.innerHeight+20;
    
    // Get the context of the two canvas elements
    const ctx = canvas.getContext('2d');
    const ctx2 = canvas2.getContext('2d');
    
    // Set the default styles for drawing
    ctx.lineWidth = 3;
    ctx2.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    // Add event listeners for mouse and touch events on the canvas
    canvas.addEventListener('mousedown', (e) => startDrawing(e, ctx, ctx2));
    canvas.addEventListener('mousemove', (e) => draw(e, ctx, ctx2, canvas, canvas2));
    canvas.addEventListener('pointerup', (e) => stopDrawing(e, ctx, ctx2, canvas, canvas2));
    canvas.addEventListener('mouseout', (e) => stopDrawing(e, ctx, ctx2, canvas, canvas2));
    
    // Remove event listeners when the component unmounts
    return () => {
      canvas.removeEventListener('mousedown', (e) => startDrawing(e, ctx, ctx2));
      canvas.removeEventListener('mousemove', (e) => draw(e, ctx, ctx2, canvas, canvas2));
      canvas.removeEventListener('pointerup', (e) => stopDrawing(e, ctx, ctx2, canvas, canvas2));
      canvas.removeEventListener('mouseout', (e) => stopDrawing(e, ctx, ctx2, canvas, canvas2));
    };
    
  }, []); // Empty dependency array so that useEffect only runs once
  
  // Called when the user starts drawing
  let x,y;
  const startDrawing = (e, ctx, ctx2) => {
    isDrawing = true;
    ctx2.beginPath();
    ctx2.moveTo(e.offsetX, e.offsetY);
    x=e.offsetX;
    y=e.offsetY;
    ctx2.arc(e.offsetX, e.offsetY, ctx.lineWidth / 2, 0, 2 * Math.PI);
    ctx2.fill();
  };
  
  // Called when the user is actively drawing on the canvas
  const draw =(e, ctx, ctx2, canvas, canvas2) => {
    if (!isDrawing) return;

    const tool = store.getState().tool
    // console.log("compare yourself  :  ", tool)
   
    switch(tool.tool) {
      case 'pencil':
        ctx2.strokeStyle = tool.color;
        drawPencil(e, ctx2);
        break;
      case 'straight_line':
        ctx2.strokeStyle = tool.color;
        drawLine(e, ctx2, x, y, canvas);
        break;
      case 'circle':
        ctx2.strokeStyle = tool.color;
        drawCircle(e, ctx2, x, y, canvas);
        break;
      case 'rectangle':
        ctx2.strokeStyle = tool.color;
        drawRectangle(e, ctx2, x, y, canvas);
        break;
      case "ellipse":
        ctx2.strokeStyle = tool.color;
        drawEllipse(e, ctx2, x, y, canvas);
        break;
      case "triangle":
        ctx2.strokeStyle = tool.color;
        drawTriangle(e, ctx2, x, y, canvas);
        break;
      case 'eraser':
        erase(e, ctx);
        break;
      default:
        break;
    } 

    // Increase the canvas height if the user reaches the bottom of the canvas
    if (e.offsetY + window.innerHeight >= canvas.height + 100) {
      resize (e, ctx, ctx2, canvas, canvas2);
    }
  };
  
  const resize =(e, ctx, ctx2, canvas, canvas2) => {
    // Clear the context of canvas2
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    // Draw the current canvas onto canvas2
    ctx2.drawImage(canvas, 0, 0);
    // Increase the height of canvas1 to fit the new drawing area
    canvas.height = e.offsetY + window.innerHeight;
    // Draw the current canvas2 onto canvas1
    ctx.drawImage(canvas2, 0, 0);
  }

  const drawPencil = (e, ctx2) => {
    requestAnimationFrame(() => {
      ctx2.lineTo(e.offsetX, e.offsetY);
      ctx2.stroke();
    });
  }
  
  const drawLine = (e, ctx2, x, y, canvas) => {
    ctx2.clearRect(0, 0, canvas.width, canvas.height);
    ctx2.beginPath();
    ctx2.moveTo(x, y);
    ctx2.lineTo(e.offsetX, e.offsetY);
    ctx2.stroke();
  }
  
  const drawCircle = (e, ctx2, x, y, canvas) => {
    ctx2.clearRect(0, 0, canvas.width, canvas.height);
    const radius = Math.sqrt((e.offsetX - x) ** 2 + (e.offsetY - y) ** 2);
    ctx2.beginPath();
    ctx2.arc(x, y, radius, 0, 2 * Math.PI);
    ctx2.stroke();
  }
  
  const drawRectangle = (e, ctx2, x, y, canvas) => {
    ctx2.clearRect(0, 0, canvas.width, canvas.height);
    const width = e.offsetX - x;
    const height = e.offsetY - y;
    ctx2.strokeRect(x, y, width, height);
  }
  
  const drawEllipse = (e, ctx2, x, y, canvas) => {
    ctx2.clearRect(0, 0, canvas.width, canvas.height);
    const xRadius = Math.abs((e.offsetX - x) / 2);
    const yRadius = Math.abs((e.offsetY - y) / 2);
    const centerX = Math.min(x, e.offsetX) + xRadius;
    const centerY = Math.min(y, e.offsetY) + yRadius;
    ctx2.beginPath();
    ctx2.ellipse(centerX, centerY, xRadius, yRadius, 0, 0, Math.PI * 2);
    ctx2.stroke();
  }
  
  const drawTriangle = (e, ctx2, x, y, canvas) => {
    ctx2.clearRect(0, 0, canvas.width, canvas.height);
    const height = e.offsetY - y;
    const base = e.offsetX - x;
    const centerX = x + base / 2;
    const topY = y - height;
    ctx2.beginPath();
    ctx2.moveTo(centerX, topY);
    ctx2.lineTo(x, e.offsetY);
    ctx2.lineTo(e.offsetX, e.offsetY);
    ctx2.closePath();
    ctx2.stroke();
  };

  const erase = (e, ctx) => {
    ctx.clearRect(e.offsetX, e.offsetY, 20, 20);
  };

  // Called when the user stops drawing
  const stopDrawing = (e, ctx, ctx2, canvas, canvas2) => {
    if (!isDrawing) return;

    isDrawing = false;
    // Draw the current canvas2 onto canvas1
    ctx.drawImage(canvas2, 0, 0);
    // Increase the height of canvas2
    canvas2.height = canvas.height;
    // Reset the line width of the context of canvas2
    ctx2.lineWidth = 3;
    const canvasData = canvas.toDataURL();
    dispatch(save(canvasData));
  };
  
};

export default Drawing; 