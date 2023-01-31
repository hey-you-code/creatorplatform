import { configureStore } from "@reduxjs/toolkit";
import api from "./middleware/api";
import pictureReducer from "./pictureSlice";
import recreateReducer from "./recreateSilce";
import searchReducer from "./searchSlice";
import recreateLookReducer from "./recreateLookSlice";

export const store = configureStore({
  reducer: {
    picture: pictureReducer,
    recreate: recreateReducer,
    search: searchReducer,
    recreateLook: recreateLookReducer,
  },
  middleware: (getDefaultMiddleware) => {
    var default_middleware = getDefaultMiddleware();
    default_middleware.push(api);
    return default_middleware;
  },
});
