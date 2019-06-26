import {
  ALERT_ERROR,
  ALERT_SUCCESS,
  ALERT_WARNING,
  ALERT_REMOVE
} from "../actionTypes";

export const setSuccessMessage = (message, timeout = null, position) => dispatch => {
  return dispatch({
    type: ALERT_SUCCESS,
    payload: {
      message,
      position,
      timeout,
    }
  });
};

export const setErrorMessage = (message, timeout = null, position) => dispatch => {
  return dispatch({
    type: ALERT_ERROR,
    payload: {
      message,
      position,
      timeout,
    }
  });
};

export const setWarningMessage = (message, timeout = null, position) => dispatch => {
  return dispatch({
    type: ALERT_WARNING,
    payload: {
      message,
      position,
      timeout,
    }
  });
};

export const removeAlert = () => dispatch => {
  return dispatch({
    type: ALERT_REMOVE
  });
};
