import Cookies from "js-cookie";
import uCookies from 'universal-cookie';

export const setCookie = (key, value, expires) => {
  if (process.browser) {
    Cookies.set(key, value, {
      expires: expires || 7
    });
  }
};

export const removeCookie = key => {
  if (process.browser) {
    Cookies.remove(key);
  }
};

export const getCookie = (key, req = null) => {
  return !process.browser && req
    ? getCookieFromServer(key, req)
    : getCookieFromBrowser(key);
};

export const getCookieFromBrowser = key => {
  return Cookies.getJSON(key);
};

export const getCookieFromServer = (key, req) => {
  if (req) {
    const cookies = new uCookies(req.headers.cookie);
    return cookies.get(key)
  }
  return null;
};