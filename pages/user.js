import Head from "next/head";
import Image from "next/image";
import { CustomLayout } from "../components/CustomLayout";
import styles from "../styles/Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { getRefreshedAccessToken } from "../hooks/useInput";
import { useRouter } from "next/router";

const User = () => {
  console.log("User page\n----------------------");
  const dispatch = useDispatch();
  const router = useRouter();

  const { isLoginDone } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isLoginDone) {
      router.push(`/signIn?beforeUrl=${router.asPath}`);
    }
  }, [isLoginDone]);

  const onClickTest = async () => {
    try {
      // 평소요청
      if (axios.defaults.headers.common["Authorization"]) {
        const response = await axios.get(`http://localhost:8000/user/test`);
        if (response.data.status === "success") {
          console.log(response.data);
        }
        // 새로고침시 axios 값이 초기화됨
      } else {
        console.log("없어유");
        await getRefreshedAccessToken(onClickTest, dispatch, router);
      }
    } catch (e) {
      if (e.response) {
        // jwt accesstoken의 유효기간이 끝났을 때
        if (e.response.status === 401) {
          await getRefreshedAccessToken(onClickTest, dispatch, router);
        }
      }
    }
  };
  return (
    <CustomLayout isLoginDone={isLoginDone}>
      {isLoginDone ? (
        <>
          <div>User</div>
          <button onClick={onClickTest}>테스트</button>
          <div>User</div>
          <div>User</div>
          <div>User</div>
          <div>User</div>
          <div>User</div>
          <div>User</div>
          <div>User</div>
          <div>User</div>
          <div>User</div>
          <div>User</div>
          <div>User</div>
          <div>User</div>
          <div>User</div>
          <div>User</div>
        </>
      ) : (
        <div></div>
      )}
    </CustomLayout>
  );
};

export default User;
