import { all, fork } from "redux-saga/effects";
import cdrSaga from "./cdr";
import userSaga from "./user";

export default function* rootSaga() {
  yield all([fork(userSaga), fork(cdrSaga)]);
}
