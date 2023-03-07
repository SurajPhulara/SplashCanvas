import { createSlice } from '@reduxjs/toolkit'
import socket from '../socket/socket';

const initialState = {
    past: [],
    future: [],
}

const canvasSlice = createSlice({
    name: 'canvas',
    initialState,
    reducers: {
        save: (state, action)=>{
            console.log("save received with past length = "+state.past.length)
            if(state.past.length>=1)
            {
                if(action.payload.canvasData === state.past[state.past.length-1])
                return
            }
            // console.log("see this :  ", action.payload.uuid)
            state.past.push(action.payload);
            state.future = [];
            socket.emit('canvas_edit',(state.past[state.past.length-1]))
        },
        undo: (state, action) => {
            if(state.past.length > 1)
            {
                const temp = state.past.pop();
                state.future.unshift(temp);
                socket.emit('canvas_edit_undo',(state.past[state.past.length-1]))
            }
        },
        redo: (state, action) => {
            if(state.future.length >= 1)
            {
                const temp = state.future.shift();
                state.past.push(temp);
                socket.emit('canvas_edit_redo',(state.past[state.past.length-1]))
            }
        },
        save2: (state, action)=>{
            console.log("save2 received with past length = "+state.past.length)
            if(state.past.length>=1)
            {
                if(action.payload.canvasData === state.past[state.past.length-1])
                return
            }
            state.past.push(action.payload);
            state.future = [];
            console.log("save2 end received with past length = "+state.past.length)
        },
        undo2: (state, action) => {
        //     state.past.push(action.payload);
            // state.past.pop();
            console.log("undo2 received with past length = "+state.past.length)
            if(state.past.length > 1)
            {
                const temp = state.past.pop();
                state.future.unshift(temp);
            }
            else
            {
                // const temp = state.past.pop();
                // console.log("undo2 mid received with past length = "+state.past.length)
                state.future.unshift(state.past[state.past.length-1]);
                state.past=[action.payload]
                console.log("undo2 end received with past length = "+state.past.length)
                // console.log("see this :  ", action.payload.uuid)
                // state.past.push(action.payload.canvasData);
                // state.future = [];
                // socket.emit('canvas_edit',(state.past[state.past.length-1]))
            }
        },
        redo2: (state, action) => {
            if(state.future.length >= 1)
            {
                const temp = state.future.shift();
                state.past.push(temp);
            }
            else
            {
                state.past.push(action.payload);
            }
        },
        clear: (state) => {
            state.past=[]
        }
    }
})

export const { save, undo, redo, save2, undo2, redo2, clear } = canvasSlice.actions
export default canvasSlice.reducer