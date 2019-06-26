import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
// import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import ReduxThunk from "redux-thunk";
import reducer from "./reducers";

export const initStore = (initialState = {}, options) => {
  const middleware = composeWithDevTools(applyMiddleware(ReduxThunk));
  return createStore(reducer, initialState, middleware);
};
