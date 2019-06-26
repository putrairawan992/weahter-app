import { apiCall } from "../../services/request";
import { get } from 'lodash'
import getConfig from "next/config"
import {
  LOCATION_BY_IP,
  LOCATION_SET,
  LOCATION_GEOCODE,
} from "../actionTypes";
import { setCookie } from '../../utils/cookies'


const { publicRuntimeConfig } = getConfig()
const { NEXT_WEATHER_IPSTACK_API_KEY } = publicRuntimeConfig

export const setLocation = (latitude, longitude, provider = null) => dispatch => {
  dispatch({
    type: LOCATION_SET,
    payload: {
      data: {
        latitude,
        longitude,
        provider
      }
    }
  });
}

export const saveLocation = (latitude, longitude, provider = null) => dispatch => {
  setCookie('__nw', { latitude, longitude, provider} );
}

export const setLocationByIpAddress = (ipAddress) => async dispatch => {
  const dataReq = {
    method: "GET",
    url: `http://api.ipstack.com/${ipAddress}`,
    data: {
      params: {
        access_key: NEXT_WEATHER_IPSTACK_API_KEY
      }
    }
  };
  const res = await dispatch(apiCall(dataReq));
  if ( get(res, 'status') == 200 ) {
    dispatch({
      type: LOCATION_BY_IP,
      payload: {
        data: get(res, 'data')
      }
    });
    return res;
  }
  return res;
}