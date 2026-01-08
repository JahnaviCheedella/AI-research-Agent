import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { researchReducer } from "./slices/researchSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["research"],
};

const rootReducer = combineReducers({
  research: researchReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

let persistor = persistStore(store);

export { store, persistor };
