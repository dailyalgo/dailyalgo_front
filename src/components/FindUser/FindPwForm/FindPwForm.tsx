"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Timer } from "@components/SignUp/Timer";
import {
  fetchCheckId,
  requestSendPasswordMail,
  requestCheckPasswordCertificationNum,
  requestResetPassword,
} from "src/api/User";
import classNames from "classnames/bind";
import style from "./FindPwForm.module.scss";

const cx = classNames.bind(style);

type FormValues = {
  userId: string;
  email: string;
  emailAuthorization: string;
  password: string;
  passwordCheck: string;
};

const FindPwForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues,
    setError,
    reset,
  } = useForm<FormValues>({ mode: "onChange" });

  const [idCheckComplete, setIdCheckComplete] = useState<boolean>(false);
  const [shouldAuthorizeEmail, setShouldAuthorizeEmail] = useState(false);
  const [authResultMsg, setAuthResultMsg] = useState<string>("");
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [isTimeOut, setIsTimeOut] = useState<boolean>(false);
  const [canSearchId, setCanSearchId] = useState<boolean>(false);
  const [passwordSettingComplete, setPasswordSettingComplete] = useState<boolean>(false);
  const timerRef = useRef<any>(null);

  const handleIdCheck = async () => {
    const isValid = await trigger("userId");
    if (!isValid) return;

    try {
      const res: boolean = await fetchCheckId(getValues("userId"));
      if (!res) {
        setIdCheckComplete(true);
      } else {
        setError("userId", {
          message: "존재하지 않는 아이디입니다.",
        });
      }
    } catch (e) {
      throw new Error("아이디 중복체크에 실패했습니다.");
    }
  };

  const handleEmail = async () => {
    const isValid = await trigger("email");
    if (!isValid) return;
    const email = getValues("email");
    const id = getValues("userId");
    try {
      await requestSendPasswordMail(id, email);
      setShouldAuthorizeEmail(() => true);
      setAuthResultMsg("");
    } catch (e) {
      /** 이메일 중복 확인 로직 */
      setError("email", {
        type: "duplicate",
        message: "아이디와 이메일이 일치하지 않습니다.",
      });
      throw new Error("이메일 전송에 실패했습니다.");
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
    const id = getValues("userId");
    try {
      await requestSendPasswordMail(id, email);
      setShouldAuthorizeEmail(() => true);
      setAuthResultMsg("");
      setIsTimeOut(false);
      timerRef.current.resetTimer();
      initializeEmailAuthorization();
    } catch (e) {
      /** 이메일 중복 확인 로직 */
      setError("email", {
        type: "duplicate",
        message: "아이디와 이메일이 일치하지 않습니다.",
      });
      throw new Error("이메일 전송에 실패했습니다.");
    }
  };

  const emailMsg = () => {
    const email = getValues("email");
    if (errors.email && email === "") return <span>{errors.email?.message}</span>;
    if (email !== undefined && email !== "") {
      if (errors.email?.message) return <span>{errors.email?.message}</span>;
      if (!shouldAuthorizeEmail)
        return (
          <span role="alert" className={cx("need-duplication-check")}>
            이메일 인증이 필요합니다.
          </span>
        );
    }
    return null;
  };

  const handleCheckCertification = async () => {
    const email = getValues("email");
    const num = getValues("emailAuthorization");

    try {
      const res = await requestCheckPasswordCertificationNum(email, num);
      if (res) {
        setIsAuthorized(true);
        setAuthResultMsg("인증이 완료되었습니다.");
      } else {
        setError("emailAuthorization", {
          type: "duplicate",
          message: "인증번호가 일치하지 않습니다.",
        });
      }
    } catch (e) {
      throw new Error("인증번호 확인에 실패했습니다.");
    }
  };

  const handlePasswordSetting = async () => {
    const isValid = await trigger("password");
    if (!isValid) return;

    const email = getValues("email");
    const num = getValues("emailAuthorization");
    const password = getValues("password");

    try {
      await requestResetPassword(email, num, password);
      setPasswordSettingComplete(true);
    } catch (e) {
      throw new Error("비밀번호 재설정에 실패했습니다.");
    }
  };
  return (
    <form className={cx("find-pw-form")} onSubmit={handleSubmit((d) => console.log(d))}>
      {!idCheckComplete && (
        <div className={cx("input-without-button-wrap user-id")}>
          <label htmlFor="userId">
            <input
              id="userId"
              placeholder="아이디를 입력해주세요."
              {...register("userId", {
                required: "아이디를 입력해주세요.",
                pattern: {
                  value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{4,12}$/,
                  message: "아이디는 영문 대소문자와 숫자를 포함하여 4~12자리로 입력해야합니다",
                },
              })}
              style={errors.userId ? { borderColor: "#FF0000" } : {}}
              maxLength={12}
            />
            {errors.userId?.message && <span>{errors.userId.message}</span>}
          </label>
          <button type="button" className={cx("id-check-btn")} onClick={handleIdCheck}>
            확인
          </button>
        </div>
      )}
      {!canSearchId && idCheckComplete && (
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
                    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
                  message: "이메일형식이 올바르지 않습니다.",
                },
                onChange: () => {
                  if (shouldAuthorizeEmail) {
                    setShouldAuthorizeEmail(false);
                    setIsAuthorized(false);
                    initializeEmailAuthorization();
                  }
                },
              })}
              style={errors.email ? { borderColor: "#FF0000" } : {}}
            />
            {emailMsg()}
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
        <>
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
                {...register("emailAuthorization", {
                  required: "인증번호를 입력해주세요.",
                })}
                style={
                  errors.emailAuthorization
                    ? { borderColor: "#FF0000", paddingRight: "50px" }
                    : { paddingRight: "50px" }
                }
              />
              {errors.emailAuthorization?.message && (
                <span>{errors.emailAuthorization.message}</span>
              )}
              {isTimeOut && <span className={cx("error")}>{authResultMsg}</span>}
              {isAuthorized && <span className={cx("success")}>{authResultMsg}</span>}
            </label>

            <button
              type="button"
              disabled={isAuthorized || isTimeOut}
              onClick={() => {
                handleCheckCertification();
              }}
            >
              확인
            </button>
          </div>
          <button
            type="button"
            className={cx("find-btn")}
            disabled={!isAuthorized}
            onClick={() => {
              setCanSearchId(true);
            }}
          >
            비밀번호 재설정 하기
          </button>
        </>
      )}
      {!passwordSettingComplete && canSearchId && (
        <div className={cx("password-setting")}>
          <span className={cx("message")}>{getValues("userId")}님 새 비밀번호를 설정해 주세요</span>
          <div className={cx("input-without-button-wrap")}>
            <label htmlFor="password">
              <input
                id="password"
                type="password"
                placeholder="비밀번호를 입력해주세요."
                {...register("password", {
                  required: "비밀번호를 입력해주세요.",
                  validate: {
                    isDuplicate: (value) => {
                      const passwordCheck = getValues("passwordCheck");
                      if (passwordCheck === "") return undefined;
                      if (passwordCheck !== "" && value !== passwordCheck) {
                        trigger("passwordCheck");
                        return "비밀번호가 일치하지 않습니다.";
                      }
                      trigger("passwordCheck");
                      return undefined;
                    },
                    hasRequiredChar: (value) =>
                      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&-]).{8,20}$/.test(
                        value
                      ) ||
                      "비밀번호는 8자이상, 20자이하여야 하며, 숫자/대문자/소문자/특수문자를 모두 포함해야 합니다.",
                    haveSpace: (value) => !/\s/g.test(value) || "공백은 포함할 수 없습니다.",
                  },
                })}
                style={errors.password ? { borderColor: "#FF0000" } : {}}
              />
              {errors.password?.message && <span>{errors.password.message}</span>}
            </label>
          </div>
          {/* password check */}
          <div className={cx("input-without-button-wrap", "check")}>
            <label htmlFor="passwordCheck">
              <input
                id="passwordCheck"
                type="password"
                placeholder="비밀번호를 한번 더 입력해주세요."
                {...register("passwordCheck", {
                  required: "비밀번호를 한번 더 입력해주세요.",
                  validate: {
                    check: (value) => {
                      if (getValues("password") !== value) {
                        return "비밀번호가 일치하지 않습니다.";
                      }
                      return undefined;
                    },
                  },
                })}
                style={errors.passwordCheck ? { borderColor: "#FF0000" } : {}}
              />
              {errors.passwordCheck?.message && <span>{errors.passwordCheck.message}</span>}
            </label>
          </div>
          <button
            type="button"
            className={cx("password-setting-btn")}
            onClick={handlePasswordSetting}
          >
            비밀번호 재설정 하기
          </button>
        </div>
      )}
      {passwordSettingComplete && (
        <div className={cx("password-setting-success")}>
          <span className={cx("message")}>
            비밀번호 재설정이 완료되었습니다.
            <br /> 새로운 비밀번호로 로그인 해주세요.
          </span>
          <Link href="/sign-in" className={cx("login-btn")}>
            <button type="button">로그인하기</button>
          </Link>
        </div>
      )}
    </form>
  );
};

export { FindPwForm };
