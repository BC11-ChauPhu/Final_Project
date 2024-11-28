import { configureStore } from "@reduxjs/toolkit";
import registerMapReducer from "../features/getLocationForMap/registerMapSlice";
import { persistStore, persistReducer } from "redux-persist";
import sessionStorage from "redux-persist/es/storage/session";
import dateSelectReducer from "../features/dateSelection/dateSelectSlice";

const persistConfig = {
  key: "root",
  storage: sessionStorage,
};

const persistedReducer = persistReducer(persistConfig, registerMapReducer);

export const store = configureStore({
  reducer: {
    registerMap: persistedReducer,
    dateSelection: dateSelectReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
