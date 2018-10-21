import { GET_ZIPS, GET_ZIPS_FAILED, GET_ZIPS_SUCCESS } from "./types";
import { takeLatest, put, call } from "redux-saga/effects";
import { Zip } from "../../constants/ApiRequests.js";
import API from "../../utils/apiV2";

function* getZipsWorker(action) {
  try {
    // const res = yield call(Api.fetchZips, action.payload);
    const { page, limit } = action.payload;
    const res = yield call(
      API.get,
      `${Zip.URL_RESTFUL}?page=${page}&limit=${limit}`
    );
    yield put({ type: GET_ZIPS_SUCCESS, payload: res.data });
  } catch (error) {
    yield put({ type: GET_ZIPS_FAILED, payload: error });
  }
}

export function* watchGetZips() {
  yield takeLatest(GET_ZIPS, getZipsWorker);
}
