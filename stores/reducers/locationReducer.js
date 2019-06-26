import * as actionTypes from "../actionTypes";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOCATION_SET:
      return {
        ...state,
        data: action.payload.data
      };
    case actionTypes.LOCATION_BY_IP:
      return {
        ...state,
        data: action.payload.data
      };
    case actionTypes.LOCATION_GEOCODE:
      return {
        ...state,
        geocode: action.payload.data
      };
    default:
      return state;
  }
};