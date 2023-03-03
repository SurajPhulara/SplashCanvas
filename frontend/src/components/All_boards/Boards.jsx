import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Boards.css';
import { Link } from 'react-router-dom';
import host from '../../host/host';
import Loading from '../Loading/Loading';

const Boards = () => {
  const [canvasData, setCanvasData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    axios.get(`${host}/get_all_canvas`)
      .then((response) => {
        setCanvasData(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Loading></Loading>
  }

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
