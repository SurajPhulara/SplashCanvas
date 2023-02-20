import { useEffect } from "react"

const Drawing = (canvasRef, canvas2Ref) => {
  
  // The default tool used for drawing
  const tool = "pencil";
  
  // Indicates whether the user is currently drawing on the canvas or not
  let isDrawing = false;
  
  useEffect(() => {
    
    // Get references to the two canvas elements passed in as props
    const canvas = canvasRef.current;
    const canvas2 = canvas2Ref.current;
    
    // Set the initial dimensions of the canvas elements
    canvas.width = window.innerWidth - 20;
    canvas.height = window.innerHeight - 20;
    canvas2.width = window.innerWidth - 20;
    canvas2.height = window.innerHeight;
    
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
  const startDrawing = (e, ctx, ctx2) => {
    isDrawing = true;
    ctx2.beginPath();
    ctx2.moveTo(e.offsetX, e.offsetY);
    console.log("first : ", e);
  };
  
  // Called when the user is actively drawing on the canvas
  const draw = (e, ctx, ctx2, canvas, canvas2) => {
    if (!isDrawing) return;
    console.log("second");
    requestAnimationFrame(() => {
      ctx2.lineTo(e.offsetX, e.offsetY);
      ctx2.stroke();
    });
    // Increase the canvas height if the user reaches the bottom of the canvas
    if (e.offsetY + window.innerHeight >= canvas.height + 100) {
      ctx2.drawImage(canvas, 0, 0);
      canvas.height = e.offsetY + window.innerHeight;
    }
  };
  
  // Called when the user stops drawing
  const stopDrawing = (e, ctx, ctx2, canvas, canvas2) => {
    isDrawing = false;
    // Draw the current canvas2 onto canvas1
    ctx.drawImage(canvas2, 0, 0);
    // Increase the height of canvas2
    canvas2.height = canvas.height + 20;
    // Reset the line width of the context of canvas2
    ctx2.lineWidth = 3;
  };
  
};

export default Drawing;