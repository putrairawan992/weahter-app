import * as actionTypes from "../actionTypes";

const initialState = {
  loading: false,
  loaded: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.MYIP_GET:
      return {
        ...state,
        loading: true
      };
    case actionTypes.MYIP_GET_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        ip: action.payload.ip
      };
    default:
      return state;
  }
};