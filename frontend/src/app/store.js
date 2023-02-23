import { configureStore } from "@reduxjs/toolkit";
import canvasSlice from "./canvasSlice";
import toolReducer from "./toolSlice";

export const store = configureStore({
  reducer: {
    tool: toolReducer,
    canvas: canvasSlice
  },
});
