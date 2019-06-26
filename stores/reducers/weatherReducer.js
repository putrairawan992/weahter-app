import * as actionTypes from "../actionTypes";

const initialState = {
  loading: false,
  loaded: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.WEATHER_GET:
      return {
        ...state,
        loading: true
      };
    case actionTypes.WEATHER_GET_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.payload.data
      };
    default:
      return state;
  }
};