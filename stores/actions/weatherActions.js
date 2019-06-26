import { apiCall, apiUrl } from "../../services/request";
import { get } from 'lodash'
import getConfig from "next/config"
import {
  WEATHER_GET,
  WEATHER_GET_ERROR,
  WEATHER_GET_SUCCESS
} from "../actionTypes";

const { publicRuntimeConfig } = getConfig()
const { NEXT_WEATHER_OPENWEATHER_API_KEY } = publicRuntimeConfig


export const getWeatherByLatLng = (lat, lon, lang = 'en') => async dispatch => {
  const dataReq = {
    method: "GET",
    url: apiUrl + `/2.5/weather`,
    data: {
      params: {
        lat,
        lon,
        appid: NEXT_WEATHER_OPENWEATHER_API_KEY,
        lang: lang
      }
    }
  };
  dispatch({ type: WEATHER_GET });
  const res = await dispatch(apiCall(dataReq));
  if ( get(res, 'status') == 200 ) {
    dispatch({
      type: WEATHER_GET_SUCCESS,
      payload: {
        data: get(res, 'data')
      }
    });
    return res;
  }else{
    dispatch({ type: WEATHER_GET_ERROR });
  }
  return res;
}
