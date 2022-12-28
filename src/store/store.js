import { configureStore } from "@reduxjs/toolkit";
import pictureReducer from "./pictureSlice";

export const store = configureStore({
  reducer: { picture: pictureReducer },
});
