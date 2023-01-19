import { configureStore } from "@reduxjs/toolkit";
import api from "./middleware/api";
import pictureReducer from "./pictureSlice";
import recreateReducer from "./recreateSilce";
import searchReducer from "./searchSlice";

export const store = configureStore({
  reducer: {
    picture: pictureReducer,
    recreate: recreateReducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) => {
    var default_middleware = getDefaultMiddleware();
    default_middleware.push(api);
    return default_middleware;
  },
});
