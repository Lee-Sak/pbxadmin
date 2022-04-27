import { responsiveArray } from "antd/lib/_util/responsiveObserve";
import { all, call, fork, put, select, throttle } from "redux-saga/effects";
import { GET_CDR_REQ, GET_CDR_SUC, SET_CDR } from "../reducers/cdr";
import { getRefreshedAccessToken } from "./user";
import axios from "axios";

function getCdrApi({ current, pageSize, column, direction }) {
  return axios.get(
    `http://localhost:8000/cdr?page=${current}&rpp=${pageSize}&sortName=${column}&sortDirection=${direction}`
  );
}

function* getCdr(action) {
  try {
    console.log("action:", action);
    const { current, pageSize, column, direction } = action.params;
    const res = yield call(getCdrApi, { current, pageSize, column, direction });
    if (res.data.status === "success") {
      yield put({ type: GET_CDR_SUC, data: res.data.data });
      yield put({ type: SET_CDR, data: action.params });
    }
  } catch (err) {
    let res = false;
    res = yield call(getRefreshedAccessToken);
    if (res) {
      yield call(getCdr, action);
    }
  }
}

function* watchGetCdr() {
  yield throttle(1000, GET_CDR_REQ, getCdr);
}

// function* setCdr(action) {
//   try {
//     yield put({ type: SET_CDR, data: action.params });
//   } catch (err) {}
// }

// function* watchSetCdr() {
//   yield takeLatest(SET_CDR, setCdr);
// }

export default function* cdrSaga() {
  yield all([fork(watchGetCdr)]);
}
