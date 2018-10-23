import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { loadingBarMiddleware } from "react-redux-loading-bar";
import { rootReducer, rootSaga } from "./modules";
import {
  getCookieFromBrowser,
  getCookieFromServer,
  removeCookie
} from "./utils/auth";
import jwt_decode from "jwt-decode";
import { setAuthToken } from "./utils/auth";

const sagaMiddleware = createSagaMiddleware();

const bindMiddleware = middleware => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

function configureStore(
  initialState = { auth: { user: {}, isAuthenticated: false } },
  { req, isServer }
) {
  if (initialState && initialState.auth) {
    try {
      const auth = isServer
        ? getCookieFromServer("jwtToken", req)
        : getCookieFromBrowser("jwtToken");
      if (auth) {
        try {
          //Set auth token
          setAuthToken(auth);
          //Decode user token
          const decoded = jwt_decode(auth);
          const currentTime = Date.now() / 1000;
          if (decoded.exp < currentTime) {
            //logout user
            removeCookie("jwtToken");
            //redirect to login
            window.location.href = "/login";
          }
          initialState.auth.user = jwt_decode(auth);
          initialState.auth.isAuthenticated = true;
        } catch (error) {}
      }
    } catch (err) {}
  }
  const store = createStore(
    rootReducer,
    initialState,
    bindMiddleware([sagaMiddleware])
  );

  store.runSagaTask = () => {
    store.sagaTask = sagaMiddleware.run(rootSaga);
  };

  store.runSagaTask();
  return store;
}

export default configureStore;
