import { GET_ZIPS, GET_ZIPS_FAILED, GET_ZIPS_SUCCESS } from "./types";
import { takeLatest, put, call } from "redux-saga/effects";
import { Api } from "../../utils/Api";

function* getZipsWorker(action) {
  try {
    const res = yield call(Api.fetchZips, action.payload);
    yield put({ type: GET_ZIPS_SUCCESS, payload: res.data });
  } catch (error) {
    yield put({ type: GET_ZIPS_FAILED, payload: error });
  }
}

export function* watchGetZips() {
  yield takeLatest(GET_ZIPS, getZipsWorker);
}
