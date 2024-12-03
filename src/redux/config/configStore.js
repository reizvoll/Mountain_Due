import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "../slices/userSlice";
import { combineReducers } from "redux";

// Redux Persist 설정
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"], // user slice만 persist
};

// Root Reducer 설정
const rootReducer = combineReducers({
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Store 설정
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Persistor 설정
export const persistor = persistStore(store);
