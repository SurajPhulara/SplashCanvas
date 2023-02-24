import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    grid: false
}

const gridSlice = createSlice({
    name: 'grid',
    initialState,
    reducers: {
        toggle_grid: (state)=>{
            console.log("changing grid to this-> ",!state.grid)
            state.grid= !state.grid
        }
    }
})

export const { toggle_grid } = gridSlice.actions
export default gridSlice.reducer