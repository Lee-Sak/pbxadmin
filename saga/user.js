import {
  all,
  fork,
  call,
  takeLatest,
  delay,
  put,
  throttle,
  select,
} from "redux-saga/effects";
import axios from "axios";
import {
  GET_USER_REQ,
  GET_USER_ERR,
  GET_USER_SUC,
  LOGIN_REQ,
  LOGIN_ERR,
  LOGIN_SUC,
  GET_USER_REQ2,
  GET_USER_ERR2,
  GET_USER_SUC2,
  LOGOUT,
} from "../reducers/user";
import Router from "next/router";

/* ---------Action: getRefreshedAccessToken-------------- */
function getRefTok() {
  return axios.get(`http://localhost:8000/user/refTok`, {
    withCredentials: true, // 쿠키 cors 통신 보낼 때
  });
}

function getNewAccTok(refToken) {
  return axios.get(`http://localhost:8000/user/newAccTok`, {
    headers: {
      Authorization: refToken,
    },
  });
}

function logoutApi() {
  return axios.post(
    `http://localhost:8000/user/logout`,
    {},
    {
      withCredentials: true,
    }
  );
}

export function* getRefreshedAccessToken() {
  try {
    console.log("getRefreshedAccessToken()");
    console.log("acctok 재발급시작");
    // 서버로 쿠키에 있는 리프레쉬 토큰이 유효한지 체크하기 위해 가져오기.

    const res = yield call(getRefTok);
    const refToken = res.data.data;

    // ref token을 보내 401 error가 안뜨면 redis에 이메일키로 저장된 벨류를 비교
    const response = yield call(getNewAccTok, refToken);
    const accTok = response.data.data;
    axios.defaults.headers.common["Authorization"] = accTok;

    return true;
  } catch (e) {
    if (e.response) {
      if (e.response.status === 401) {
        const res = yield call(logoutApi);
        if (res.data.status === "success") {
          axios.defaults.headers.common["Authorization"] = "";
          yield put({ type: LOGOUT });
          alert("세션이 만료되었습니다.");
        }
      }
    }
  }
}
/* -----------------------------------------------------------*/

/* ------------------- Action: getUser ----------------------- */
// 유저 정보를 가져오는 API
function getUserApi(params) {
  console.log("getUserApi: ", params);
  return axios.get("http://localhost:8000/user/test");
}

// 유저 정보 GET 요청에 대한 액션이 감지되었을 때 상태값 처리를 하기 위한 사가 함수
// saga가 내부적으로 계속 next를 호출
function* getUser(action) {
  try {
    // api 통신할때는 call
    const state = yield select();

    const response = yield call(getUserApi, action.params); // 동기적인 처리

    // 아래와 같이 api 결과를 핸들링하여 dispatch 가능
    yield put({ type: GET_USER_SUC, data: response.data.data });
  } catch (err) {
    yield put({ type: GET_USER_ERR });
  }
}

// 유저 정보 GET 요청이 들어오는지를 감지하는 제너레이터 함수
function* watchGetUser() {
  // 동일한 액션에 대한 요청이 여러번 들어올 경우 가장 마지막 요청을 우선해서 처리하는 부수효과 함수
  // 실수로 버튼을 두분 눌러서 결과물이 화면에 두번 나오는 일을 막기위함 그게아니면 takeEvery
  // yield takeLatest(GET_USER_REQ, getUser);
  yield throttle(1000, GET_USER_REQ, getUser); // 1s = 1000ms, 10초에 한번만 getUser()를 실행
}
/* -----------------------------------------------------------*/

/* ------------------- Action: getUser2 ----------------------- */
function getUserApi2(params) {
  console.log("getUserApi2: ", params);
  return axios.get("http://localhost:8000/user/test2");
}

function* getUser2(action) {
  try {
    const response = yield call(getUserApi2, action.params); // 동기적인 처리
    yield put({ type: GET_USER_SUC2, data: response.data.data.email });
  } catch (err) {
    yield call(getRefreshedAccessToken, getUser2);
  }
}

function* watchGetUser2() {
  yield throttle(1000, GET_USER_REQ2, getUser2); // 1s = 1000ms, 10초에 한번만 getUser()를 실행
}
/* -----------------------------------------------------------*/

/* ------------------- Action: login ----------------------- */
function loginApi({ email, password }) {
  console.log("loginApi: ", email, password);
  return axios.post(
    `http://localhost:8000/user/signIn`,
    {
      email,
      password,
    },
    {
      withCredentials: true, // 쿠키 cors 통신 받을때
    }
  );
}

function* login(action) {
  try {
    // api 통신할때는 call
    const response = yield call(loginApi, action.params); // 동기적인 처리
    const accessToken = response.data.data.accessToken;
    axios.defaults.headers.common["Authorization"] = accessToken;

    // 아래와 같이 api 결과를 핸들링하여 dispatch 가능
    yield put({ type: LOGIN_SUC });
    const routePath = Router.asPath.split("beforeUrl=")[1];
    console.log("rotuer:", routePath);
    if (routePath) {
      yield call(Router.push, routePath);
    } else {
      yield call(Router.push, "/");
    }
  } catch (err) {
    alert(err.response.data.message);
    yield put({ type: LOGIN_ERR });
  }
}

function* watchLogin() {
  yield throttle(1000, LOGIN_REQ, login); // 1s = 1000ms, 10초에 한번만 getUser()를 실행
}
/* -----------------------------------------------------------*/

/* ------------------- Action: logout ----------------------- */
function* logout(action) {
  try {
    // api 통신할때는 call
    const res = yield call(logoutApi);
    if (res.data.status === "success") {
      axios.defaults.headers.common["Authorization"] = "";
      yield call(Router.push, "/signIn");
    }
  } catch (err) {
    alert(err.response.data.message);
  }
}

function* watchLogout() {
  yield throttle(1000, LOGOUT, logout); // 1s = 1000ms, 10초에 한번만 getUser()를 실행
}
/* -----------------------------------------------------------*/

// const getCdrApi = ({ current, pageSize }) => {
//   return axios.get(`http://localhost:8000/cdr?page=${current}&rpp=${pageSize}`);
// };

// function* getCdr(action) {
//   try {
//     const res = yield call(getCdrApi, action.params);
//     const { current, pageSize } = action.params;
//     if (res.data.status === "success") {
//       yield put({
//         type: GET_CDR_SUC,
//         data: { current, pageSize, ...res.data.data },
//       });
//     }
//   } catch (err) {
//     yield put({ type: GET_CDR_ERR });
//     yield call(getRefreshedAccessToken, getUser2);
//   }
// }

// function* watchGetCdr() {
//   yield throttle(1000, GET_CDR_REQ, getCdr);
// }

export default function* userSaga() {
  yield all([
    fork(watchGetUser),
    fork(watchLogin),
    fork(watchGetUser2),
    fork(watchLogout),
  ]); // all은 배열을 받고, 받은 이펙트를 등록, fork는 함수를 실행
}

// fork: 새로운 하위 saga 태스크를 생성하는 effect
// - fork는 블럭되지 않으며 호출 시점에서 호출자는 부모 task가 되고 fork된 saga는 자식 task가 된다. 부모 task가 취소되면
// - 자식 task도 취소됨
// call: 블럭되는 fork
// select:
// - 블럭 이펙트
// - redux의 state에서 특정 상태를 가져올 때 사용하는 effect
// - redux-thunk의 getState와 비슷하지만, 인자로 셀럭터를 줄 수 있음
