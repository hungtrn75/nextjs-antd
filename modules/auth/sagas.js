import {
  REGISTER_USER,
  SET_CURRENT_USER,
  LOGIN_USER,
  LOGOUT_USER,
  CLEAR_CURRENT_PROFILE
} from "./types";
import { GET_ERRORS } from "../errors/types";
import { take, takeLatest, put, call } from "redux-saga/effects";
import jwt_decode from "jwt-decode";
import { ADD_ALERT } from "../alert/types";
import { setCookie, setAuthToken, removeCookie } from "../../utils/auth";
import { Auth } from "../../constants/ApiRequests.js";
import API from "../../utils/apiV2";

function* loginUserWorker(action) {
  try {
    const res = yield call(API.post, `${Auth.LOGIN}`, action.payload);
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
    //Set isAuthenticated to false and remove user
    yield put({ type: SET_CURRENT_USER, payload: {} });
    //Remove token from cookie
    removeCookie("jwtToken");
    //Remove auth header for future requests
    setAuthToken(false);
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

function* registerUserWorker(action) {
  try {
    yield call(API.post, `${Auth.REGISTER}`, action.payload.userData);
    yield call(action.payload.history.push, "/login");
    // yield put({
    //   type: ADD_ALERT,
    //   payload: { text: "Register successfull", status: "success" }
    // });
  } catch (error) {
    console.log(error);
    yield put({ type: GET_ERRORS, payload: error.response.data });
    // yield put({
    //   type: ADD_ALERT,
    //   payload: { text: "Register failed", status: "error" }
    // });
  }
}

export function* watchRegisterUser() {
  yield takeLatest(REGISTER_USER, registerUserWorker);
}
