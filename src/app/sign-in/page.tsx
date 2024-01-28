"use client";

import Head from "next/head";
import Link from "next/link";
import { LoginForm } from "src/components/signIn/LoginForm";
// import "../../styles/common.scss";
import classNames from "classnames/bind";
// import style from "../../pages/sign-in/SignIn.module.scss";
import style from "./SignIn.module.scss";

const cx = classNames.bind(style);

// 로그인 페이지
const SignIn = () => {
  return (
    <div className={cx("page-wrap")}>
      <Head>
        <title>데일리알고 로그인</title>
        <meta name="description" content="로그인 페이지" />
      </Head>
      <div className={cx("container")}>
        <h1>로그인</h1>
        <LoginForm />
        <div className={cx("sign-in-actions")}>
          <Link href="/finduser" className={cx("link")}>
            <span>아이디/비밀번호를 잊어버리셨나요?</span>
            <img src="./images/arrow-tr.svg" alt="" />
          </Link>
          <Link href="/sign-up" className={cx("link")}>
            <span>아직 아이디가 없으신가요?</span>
            <img src="./images/arrow-tr.svg" alt="" />
          </Link>
        </div>
        {/* <div className={cx("social-login")}>
          <button type="button" className={cx("kakao-btn")}>
            <img src="./images/kakao-logo.svg" alt="" />
            <span>카카오톡으로 로그인</span>
          </button>
          <button type="button" className={cx("google-btn")}>
            <img src="./images/google-logo.svg" alt="" />
            <span>구글로 로그인</span>
          </button>
          <button type="button" className={cx("github-btn")}>
            <img src="./images/github-logo.svg" alt="" />
            <span>깃허브로 로그인</span>
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default SignIn;
