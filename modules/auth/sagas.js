import {
  REGISTER_USER,
  SET_CURRENT_USER,
  LOGIN_USER,
  LOGOUT_USER,
  CLEAR_CURRENT_PROFILE
} from "./types";
import { GET_ERRORS } from "../errors/types";
import { takeLatest, put, call, take } from "redux-saga/effects";
import { Api } from "../../utils/Api";
import jwt_decode from "jwt-decode";
import { ADD_ALERT } from "../alert/types";
import { setCookie, setAuthToken, removeCookie } from "../../utils/auth";

function* registerUserWorker(action) {
  try {
    yield call(Api.registerUserApi, action.payload.userData);
    yield call(action.payload.history.push, "/login");
    yield put({
      type: ADD_ALERT,
      payload: { text: "Register successfull", status: "success" }
    });
  } catch (error) {
    yield put({ type: GET_ERRORS, payload: error.response.data });
    yield put({
      type: ADD_ALERT,
      payload: { text: "Register failed", status: "error" }
    });
  }
}

export function* watchRegisterUser() {
  yield takeLatest(REGISTER_USER, registerUserWorker);
}

function* loginUserWorker(action) {
  try {
    const res = yield call(Api.loginUserApi, action.payload);
    const { token } = res.data;
    //Save to cookie
    setCookie("jwtToken", token);
    //Set user token
    setAuthToken(token);
    //Decode user token
    const decoded = jwt_decode(token);
    yield put({ type: SET_CURRENT_USER, payload: decoded });
    // yield put({
    //   type: ADD_ALERT,
    //   payload: { text: "Login successfull", status: "success" }
    // });
  } catch (error) {
    yield put({ type: GET_ERRORS, payload: error.response.data });
    yield put({
      type: ADD_ALERT,
      payload: { text: "Login failed", status: "error" }
    });
  }
}

export function* watchLoginUser() {
  yield takeLatest(LOGIN_USER, loginUserWorker);
}

function* logoutUserWorker() {
  try {
    //Remove token from cookie
    removeCookie("jwtToken");
    //Remove auth header for future requests
    setAuthToken(false);
    //Set isAuthenticated to false and remove user
    yield put({ type: SET_CURRENT_USER, payload: {} });
    // yield put({ type: CLEAR_CURRENT_PROFILE });
    // yield put({
    //   type: ADD_ALERT,
    //   payload: { text: "Logout successfull", status: "success" }
    // });
  } catch (error) {
    yield put({ type: GET_ERRORS, payload: error.response.data });
    // yield put({
    //   type: ADD_ALERT,
    //   payload: { text: "Login failed", status: "error" }
    // });
  }
}

export function* watchLogoutUser() {
  yield takeLatest(LOGOUT_USER, logoutUserWorker);
}
