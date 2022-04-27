import { useEffect, useState } from "react";
import axios from "axios";
import { LOGIN_REQ, LOGIN_ERROR, LOGIN_DONE, LOGOUT } from "../reducers/user";
import { useDispatch, useSelector } from "react-redux";

// 함수형 컴포넌트 안에 없어도, 다른 함수에서 이벤트를 처리 할 수 있음 -> 곧, 다른 파일과 분리가 가능
const useInput = (initialValue, validator) => {
  const [value, setValue] = useState(initialValue);

  const onChange = (e) => {
    const targetValue = e.target.value;
    let willUpdate = true;
    if (typeof validator === "function") {
      willUpdate = validator(targetValue);
    }
    if (willUpdate) setValue(targetValue);
  };
  return { value, onChange };
};

export const getRefreshedAccessToken = async (callback, dispatch, router) => {
  try {
    console.log("getRefreshedAccessToken()");
    console.log("acctok 재발급시작");
    // 서버로 쿠키에 있는 리프레쉬 토큰이 유효한지 체크하기 위해 가져오기.
    const res = await axios.get(`http://localhost:8000/user/refTok`, {
      withCredentials: true, // 쿠키 cors 통신 보낼 때
    });
    const refToken = res.data.data;

    // ref token을 보내 401 error가 안뜨면 redis에 이메일키로 저장된 벨류를 비교
    const response = await axios.get(`http://localhost:8000/user/newAccTok`, {
      headers: {
        Authorization: refToken,
      },
    });
    if (response.data.status === "success") {
      const accTok = response.data.data;
      axios.defaults.headers.common["Authorization"] = accTok;
      callback();
      console.log("acctok 재발급종료");
    }
  } catch (e) {
    if (e.response) {
      if (e.response.status === 401) {
        const res = await axios.post(
          `http://localhost:8000/user/logout`,
          {},
          {
            withCredentials: true,
          }
        );
        if (res.data.status === "success") {
          axios.defaults.headers.common["Authorization"] = "";
          dispatch({ type: LOGOUT });
          alert("세션이 만료되었습니다.");
          // router.push("/signIn");
        }
      }
    }
  }
};

const Hooks = () => {
  const maxLen = (value) => value.length < 10;
  const name = useInput("Mr.", maxLen); // useState와 onChange를 묶어놓은 함수, 리턴:{value=Mr., onChange=onChange}
  return (
    <div>
      <h1>Hello</h1>
      <input placeholder="Name" {...name} />
    </div>
  );
};
// 첫 렌더링
// useInput return -> name = {value='Mr.', onChange=onChange}
// <input placeholder='Name' value='Mr.', onChange=onChange />

// input text의 키보드 입력 발생시, 예를 들면 'a'
// onChange 함수가 발동. 기존 문자열에서 하나의 문자를 더한 값을 target.value에서 가져옴
// 유효성 검사 이후 input value를 setValue를 통해 변화가 되면 리렌더링 발생

// 이후 렌더링
// useInput 에서 usetState는 실행되지 않음
// 벨류 값은 setValue에 의해 설정된 벨류 값을 리턴
// return -> name = {value='Mr.a', onChange=onChange}
// <input placeholder='Name' value='Mr.a', onChange=onChange />
export default Hooks;
export { useInput };
