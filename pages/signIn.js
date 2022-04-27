import "antd/dist/antd.css";
import { Form, Input, Button } from "antd";
import { useInput } from "../hooks/useInput";
import axios from "axios";
import { useRouter } from "next/router";
import { CustomLayout } from "../components/CustomLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  LOGIN_REQ,
  LOGIN_ERROR,
  LOGIN_DONE,
  LOGOUT,
  login,
} from "../reducers/user";
import { useEffect } from "react";
import { useState } from "react";

const SignIn = () => {
  console.log("signin page");

  const maxLen = (value) => value.length < 50;
  const email = useInput("", maxLen);
  const password = useInput("", maxLen);
  // const [height, setHeight] = useState("");
  // const [width, setWidth] = useState("");

  const dispatch = useDispatch();

  const onSubmitForm = async () => {
    dispatch(login({ email: email.value, password: password.value }));
  };

  useEffect(() => {
    // setHeight(document.getElementById("antdlayout").clientHeight);
    // setWidth(document.getElementById("antdlayout").clientWidth);
    // console.log(document.getElementById("antdlayout").clientWidth);
  }, []);

  return (
    <CustomLayout isLoginDone={false}>
      <Form onFinish={onSubmitForm}>
        <div>
          <div>
            <label htmlFor="user-id">이메일</label>
            <Input id="user-id" {...email} required />

            <label htmlFor="user-password">비밀번호</label>
            <Input id="user-password" type="password" {...password} required />
            <Button type="primary" htmlType="submit" loading={false}>
              로그인
            </Button>
          </div>
        </div>
      </Form>
    </CustomLayout>
  );
};

export default SignIn;
