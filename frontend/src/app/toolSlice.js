import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    tool: "triangle"
}

const toolSlice = createSlice({
    name: 'tool',
    initialState,
    reducers: {
        tool_change: (state, action)=>{
            console.log("changing tool to this-> ",action.payload)
            state.tool = action.payload
        }
    }
})

export const { tool_change } = toolSlice.actions
export default toolSlice.reducer