import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import thunk from "redux-thunk";
import reducer from "./reducers";

const enhancer = composeWithDevTools(applyMiddleware(thunk));
const store = createStore(reducer, enhancer);

export default store;
