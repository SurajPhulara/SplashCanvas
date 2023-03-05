// Import required modules and packages
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import { Server } from "socket.io";
import http from "http"
import canvasData from "./canvasData_schema.js";
import dotenv from 'dotenv';
dotenv.config();

// app config ie Create an instance of the Express application
const app = express();
const server = http.createServer(app);


// Set up Socket.io
const io = new Server(server, {
    cors: {
        origin: '*'
    }
});


const socketToCanvas = new Map();

io.on('connect', (socket) => {
    console.log("connected socket io id=", socket.id);

    socket.on('join_canvas', (canvasId) => {
        console.log("joined canvas", canvasId);
        socketToCanvas.set(socket.id, canvasId);
        socket.join(canvasId);
    });

    socket.on('canvas_leave', () => {
        console.log("left canvas");
        const canvasId = socketToCanvas.get(socket.id);
        socketToCanvas.delete(socket.id);
        socket.leave(canvasId);
    });

    socket.on('canvas_edit', (canvas_data) => {
        console.log("edit1");
        const canvasId = socketToCanvas.get(socket.id);
        UpdateCanvasData(canvas_data, canvasId)
        socket.to(canvasId).emit('canvas_edit', canvas_data);
    });

    socket.on('canvas_edit_undo', (canvas_data) => {
        console.log("edit2");
        const canvasId = socketToCanvas.get(socket.id);
        UpdateCanvasData(canvas_data, canvasId)
        socket.to(canvasId).emit('canvas_edit_undo', canvas_data);
    });

    socket.on('canvas_edit_redo', (canvas_data) => {
        console.log("edit3");
        const canvasId = socketToCanvas.get(socket.id);
        UpdateCanvasData(canvas_data, canvasId)
        socket.to(canvasId).emit('canvas_edit_redo', canvas_data);
    });

    socket.on('canvas_height_change', (canvas_height) => {
        console.log("edit4");
        const canvasId = socketToCanvas.get(socket.id);
        UpdateCanvasHeight(canvas_height, canvasId)
        socket.to(canvasId).emit('canvas_height_change', canvas_height);
    });
});

// Function to save or update canvas data 
const UpdateCanvasData = (canvas_image, canvasId) => {
    canvasData.findOneAndUpdate({ canvas_id: `${canvasId}` }, {canvas_image: `${canvas_image}`}, { upsert: true })
        .then(() => {
            console.log("Canvas data saved/updated to MongoDB Atlas");
        })
        .catch(err => {
            // console.error(err);
            console.error("error occured saving");
            
        });
};

// Function to save or update canvas height in MongoDB Atlas
const UpdateCanvasHeight = (canvas_height, canvasId) => {
    canvasData.findOneAndUpdate({ canvas_id: `${canvasId}`}, {canvas_height: `${canvas_height}`}, { upsert: true })
        .then(() => {
            console.log("Canvas height saved/updated to MongoDB Atlas");
        })
        .catch(err => {
            // console.error(err);
            console.error("error occured saving");
        });
};


// middleware
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
})




// DB config ie Set up connection to MongoDB database using Mongoose
mongoose.set('strictQuery', true)
mongoose.connect(process.env.Database)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((err) => console.error(err));


// routes

app.get("/get_all_canvas", (req, res) => {
    res.send("welcome to backend2")
    canvasData.find({})
        .sort({updatedAt: -1})
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Internal server error");
        });
})

app.get("/get_canvas/:canvasId", (req, res) => {
    console.log("here route received request")
    const { canvasId } = req.params;
    canvasData.findOne({ canvas_id: canvasId })
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send("Canvas not found");
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Internal server error");
        });
});


// Set up a listener for incoming requests
const PORT = process.env.PORT || 9000
server.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
})
