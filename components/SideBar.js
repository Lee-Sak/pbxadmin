import { Layout, Menu, Button } from "antd";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import { useEffect, useState } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  LOGIN_REQ,
  LOGIN_ERROR,
  LOGIN_DONE,
  LOGOUT,
  logout,
} from "../reducers/user";
import axios from "axios";
import { useRouter } from "next/router";
import Logout from "./Logout";
import Link from "next/link";

const { Header, Content, Footer, Sider } = Layout;
const click = {
  "/": "1",
  "/cdr": "2",
  "/user": "3",
  "/signIn": "5",
};
const SideBar = ({ isLoginDone }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  console.log(`${router.asPath} sidebar compo`);

  const onClickMenu = (e) => {
    if (e.key === "4") {
      dispatch(logout());
    }
  };
  return (
    <>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          // console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          // console.log(collapsed, type);
        }}
      >
        <div style={{ marginLeft: "45px", marginTop: "10px" }}>
          <img
            src="http://gi.esmplus.com/dial070/MT/my_info/my_mt.png"
            alt=""
            width="100"
            height="55"
          />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={click[router.asPath]}
          selectedKeys={click[router.asPath]}
          onClick={onClickMenu}
        >
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link href="/">HOME</Link>
          </Menu.Item>

          <Menu.Item key="2" icon={<UploadOutlined />}>
            <Link href="/cdr">통화기록</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<UserOutlined />}>
            <Link href="/user">콜백요청</Link>
          </Menu.Item>
          {isLoginDone ? (
            <Menu.Item key="4" icon={<UserOutlined />}>
              <Link href="/">LOGOUT</Link>
            </Menu.Item>
          ) : (
            <Menu.Item key="5" icon={<UserOutlined />}>
              <Link href="/signIn">SIGNIN</Link>
            </Menu.Item>
          )}
        </Menu>
      </Sider>
    </>
  );
};

export default React.memo(SideBar);
