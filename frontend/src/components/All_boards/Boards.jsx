import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Boards.css';
import { Link } from 'react-router-dom';
import host from '../../host/host';

const Boards = () => {
  const [canvasData, setCanvasData] = useState([]);

  useEffect(() => {
    axios.get(`${host}/get_all_canvas`)
      .then((response) => {
        setCanvasData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="boards-container">
      {canvasData.map((canvas) => (
        <Link key={canvas._id} to={`/workspace/${canvas.canvas_id}`} className="canvas-link">
          <div className="canvas-card">
            <h3 className="canvas-title">{canvas.title}</h3>
            <div className="canvas-image-container">
              <img src={canvas.canvas_image} alt="canvas" className="canvas-image" />
            </div>
            <p className="canvas-updated">Last updated: {new Date(canvas.updatedAt).toLocaleString('en-IN')}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Boards;
