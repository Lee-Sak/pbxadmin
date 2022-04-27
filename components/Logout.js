import {
  LOGIN_REQ,
  LOGIN_ERROR,
  LOGIN_DONE,
  LOGOUT,
  user,
} from "../reducers/user";
import { useDispatch, useSelector } from "react-redux";
import { Layout, Menu, Button } from "antd";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Logout = () => {
  const router = useRouter();
  console.log(`${router.asPath} logout compo`);

  const dispatch = useDispatch();

  const onClickLogout = async () => {
    try {
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
        router.push("/signIn");
      }
    } catch (e) {}
  };

  return (
    <Button type="primary" loading={false} onClick={onClickLogout}>
      로그아웃
    </Button>
  );
};

export default React.memo(Logout);
