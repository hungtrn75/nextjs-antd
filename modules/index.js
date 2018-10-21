import { combineReducers } from "redux";
import { fork, all } from "redux-saga/effects";
import auth from "./auth/reducers";
import errors from "./errors/reducers";
import zips from "./zips/reducers";
import * as authSagas from "./auth/sagas";
import { watchRegisterUser } from "./auth/sagas";
import * as zipSagas from "./zips/sagas";

export const rootReducer = combineReducers({
  auth,
  zips,
  errors
});

export function* rootSaga() {
  yield all(
    [...Object.values(authSagas), ...Object.values(zipSagas)].map(fork)
  );
}
