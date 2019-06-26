import axios from "axios"
import { setErrorMessage } from "../stores/actions"
import { getCookie } from '../utils/cookies'

import getConfig from "next/config"
const { publicRuntimeConfig } = getConfig()
const { NEXT_WEATHER_API_URL } = publicRuntimeConfig


export const apiUrl = NEXT_WEATHER_API_URL;

export const apiCall = ({ method, url, data = "" }) => async dispatch => {
  try {
    const response = await axios({
      method: method,
      url: url,
      data: data.data || "",
      headers: data.headers || "",
      params: data.params || "",
      timeout: data.timeout || 0,
      ignoreError: data.ignoreError || false,
      validateStatus: ( status ) => {
        return status <= 500; // to get all response
      }
    });
    return response
  } catch (error) {
    if (error.response) {
      const { resultData } = error.response;
      if(!data.ignoreError){
        dispatch(
          setErrorMessage(
            "Maaf sedang terjadi masalah dengan server kami. Mohon tunggu beberapa menit lagi 🙏"
          )
        );
      }
      return resultData;
    } else {
      if (!data.ignoreError) {
        dispatch(
          setErrorMessage(
            "Maaf sedang terjadi masalah dengan server kami. Mohon tunggu beberapa menit lagi 🙏"
          )
        );
      }
      return error;
    }
    return error;
  }
};
