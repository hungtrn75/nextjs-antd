import cookie from "js-cookie";
import axios from "axios";

export const setCookie = (key, value) => {
  if (process.browser) {
    cookie.set(key, value, {
      expires: 1,
      path: "/"
    });
  }
};

export const removeCookie = key => {
  if (process.browser) {
    cookie.remove(key, {
      expires: 1
    });
  }
};

export const getCookieFromBrowser = key => {
  return cookie.get(key);
};

export const getCookieFromServer = (key, req) => {
  const { headers } = req;

  if (!headers.cookie) {
    return {};
  }
  try {
    const cookie = headers.cookie
      .split(";")
      .find(c => c.trim().startsWith(`${key}=`));
    if (!cookie) {
      return {};
    }
    const json = cookie.split("=")[1];
    return json;
  } catch (parseError) {
    console.error(parseError, headers);
    return {};
  }
};

export const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};
