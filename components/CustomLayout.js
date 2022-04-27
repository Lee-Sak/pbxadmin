import { Layout, Menu, Button } from "antd";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN_REQ, LOGIN_ERROR, LOGIN_DONE, LOGOUT } from "../reducers/user";
import axios from "axios";
import { useRouter } from "next/router";
import SideBar from "./SideBar";
import { useState } from "react";

const { Header, Content, Footer, Sider } = Layout;

// dispatch logout 되면서 isLoginDone의 값이 바뀌므로 CustomLayout 리렌더링 현재 페이지는 /post
//
const CustomLayout = ({ children, isLoginDone, width, height }) => {
  const router = useRouter();
  console.log(`${router.asPath} customlayout comp`);
  console.log(width, height);
  return (
    <Layout id="antdlayout">
      <SideBar isLoginDone={isLoginDone} />
      <Layout
        style={{
          width: width + 300,
          height: height + 17 + 300,
        }}
      >
        <Header
          className="site-layout-sub-header-background"
          style={{ padding: 0 }}
        />
        <Content style={{ margin: "24px 16px 0" }}>
          <div className="a" style={{ padding: 24, minHeight: 360 }}>
            {children}
          </div>
        </Content>
      </Layout>
      <style jsx>{`
        .logo {
          height: 32px;
          margin: 16px;
          background: rgba(255, 255, 255, 0.2);
        }

        .site-layout-sub-header-background {
          background: black;
        }

        .site-layout-background {
          background: #fff;
        }
        div.a {
          display: flex;
          gap: 10px;
          flex-direction: column;
          align-items: center;
          padding-top: 20px;
          padding-bottom: 10px;
        }
      `}</style>
    </Layout>
  );
};

export { CustomLayout };
