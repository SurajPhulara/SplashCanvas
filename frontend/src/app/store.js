import { configureStore } from "@reduxjs/toolkit";
import canvasSlice from "./canvasSlice";
import gridSlice from "./gridSlice";
import screenSlice from "./screenSlice";
import toolReducer from "./toolSlice";

export const store = configureStore({
  reducer: {
    tool: toolReducer,
    canvas: canvasSlice,
    grid: gridSlice,
    screen: screenSlice,
  },
});
