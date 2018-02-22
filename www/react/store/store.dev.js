import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import { hydrateState, gatorade } from "redux-session-storage-gatorade";

import reducer from "../reducers";

const logger = createLogger({
  collapsed: true
});

const store = createStore(
  reducer,
  hydrateState(),
  composeWithDevTools(applyMiddleware(thunk, logger, gatorade))
);
export default store;
