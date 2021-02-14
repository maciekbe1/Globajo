import { applyMiddleware, createStore } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "store/reducers/rootReducer";
import logger from "redux-logger";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
  blacklist: []
};

let middleware = [];
if (process.env.NODE_ENV === "development") {
  middleware = [...middleware, thunk, logger];
} else {
  middleware = [...middleware, thunk];
}
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, applyMiddleware(...middleware));

export default store;
