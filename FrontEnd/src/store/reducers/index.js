import { combineReducers } from "redux";
import user from "./user";
import { persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";

const persistConfig = {
  key: "uInfo",
  storage: storageSession,
};
const reducer = combineReducers({
  user,
});

// export default reducer;
export default persistReducer(persistConfig, reducer);
