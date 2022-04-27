import Head from "next/head";
import Image from "next/image";
import { CustomLayout } from "../components/CustomLayout";
import styles from "../styles/Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { getRefreshedAccessToken } from "../hooks/useInput";
import { useRouter } from "next/router";
import { useState } from "react";
import { getUser } from "../reducers/user";

function* generatorFunction() {
  console.log("안녕하세요?");
  yield 1;
  console.log("제너레이터 함수");
  yield 2;
  console.log("function*");
  yield 3;
  return 4;
}

function* sumGenerator() {
  console.log("sumGenerator이 시작됐습니다.");
  let a = yield;
  console.log("a값을 받았습니다.");
  let b = yield;
  console.log("b값을 받았습니다.");
  yield a + b;
}

function* watchGenerator() {
  console.log("모니터링 시작!");
  while (true) {
    const action = yield;
    if (action.type === "HELLO") {
      console.log("안녕하세요?");
    }
    if (action.type === "BYE") {
      console.log("안녕히가세요.");
    }
  }
}

const generator = generatorFunction();
const generator1 = sumGenerator();
const generator2 = watchGenerator();

const Index = () => {
  console.log("index page\n----------------------");
  const { isLoginDone } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const onClick = () => {
    // console.log(generator.next()); yield가 끝나면 true를 반환
    // {value: 1, done: false}, {value: 2, done: false},
    // {value: 3, done: false}, {value: 4, done: true},
    // {value: undefined, done: true}

    // console.log(generator1.next(2)); 인자값이 yield에 박힘
    // const json = '{"result":true, "count":42}';
    // const obj = JSON.parse(json);

    // console.log(generator2.next(JSON.parse(input)));
    dispatch(getUser());
  };

  return (
    <CustomLayout isLoginDone={isLoginDone}>
      <div>index</div>
      <button onClick={onClick}>aa</button>
      <div>index</div>
      <div>index</div>
      <div>index</div>
      <div>index</div>
      <div>index</div>
      <div>index</div>
      <div>index</div>
      <div>index</div>
      <div>index</div>
      <div>index</div>
      <div>index</div>
      <div>index</div>
      <div>index</div>
      <div>index</div>
    </CustomLayout>
  );
};

export default Index;
