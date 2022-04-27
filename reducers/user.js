import produce from "immer";

const initialState = {
  isLoginRequest: false,
  isLoginError: false,
  isLoginDone: false,
  getUserRequest: false,
  getUserError: false,
  getUserDone: false,
  userInfo: "",
  getUserRequest2: false,
  getUserError2: false,
  getUserDone2: false,
  userInfo2: "",
};

export const LOGIN_REQ = "LOGIN_REQ";
export const LOGIN_ERR = "LOGIN_ERR";
export const LOGIN_SUC = "LOGIN_SUC";
export const LOGOUT = "LOGOUT";

export const GET_USER_REQ = "GET_USER_REQ";
export const GET_USER_ERR = "GET_USER_ERR";
export const GET_USER_SUC = "GET_USER_SUC";
export const SET_USER = "SET_USER";

export const GET_USER_REQ2 = "GET_USER_REQ2";
export const GET_USER_ERR2 = "GET_USER_ERR2";
export const GET_USER_SUC2 = "GET_USER_SUC2";
export const SET_USER2 = "SET_USER2";

// reducers/user의 getUser가 view단에서 실행됨
// reducers/user의 GET_USER_REQ가 실행됨
// saga/user의 GET_USER_REQ를 리슨하고 있는 watchGetUser 가 실행됨
// watchGetUser 가 실행됨에 따라 getUser가 실행되고, try, catch문에 따라 타입이 실행
// 성공시 GET_USER_SUC, 실패시 GET_USER_ERR data를 가지고, reducer의 같은 액션을 가진 switch가 실행됨
export const getUser = (params) => ({
  type: GET_USER_REQ,
  /** 중요! - 이 params은 saga의
  const response = yield call(getUserApi, action.params);
  여기의 params로 들어갑니다. */
  params,
});

export const getUser2 = (params) => ({
  type: GET_USER_REQ2,
  /** 중요! - 이 params은 saga의
  const response = yield call(getUserApi, action.params);
  여기의 params로 들어갑니다. */
  params,
});

export const login = (params) => ({
  type: LOGIN_REQ,
  params,
});

export const logout = (params) => ({
  type: LOGOUT,
  params,
});

export const setUser = (user) => ({ type: SET_USER, user });

const user = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOGIN_REQ:
        draft.isLoginRequest = true;
        draft.isLoginError = false;
        draft.isLoginDone = false;
        break;

      // 요기가 saga에 의해 실행된다.
      case LOGIN_ERR:
        draft.isLoginRequest = false;
        draft.isLoginError = true;
        draft.isLoginDone = false;
        break;

      case LOGIN_SUC:
        draft.isLoginRequest = false;
        draft.isLoginError = false;
        draft.isLoginDone = true;
        break;

      case LOGOUT:
        draft.isLoginRequest = false;
        draft.isLoginError = false;
        draft.isLoginDone = false;
        draft.userInfo = "";
        draft.userInfo2 = "";
        draft.getUserDone = false;
        draft.getUserDone2 = false;
        break;

      case GET_USER_REQ:
        draft.getUserRequest = true;
        draft.getUserError = false;
        draft.getUserDone = false;
        break;
      case GET_USER_ERR:
        draft.getUserRequest = false;
        draft.getUserError = true;
        break;
      case GET_USER_SUC:
        draft.userInfo = state.userInfo + action.data;
        draft.getUserRequest = false;
        draft.getUserDone = true;
        break;

      case GET_USER_REQ2:
        draft.getUserRequest2 = true;
        draft.getUserError2 = false;
        draft.getUserDone2 = false;
        break;
      case GET_USER_ERR2:
        draft.getUserRequest2 = false;
        draft.getUserError2 = true;
        break;
      case GET_USER_SUC2:
        draft.userInfo2 = action.data;
        draft.getUserRequest2 = false;
        draft.getUserDone2 = true;
        break;

      default:
        return state;
    }
  });

export default user;
