import { combineReducers } from "redux";
import { fork, all } from "redux-saga/effects";
import auth from "./auth/reducers";
import errors from "./errors/reducers";
import * as authSagas from "./auth/sagas";

export const rootReducer = combineReducers({
  auth,
  errors
});

export function* rootSaga() {
  yield all([...Object.values(authSagas)].map(fork));
}
