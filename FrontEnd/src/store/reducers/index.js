import { combineReducers } from "redux";
import user from "./user";
import room from "./room";
import { persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";

const persistConfig = {
  key: "uInfo",
  storage: storageSession,
};
const reducer = combineReducers({
  user,
  room,
});

// export default reducer;
export default persistReducer(persistConfig, reducer);
