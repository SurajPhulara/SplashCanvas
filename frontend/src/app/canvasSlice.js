import { createSlice } from '@reduxjs/toolkit'

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
            // console.log("hellllllllllllllllllllll   pppppppppppp   :   ", action.payload)
        },
        undo: (state) => {
            if(state.past.length >= 1)
            {
                const temp = state.past.pop();
                state.future.unshift(temp);
                console.log("called here also")
            }
        },
        redo: (state) => {
            if(state.future.length >= 1)
            {
                const temp = state.future.shift();
                state.past.push(temp);
            }
        },
    }
})

export const { save, undo, redo } = canvasSlice.actions
export default canvasSlice.reducer