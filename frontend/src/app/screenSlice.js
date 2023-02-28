import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    fullscreen: false
}

const screenSlice = createSlice({
    name: 'screen',
    initialState,
    reducers: {
        toggle_fullscreen: (state)=>{
            console.log("changing grid to this-> ",!state.fullscreen)
            state.fullscreen= !state.fullscreen
        }
    }
})

export const { toggle_fullscreen } = screenSlice.actions
export default screenSlice.reducer