import mongoose from "mongoose";

const canvas_schema = new mongoose.Schema({
    canvas_id : {type: String, required: true},
    canvas_image : {type: String, required: true},
    canvas_height : {type: String, required: true}
}, { timestamps: true})

const canvasData = mongoose.model('canvasData', canvas_schema)
export default canvasData 