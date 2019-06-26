import { reducer as reduxFormReducer } from "redux-form";
import { combineReducers } from "redux";


import alertReducer from "./alertReducer";
import locationReducer from "./locationReducer";
import myipReducer from "./myipReducer";
import weatherReducer from "./weatherReducer";

const reducers = combineReducers({
  alert: alertReducer,
  form: reduxFormReducer,
  location: locationReducer,
  myip: myipReducer,
  weather: weatherReducer
});

export default reducers;