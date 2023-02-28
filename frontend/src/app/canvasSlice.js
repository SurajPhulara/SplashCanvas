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
                if(action.payload == state.past[state.past.length-1])
                return
            }
            state.past.push(action.payload);
            state.future = [];
            socket.emit('canvas_edit',(state.past[state.past.length-1]))
        },
        undo: (state) => {
            if(state.past.length >= 1)
            {
                const temp = state.past.pop();
                state.future.unshift(temp);
                socket.emit('canvas_edit_undo',(state.past[state.past.length-1]))
            }
        },
        redo: (state) => {
            if(state.future.length >= 1)
            {
                const temp = state.future.shift();
                state.past.push(temp);
                socket.emit('canvas_edit_redo',(state.past[state.past.length-1]))
            }
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

export const { save, undo, redo, undo2, redo2 } = canvasSlice.actions
export default canvasSlice.reducer