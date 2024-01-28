"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { Timer } from "@components/SignUp/Timer";
import classNames from "classnames/bind";
import { requestSendFindMail, requestCheckFindCertificationNum } from "src/api/User";
import style from "./FindIdForm.module.scss";

const cx = classNames.bind(style);

type FormValues = {
  email: string;
  emailAuthorization: string;
};

const FindIdForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    trigger,
    getValues,
    reset,
    setError,
  } = useForm<FormValues>({ mode: "onChange" });

  const [authResultMsg, setAuthResultMsg] = useState<string>("");
  const [shouldAuthorizeEmail, setShouldAuthorizeEmail] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [isTimeOut, setIsTimeOut] = useState<boolean>(false);
  const [canSearchId, setCanSearchId] = useState<boolean>(false);
  const [failSearchId, setFailSearchId] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("");
  const timerRef = useRef<any>(null);

  const onVaild: SubmitHandler<FormValues> = async () => {
    if (!isAuthorized) {
      setError("emailAuthorization", {
        type: "required",
        message: "이메일 인증이 필요합니다.",
      });
    }
  };

  const handleEmail = async () => {
    const isValid = await trigger("email");
    if (!isValid) return;

    const email = getValues("email");
    try {
      const res = await requestSendFindMail(getValues("email"));
      if (res) {
        await requestSendFindMail(email);
        setShouldAuthorizeEmail(() => true);
        setAuthResultMsg("");
      }
    } catch (e) {
      setFailSearchId(() => true);
    }
  };

  const initializeEmailAuthorization = () => {
    const initialValues = {
      emailAuthorization: "",
    };

    reset(initialValues);
  };

  const handleReSendEmail = async () => {
    const email = getValues("email");
    try {
      await requestSendFindMail(email);
      setShouldAuthorizeEmail(() => true);
      setAuthResultMsg("");
      setIsTimeOut(false);
      timerRef.current.resetTimer();
      initializeEmailAuthorization();
    } catch (e) {
      setFailSearchId(() => true);
    }
  };

  const handleCheckCertificationNum = async () => {
    const email = getValues("email");
    const emailAuthorization = getValues("emailAuthorization");

    try {
      const res = await requestCheckFindCertificationNum(email, emailAuthorization);
      setCanSearchId(() => true);
      setUserId(() => res);
      setIsAuthorized(() => true);
      setAuthResultMsg(() => "인증에 성공했습니다.");
      timerRef.current.resetTimer();
    } catch (e) {
      setError("emailAuthorization", {
        type: "duplicate",
        message: "인증번호가 일치하지 않습니다.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onVaild)} className={cx("find-id-form")}>
      {!canSearchId && !failSearchId && (
        <div className={cx("input-with-button-wrap")}>
          <label htmlFor="email">
            <input
              id="email"
              placeholder="가입시 입력한 이메일을 입력해주세요."
              disabled={isAuthorized}
              {...register("email", {
                required: "이메일을 입력해주세요.",
                pattern: {
                  value:
                    /^[0-9a-zA-Z]([-_.]|[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
                  message: "이메일형식이 올바르지 않습니다.",
                },
                onChange: () => {
                  if (shouldAuthorizeEmail) {
                    setShouldAuthorizeEmail(() => false);
                    setIsAuthorized(() => false);
                    initializeEmailAuthorization();
                  }
                },
              })}
              style={errors.email ? { borderColor: "#FF0000" } : {}}
            />
            {errors.email?.message && <span>{errors.email.message}</span>}
          </label>
          {!shouldAuthorizeEmail ? (
            <button
              type="button"
              onClick={() => {
                handleEmail();
              }}
            >
              인증하기
            </button>
          ) : (
            <button
              type="button"
              disabled={isAuthorized}
              onClick={() => {
                handleReSendEmail();
              }}
            >
              재전송
            </button>
          )}
        </div>
      )}
      {shouldAuthorizeEmail && !canSearchId && (
        <div className={cx("input-with-button-wrap")}>
          <label htmlFor="emailAuthorization" className={cx("email-authorization")}>
            {!isAuthorized && (
              <Timer
                ref={timerRef}
                setAuthResultMsg={setAuthResultMsg}
                isAuthorized={isAuthorized}
                setIsTimeOut={setIsTimeOut}
              />
            )}

            <input
              id="emailAuthorization"
              placeholder="인증번호를 입력해 주세요"
              disabled={isAuthorized}
              style={
                errors.emailAuthorization
                  ? { borderColor: "#FF0000", paddingRight: "50px" }
                  : { paddingRight: "50px" }
              }
              {...register("emailAuthorization", {
                required: "인증번호를 입력해주세요.",
              })}
            />
            {errors.emailAuthorization?.message && !isTimeOut && (
              <span>{errors.emailAuthorization.message}</span>
            )}
            {isTimeOut && <span className={cx("error")}>{authResultMsg}</span>}
            {isAuthorized && <span className={cx("success")}>{authResultMsg}</span>}
          </label>

          <button
            type="button"
            disabled={isAuthorized || isTimeOut}
            onClick={handleCheckCertificationNum}
          >
            확인
          </button>
          {/* <div className={cn("certification-result-msg")}>
            <span>{authResultMsg}</span>
          </div> */}
        </div>
      )}
      {canSearchId && (
        <div className={cx("find-id-success")}>
          <span>
            {getValues("email")}로 가입된 아이디는
            <br /> 다음과 같습니다
          </span>
          <span className={cx("user-id")}>{userId}</span>
          <Link href="/sign-in" className={cx("login-btn")}>
            <button type="button">로그인하기</button>
          </Link>
        </div>
      )}
      {failSearchId && (
        <div className={cx("find-id-fail")}>
          <span>해당 이메일로 가입된 아이디가 없습니다.</span>
          <Link href="/sign-up" className={cx("sign-up-btn")}>
            <button type="button">회원가입하기</button>
          </Link>
        </div>
      )}
      {/* <button type="submit">submit</button> */}
    </form>
  );
};

export { FindIdForm };
