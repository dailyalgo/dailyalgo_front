"use client";

import { useState } from "react";
import classNames from "classnames/bind";
import style from "./FindUserForm.module.scss";
import { FindIdForm } from "../FindIdForm";
import { FindPwForm } from "../FindPwForm";

const cx = classNames.bind(style);

const FindUserForm = () => {
  const [isFindId, setIsFindId] = useState(true);
  return (
    <div className={cx("find-user-form")}>
      <h1>{isFindId ? "아이디 찾기" : "비밀번호 찾기"}</h1>
      <button
        type="button"
        onClick={() => setIsFindId(!isFindId)}
        className={cx("state-change-btn")}
      >
        <span>{isFindId ? "비밀번호 찾기" : "아이디 찾기"}</span>
      </button>
      {isFindId ? <FindIdForm /> : <FindPwForm />}
    </div>
  );
};

export { FindUserForm };
