// import necessary modules
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Boards.css';
import { Link } from 'react-router-dom';
import host from '../../host/host'; // import the host URL from a separate file
import Loading from '../Loading/Loading'; // import the loading component

const Boards = () => {
  // create a state variable for canvas data
  const [canvasData, setCanvasData] = useState([]);
  // create a state variable to track whether the API request is still loading
  const [isLoading, setIsLoading] = useState(true);
  
  // run the useEffect hook only once when the component mounts
  useEffect(() => {
    // make an API request to get all the canvas data
    axios.get(`${host}/get_all_canvas`)
      .then((response) => {
        // set the canvas data state with the data from the API response
        setCanvasData(response.data);
      })
      .catch((error) => {
        // log an error if there is a problem with the API request
        console.error(error);
      })
      .finally(() => {
        // set the isLoading state to false once the API request is complete
        setIsLoading(false);
      });
  }, []);

  // if the API request is still loading
  if (isLoading) {
    // display a loading component
    return <Loading></Loading>;
  }

  return (
    <div className="boards-container">
      {canvasData.map((canvas) => ( // for each canvas object in the canvasData array
        // create a link to the canvas with its ID
        <Link key={canvas._id} to={`/workspace/${canvas.canvas_id}`} className="canvas-link">
          <div className="canvas-card">
            // display the canvas title
            <h3 className="canvas-title">{canvas.title}</h3>
            <div className="canvas-image-container">
              // display an image of the canvas
              <img src={canvas.canvas_image} alt="canvas" className="canvas-image" />
            </div>
            // display the last updated time for the canvas
            <p className="canvas-updated">Last updated: {new Date(canvas.updatedAt).toLocaleString('en-IN')}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

// export the component as the default export
export default Boards;