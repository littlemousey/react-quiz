import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducer";

// Logger with default options
import logger from "redux-logger";

export default function configureStore(initialState) {
  const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(logger, thunk))
  );
  return store;
}
