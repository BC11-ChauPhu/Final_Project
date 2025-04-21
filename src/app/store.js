import { configureStore } from "@reduxjs/toolkit";
import registerMapReducer from "../features/getLocationForMap/registerMapSlice";
import { persistStore, persistReducer } from "redux-persist";
import guestSelectReducer from "../features/guestSelection/guestSelectionSlice";
import sessionStorage from "redux-persist/es/storage/session";
import dateSelectReducer from "../features/dateSelection/dateSelectSlice";
import smallHeaderActiveReducer from "../features/smallHeaderAcitve/smallHeaderActiveSlice";
import averageRatingReducer from "../features/averageRating/averageRatingSlice";

const persistConfig = {
	key: "root",
	storage: sessionStorage,
};

const persistedReducer = persistReducer(persistConfig, registerMapReducer);

export const store = configureStore({
	reducer: {
		registerMap: persistedReducer,
		dateSelection: dateSelectReducer,
		guestSelection: guestSelectReducer,
		smallHeaderAcitve: smallHeaderActiveReducer,
		averageRating: averageRatingReducer,
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
