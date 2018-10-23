import {
  REGISTER_USER,
  SET_CURRENT_USER,
  LOGIN_USER,
  LOGOUT_USER,
  CLEAR_CURRENT_PROFILE
} from "./types";
import { GET_ERRORS } from "../errors/types";
import { takeLatest, put, call } from "redux-saga/effects";
import jwt_decode from "jwt-decode";
import { ADD_ALERT } from "../alert/types";
import { setCookie, setAuthToken, removeCookie } from "../../utils/auth";
import { Auth } from "../../constants/ApiRequests.js";
import API from "../../utils/apiV2";
import { showProgressBar, hideProgressBar } from "../progress-bar/reducers";

function* loginUserWorker(action) {
  try {
    yield put(hideProgressBar());
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
  } finally {
    yield put(showProgressBar());
  }
}

export function* watchLoginUser() {
  yield takeLatest(LOGIN_USER, loginUserWorker);
}

function* logoutUserWorker() {
  try {
    yield put(hideProgressBar());
    //Set isAuthenticated to false and remove user
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
  } finally {
    yield put({ type: SET_CURRENT_USER, payload: {} });
    yield put(showProgressBar());
  }
}

export function* watchLogoutUser() {
  yield takeLatest(LOGOUT_USER, logoutUserWorker);
}

function* registerUserWorker(action) {
  try {
    yield put(hideProgressBar());
    yield call(API.post, `${Auth.REGISTER}`, action.payload.userData);
    yield call(action.payload.history.push, "/login");
    // yield put({
    //   type: ADD_ALERT,
    //   payload: { text: "Register successfull", status: "success" }
    // });
  } catch (error) {
    console.log(error);
    yield put({ type: GET_ERRORS, payload: error.response.data });
  } finally {
    yield put(showProgressBar());
  }
}

export function* watchRegisterUser() {
  yield takeLatest(REGISTER_USER, registerUserWorker);
}
