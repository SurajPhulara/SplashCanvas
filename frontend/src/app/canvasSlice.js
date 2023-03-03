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
            if(state.past.length>=1)
            {
                if(action.payload.canvasData == state.past[state.past.length-1])
                return
            }
            console.log("see this :  ", action.payload.uuid)
            state.past.push(action.payload.canvasData);
            state.future = [];
            socket.emit('canvas_edit',(state.past[state.past.length-1]))
        },
        undo: (state, action) => {
            if(state.past.length >= 1)
            {
                const temp = state.past.pop();
                state.future.unshift(temp);
                socket.emit('canvas_edit_undo',(state.past[state.past.length-1], action.payload.uuid))
            }
        },
        redo: (state, action) => {
            if(state.future.length >= 1)
            {
                const temp = state.future.shift();
                state.past.push(temp);
                socket.emit('canvas_edit_redo',(state.past[state.past.length-1], action.payload.uuid))
            }
        },
        save2: (state, action)=>{
            if(state.past.length>=1)
            {
                if(action.payload.canvasData == state.past[state.past.length-1])
                return
            }
            state.past.push(action.payload);
            state.future = [];
        },
        undo2: (state) => {
            const temp = state.past.pop();
            state.future.unshift(temp);
        },
        redo2: (state) => {
            if(state.future.length >= 1)
            {
                const temp = state.future.shift();
                state.past.push(temp);
            }
        }
    }
})

export const { save, undo, redo, save2, undo2, redo2 } = canvasSlice.actions
export default canvasSlice.reducer