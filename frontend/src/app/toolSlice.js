import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    tool: 'pencil',
    color: '#000000',
    colorMap: {}
};

const toolSlice = createSlice({
name: 'tool',
initialState,
reducers: {
    tool_change: (state, action) => {
    console.log('changing tool to this-> ', action.payload);
    state.tool = action.payload;

    // If the tool has been changed before, restore its last used color
    if (state.colorMap[state.tool]) {
        state.color = state.colorMap[state.tool];
    }
    },
    color_change: (state, action) => {
    console.log('changing color to this-> ', action.payload);
    state.color = action.payload;

    // Update the color map with the last used color for the current tool
    state.colorMap[state.tool] = state.color;
    },
},
});


export const { tool_change, color_change } = toolSlice.actions
export default toolSlice.reducer