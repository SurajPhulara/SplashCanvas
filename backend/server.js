// Import required modules and packages
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import { Server } from "socket.io";
import http from "http"


// app config ie Create an instance of the Express application
const app = express();
const server = http.createServer(app);


// Set up Socket.io
const io = new Server(server,{
    cors: {
      origin: '*'
    }
  });

io.on('connect', (socket)=>{
    console.log("connected socket io id=",socket.id)
    socket.on('canvas_edit', (canvasData)=>{
        socket.broadcast.emit('canvas_edit', (canvasData));
    })
    socket.on('canvas_edit_undo', (canvasData)=>{
        socket.broadcast.emit('canvas_edit_undo', (canvasData));
    })
    socket.on('canvas_edit_redo', (canvasData)=>{
        socket.broadcast.emit('canvas_edit_redo', (canvasData));
    })
    socket.on('canvas_height_change', (canvasData)=>{
        socket.broadcast.emit('canvas_height_change', (canvasData));
    })
})


// middleware
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
})




// DB config ie Set up connection to MongoDB database using Mongoose




// routes
app.get("/", (req, res) => {
    res.send("welcome to backend")
})

// Set up a listener for incoming requests
const PORT = process.env.PORT || 9000
server.listen(PORT, ()=>{
    console.log(`Server is up and running on port ${PORT}`);
})
