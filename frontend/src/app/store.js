import { configureStore } from "@reduxjs/toolkit";
import toolReducer from "./toolSlice";

export const store = configureStore({
  reducer: {
    tool: toolReducer,
  },
});
