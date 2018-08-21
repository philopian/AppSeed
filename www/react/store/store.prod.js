import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
// import { hydrateState, gatorade } from "redux-session-storage-gatorade";

import reducer from "../reducers";

const store = createStore(
  reducer,
  // hydrateState(),
  // applyMiddleware(thunk, gatorade)
  applyMiddleware(thunk)
);
export default store;
