import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { redo2, save, save2, undo2 } from "../../app/canvasSlice";

import { store } from "../../app/store";
import socket from "../../socket/socket";

const Drawing = (canvasRef, canvas2Ref, canvas3Ref, uuid, canheight) => {
  const dispatch = useDispatch();

  // Indicates whether the user is currently drawing on the canvas or not
  let isDrawing = false;

  useEffect(() => {
    // Get references to the two canvas elements passed in as props
    const canvas = canvasRef.current;
    const canvas2 = canvas2Ref.current;
    const canvas3 = canvas3Ref.current;

    // Set the initial dimensions of the canvas elements
    canvas.width = window.innerWidth - 8;
    canvas.height = window.innerHeight + 20;
    canvas2.width = window.innerWidth - 8;
    canvas2.height = window.innerHeight + 20;
    canvas3.height = window.innerHeight + 20;
    canvas3.width = window.innerWidth + 20;
    if (canheight > window.innerHeight + 20) {
      canvas.height = canheight;
      canvas2.height = canheight;
      canvas3.height = canheight;
    }

    // Get the context of the two canvas elements
    const ctx = canvas.getContext("2d");
    const ctx2 = canvas2.getContext("2d");
    const ctx3 = canvas3.getContext("2d");

    socket.emit("join_canvas", uuid);

    socket.on("canvas_edit", (canvasData) => {
      console.log("canvas edit received this side");
      dispatch(save2(canvasData));
    });
    socket.on("canvas_edit_undo", (canvasData) => {
      console.log("canvas undo received undo");
      dispatch(undo2(canvasData));
    });
    socket.on("canvas_edit_redo", (canvasData) => {
      console.log("canvas redo received redo ");
      console.log("canvas edit received this side");
      dispatch(redo2(canvasData));
    });
    socket.on("canvas_height_change", (new_height) => {
      console.log("canvas edit received this side height");
      console.log("canvas height_change received");

      canvas3.height = new_height;
      ctx3.drawImage(canvas, 0, 0);
      ctx3.drawImage(canvas2, 0, 0);

      // ctx2.drawImage(canvas, 0, 0);
      canvas.height = new_height;
      // ctx.drawImage(canvas2, 0, 0);
      canvas2.height = new_height;

      ctx.drawImage(canvas3, 0, 0);

      ctx3.clearRect(0, 0, canvas3.width, canvas3.height);
      const grid = store.getState().grid.grid;
      if (grid) {
        // Redraw the grid
        const GRID_SIZE = 10;
        ctx3.beginPath();
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

      ctx.lineWidth = 3;
      ctx2.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
    });

    // Set the default styles for drawing
    ctx.lineWidth = 3;
    ctx2.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    // Add event listeners for mouse and touch events on the canvas
    canvas.addEventListener("mousedown", (e) => startDrawing(e, ctx, ctx2, canvas));
    canvas.addEventListener("mousemove", (e) => draw(e, ctx, ctx2, canvas, canvas2, ctx3, canvas3) );
    canvas.addEventListener("pointerup", (e) => stopDrawing(e, ctx, ctx2, canvas, canvas2) );
    canvas.addEventListener("mouseout", (e) => stopDrawing(e, ctx, ctx2, canvas, canvas2) );
    
    canvas.addEventListener("touchstart", (e) => startDrawing(e.touches[0], ctx, ctx2, canvas) );
    canvas.addEventListener("touchmove", (e) => {
      e.preventDefault();
      draw(e.touches[0], ctx, ctx2, canvas, canvas2, ctx3, canvas3);
    });
    canvas.addEventListener("touchend", (e) => stopDrawing(e, ctx, ctx2, canvas, canvas2) );

    // Remove event listeners when the component unmounts
    return () => {
      canvas.removeEventListener("mousedown", (e) =>
        startDrawing(e, ctx, ctx2)
      );
      canvas.removeEventListener("mousemove", (e) =>
        draw(e, ctx, ctx2, canvas, canvas2, ctx3, canvas3)
      );
      canvas.removeEventListener("pointerup", (e) =>
        stopDrawing(e, ctx, ctx2, canvas, canvas2)
      );
      canvas.removeEventListener("mouseout", (e) =>
        stopDrawing(e, ctx, ctx2, canvas, canvas2)
      );

      canvas.removeEventListener("touchstart", (e) =>
        startDrawing(e.touches[0], ctx, ctx2)
      );
      canvas.removeEventListener("touchmove", (e) => {
        e.preventDefault();
        draw(e.touches[0], ctx, ctx2, canvas, canvas2, ctx3, canvas3);
      });
      canvas.removeEventListener("touchend", (e) =>
        stopDrawing(e, ctx, ctx2, canvas, canvas2)
      );
    };
  }, []); // Empty dependency array so that useEffect only runs once

  // Called when the user starts drawing
  let x, y;
  const startDrawing = (e, ctx, ctx2, canvas) => {
    isDrawing = true;
    ctx2.beginPath();
    if (e.type === "mousedown") {
      // mouse event
      ctx2.moveTo(e.offsetX, e.offsetY);
      x = e.offsetX;
      y = e.offsetY;
      ctx2.arc(e.offsetX, e.offsetY, ctx.lineWidth / 2, 0, 2 * Math.PI);
    } else if (e.type === "touchstart") {
      // touch event
      const touch = e.touches[0];
      ctx2.moveTo(
        touch.pageX - canvas.offsetLeft,
        touch.pageY - canvas.offsetTop
      );
      x = touch.pageX - canvas.offsetLeft;
      y = touch.pageY - canvas.offsetTop;
      ctx2.arc(x, y, ctx.lineWidth / 2, 0, 2 * Math.PI);
    }
    ctx2.fill();
  };

  // Called when the user is actively drawing on the canvas
  const draw = (e, ctx, ctx2, canvas, canvas2, ctx3, canvas3) => {
    if (!isDrawing) return;
  
    const tool = store.getState().tool;
  
    let offsetX, offsetY;
    if (e.type === 'mousedown') {
      // mouse event
      offsetX = e.offsetX;
      offsetY = e.offsetY;
    } else if (e.type === 'touchmove') {
      // touch event
      const touch = e.touches[0];
      offsetX = touch.pageX - canvas.offsetLeft;
      offsetY = touch.pageY - canvas.offsetTop;
    }
  
    switch (tool.tool) {
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
      case 'ellipse':
        ctx2.strokeStyle = tool.color;
        drawEllipse(e, ctx2, x, y, canvas);
        break;
      case 'triangle':
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
    if (offsetY + window.innerHeight >= canvas.height + 100) {
      resize(e, ctx, ctx2, canvas, canvas2, ctx3, canvas3, offsetY);
    }
  };  

  const resize = (e, ctx, ctx2, canvas, canvas2, ctx3, canvas3, offsetY) => {
    // Clear the context of canvas2
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    // Draw the current canvas onto canvas2
    ctx2.drawImage(canvas, 0, 0);
    // Increase the height of canvas1 to fit the new drawing area
    canvas.height = offsetY + window.innerHeight;
    // Draw the current canvas2 onto canvas1
    ctx.drawImage(canvas2, 0, 0);

    socket.emit("canvas_height_change", canvas.height);

    canvas3.height = offsetY + window.innerHeight;
    const grid = store.getState().grid.grid;
    if (grid) {
      // Redraw the grid
      const GRID_SIZE = 10;
      ctx3.beginPath();
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
  };

  const drawPencil = (e, ctx2) => {
    requestAnimationFrame(() => {
      ctx2.lineTo(e.offsetX, e.offsetY);
      ctx2.stroke();
    });
  };

  const drawLine = (e, ctx2, x, y, canvas) => {
    ctx2.clearRect(0, 0, canvas.width, canvas.height);
    ctx2.beginPath();
    ctx2.moveTo(x, y);
    ctx2.lineTo(e.offsetX, e.offsetY);
    ctx2.stroke();
  };

  const drawCircle = (e, ctx2, x, y, canvas) => {
    ctx2.clearRect(0, 0, canvas.width, canvas.height);
    const radius = Math.sqrt((e.offsetX - x) ** 2 + (e.offsetY - y) ** 2);
    ctx2.beginPath();
    ctx2.arc(x, y, radius, 0, 2 * Math.PI);
    ctx2.stroke();
  };

  const drawRectangle = (e, ctx2, x, y, canvas) => {
    ctx2.clearRect(0, 0, canvas.width, canvas.height);
    const width = e.offsetX - x;
    const height = e.offsetY - y;
    ctx2.strokeRect(x, y, width, height);
  };

  const drawEllipse = (e, ctx2, x, y, canvas) => {
    ctx2.clearRect(0, 0, canvas.width, canvas.height);
    const xRadius = Math.abs((e.offsetX - x) / 2);
    const yRadius = Math.abs((e.offsetY - y) / 2);
    const centerX = Math.min(x, e.offsetX) + xRadius;
    const centerY = Math.min(y, e.offsetY) + yRadius;
    ctx2.beginPath();
    ctx2.ellipse(centerX, centerY, xRadius, yRadius, 0, 0, Math.PI * 2);
    ctx2.stroke();
  };

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
