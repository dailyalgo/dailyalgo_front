"use client";

import { useState, MouseEvent, useRef } from "react";
import { FieldErrors, SubmitHandler, useForm } from "react-hook-form";
import classNames from "classnames/bind";
import {
  fetchCheckId,
  fetchCheckNickname,
  requestSendSignUpMail,
  requestCheckSignUpCertificationNum,
  requestSignUp,
  fetchUserInfo,
} from "src/api/User";
import { fetchOrganizationSearch } from "src/api/Organization";
import type { UserSignUpReq, UserLoginRes, UserInfo } from "src/types/user";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/redux/store";
import { setLogIn, setUserInfo } from "src/redux/slices/auth-slice";
import style from "./SignUpForm.module.scss";
import { Timer } from "../Timer";
import { AgreementModal } from "../AgreementModal/AgreementModal";

const cx = classNames.bind(style);

type FormValues = {
  name: string;
  registerId: string;
  nickname: string;
  password: string;
  passwordCheck: string;
  email: string;
  emailAuthorization: string;
  organizationCode?: string;
  agreementAl: boolean;
  agreementId: boolean;
};

interface RefMethods {
  resetTimer: () => void;
}

const SignUpForm = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
    trigger,
    setError,
    reset,
    clearErrors,
  } = useForm<FormValues>({ mode: "onChange" });

  const [registerIdDuplicationCheck, setRegisterIdDuplicationCheck] = useState(false);
  const [nicknameDuplicationCheck, setNicknameDuplicationCheck] = useState(false);
  const [shouldAuthorizeEmail, setShouldAuthorizeEmail] = useState(false);
  const [authResultMsg, setAuthResultMsg] = useState<string>("");
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [isTimeOut, setIsTimeOut] = useState<boolean>(false);
  const [isAlModalOpen, setIsAlModalOpen] = useState<boolean>(false);
  const [isIdModalOpen, setIsIdModalOpen] = useState<boolean>(false);
  const [isOrganizationNameSearched, setIsOrganizationNameSearched] = useState<boolean>(false);
  const [organizationName, setOrganizationName] = useState<string>("");
  const timerRef = useRef<RefMethods | null>(null);

  const getUserInfo = async () => {
    try {
      const res: UserInfo = await fetchUserInfo();
      dispatch(setUserInfo(res));
      router.push("/");
    } catch (e) {
      throw new Error("Failed to fetch data");
    }
  };

  const onValid: SubmitHandler<FormValues> = async (data) => {
    if (!registerIdDuplicationCheck) {
      setError("registerId", {
        type: "duplicate",
        message: "중복 확인이 필요합니다.",
      });
    } else if (!nicknameDuplicationCheck) {
      setError("nickname", {
        type: "duplicate",
        message: "중복 확인이 필요합니다.",
      });
    } else if (!isAuthorized) {
      setError("email", {
        type: "duplicate",
        message: "이메일 인증이 필요합니다.",
      });
    } else if (data.organizationCode && !isOrganizationNameSearched) {
      setError("organizationCode", {
        type: "duplicate",
        message: "조회 버튼을 눌러주세요.",
      });
    } else {
      const requestBody: UserSignUpReq = {
        id: data.registerId,
        name: data.name,
        nickname: data.nickname,
        password: data.password,
        email: data.email,
        num: data.emailAuthorization,
        organization_code: data.organizationCode,
      };

      try {
        const res: UserLoginRes = await requestSignUp(requestBody);
        const { token } = res;
        dispatch(setLogIn(token));
        window.localStorage.setItem("token", token);
        await getUserInfo();
      } catch (e) {
        throw new Error("회원가입에 실패했습니다.");
      }
    }
  };

  const onInvalid = (error: FieldErrors) => {
    console.log("invalid", error);
  };

  /** resisterId */
  const handleCheckRegisterId = async () => {
    // 1. 아이디 유효성 검사 통과확인
    const isValid = await trigger("registerId");
    if (!isValid) return;

    // 2. 아이디 중복 확인
    const id = getValues("registerId");
    try {
      const res = await fetchCheckId(id);
      if (res) setRegisterIdDuplicationCheck(true);
      else {
        setRegisterIdDuplicationCheck(false);
        setError("registerId", {
          type: "duplication",
          message: "이미 사용중인 아이디입니다.",
        });
      }
    } catch (e) {
      throw new Error("아이디 중복 확인에 실패했습니다.");
    }
  };

  const registerIdMsg = () => {
    const id = getValues("registerId");
    if (errors.registerId && id === "") return <span>{errors.registerId?.message}</span>;
    if (id !== undefined && id !== "") {
      if (errors.registerId?.message) return <span>{errors.registerId?.message}</span>;
      if (registerIdDuplicationCheck)
        return <span className={cx("success")}>사용가능한 아이디입니다.</span>;
      return <span className={cx("need-duplication-check")}>중복 확인이 필요합니다.</span>;
    }
    return null;
  };

  /** nickname */
  const handleCheckNickname = async () => {
    // 1. 닉네임 유효성 검사 통과확인
    const isValid = await trigger("nickname");
    if (!isValid) return;

    // 2. 닉네임 중복 확인
    const nickname = getValues("nickname");
    try {
      const res = await fetchCheckNickname(nickname);
      if (res) {
        setNicknameDuplicationCheck(true);
      } else {
        setNicknameDuplicationCheck(false);
        setError("nickname", {
          type: "duplicate",
          message: "이미 사용중인 닉네임입니다.",
        });
      }
    } catch (e) {
      throw new Error("닉네임 중복 확인에 실패했습니다.");
    }
  };

  const nicknameMsg = () => {
    const nickname = getValues("nickname");
    if (errors.nickname && nickname === "") return <span>{errors.nickname?.message}</span>;
    if (nickname !== undefined && nickname !== "") {
      if (errors.nickname) return <span>{errors?.nickname.message}</span>;
      if (nicknameDuplicationCheck)
        return <span className={cx("success")}>사용가능한 닉네임입니다.</span>;
      if (!nicknameDuplicationCheck)
        return (
          <span role="alert" className={cx("need-duplication-check")}>
            중복 확인이 필요합니다.
          </span>
        );
      return null;
    }
    return null;
  };

  /** email */
  const handleSendEmail = async () => {
    // 1. 이메일 유효성 검사 통과확인
    const isValid = await trigger("email");
    if (!isValid) return;

    // 2. 인증 메일 전송
    const email = getValues("email");
    try {
      await requestSendSignUpMail(email);
      setShouldAuthorizeEmail(() => true);
      setAuthResultMsg("");
    } catch (e) {
      /** 이메일 중복 확인 로직 */
      setError("email", {
        type: "duplicate",
        message: "이미 가입한 계정이 있습니다.",
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
    try {
      await requestSendSignUpMail(email);
      setShouldAuthorizeEmail(() => true);
      setAuthResultMsg("");
      setIsTimeOut(false);
      timerRef.current?.resetTimer();
      initializeEmailAuthorization();
    } catch (e) {
      /** 이메일 중복 확인 로직 */
      setError("email", {
        type: "duplicate",
        message: "이미 가입한 계정이 있습니다.",
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

  /** emailAuthorization */
  const handleCheckCertificationNum = async () => {
    const email = getValues("email");
    const emailAuthorization = getValues("emailAuthorization");

    try {
      const res = await requestCheckSignUpCertificationNum(email, emailAuthorization);

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

  /** organizationName */
  const organizationNameSearch = async () => {
    const organizationCode = getValues("organizationCode");

    if (!organizationCode) {
      setError("organizationCode", {
        type: "duplicate",
        message: "소속코드를 입력해주세요.",
      });
      return;
    }

    try {
      const res = await fetchOrganizationSearch(organizationCode);
      if (res) {
        setOrganizationName(res);
        setIsOrganizationNameSearched(true);
      }
    } catch (e) {
      setError("organizationCode", {
        type: "duplicate",
        message: "존재하지 않는 소속코드입니다.",
      });
    }
  };

  const alModalOpen = (e: MouseEvent) => {
    e.preventDefault();
    setIsAlModalOpen(true);
  };

  const idModalOpen = (e: MouseEvent) => {
    e.preventDefault();
    setIsIdModalOpen(true);
  };

  const agreementBtnClickHandler = (type: "al" | "id") => {
    if (type === "al") {
      const alCheckbox = document.getElementById("agreement-al") as HTMLInputElement;
      alCheckbox.checked = true;
      setIsAlModalOpen(false);
    } else {
      const idCheckbox = document.getElementById("agreement-id") as HTMLInputElement;
      idCheckbox.checked = true;
      setIsIdModalOpen(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onValid, onInvalid)} className={cx("register-form")}>
        {/* name */}
        <div className={cx("input-without-button-wrap")}>
          <label htmlFor="name">
            <input
              id="name"
              placeholder="이름을 입력해주세요."
              {...register("name", {
                required: "이름을 입력해주세요.",
              })}
              style={
                errors.name
                  ? { borderColor: "#FF0000", paddingRight: "50px" }
                  : { paddingRight: "50px" }
              }
            />
            {errors.name?.message && <span>{errors.name.message}</span>}
          </label>
        </div>
        {/* register-id */}
        <div className={cx("input-with-button-wrap")}>
          <label htmlFor="registerId">
            <input
              id="registerId"
              placeholder="아이디를 입력해주세요."
              {...register("registerId", {
                required: "아이디를 입력해주세요.",
                pattern: {
                  value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{4,12}$/,
                  message: "아이디는 영문 대소문자와 숫자를 포함하여 4~12자리로 입력해야합니다",
                },
                onChange: () => {
                  if (registerIdDuplicationCheck) {
                    setRegisterIdDuplicationCheck(false);
                    setError("registerId", {
                      type: "duplicate",
                      message: "아이디 중복 확인이 필요합니다.",
                    });
                  }
                },
              })}
              style={errors.registerId ? { borderColor: "#FF0000" } : {}}
            />
            {registerIdMsg()}
          </label>
          <button type="button" onClick={handleCheckRegisterId} id="duplicate">
            중복확인
          </button>
        </div>
        {/* nickname */}
        <div className={cx("input-with-button-wrap")}>
          <label htmlFor="nickname">
            <input
              id="nickname"
              placeholder="닉네임을 입력해주세요."
              {...register("nickname", {
                required: "닉네임을 입력해주세요.",
                pattern: {
                  value: /^[가-힣a-zA-Z0-9]{4,12}$/,
                  message:
                    "닉네임은 영문 대소문자, 숫자, 또는 한글로 구성되어야 하며, 길이는 2자에서 10자 사이여야 합니다.",
                },
                onChange: () => {
                  if (nicknameDuplicationCheck) {
                    setNicknameDuplicationCheck(false);
                    setError("nickname", {
                      type: "duplicate",
                      message: "닉네임 중복 확인이 필요합니다.",
                    });
                  }
                },
              })}
              style={errors.nickname ? { borderColor: "#FF0000" } : {}}
            />
            {nicknameMsg()}
          </label>
          <button
            type="button"
            onClick={() => {
              handleCheckNickname();
            }}
          >
            중복확인
          </button>
        </div>
        {/* password */}
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
                    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&-]).{8,20}$/.test(value) ||
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
        <div className={cx("input-without-button-wrap")}>
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
                    clearErrors("password");
                    return undefined;
                  },
                },
              })}
              style={errors.passwordCheck ? { borderColor: "#FF0000" } : {}}
            />
            {errors.passwordCheck?.message && <span>{errors.passwordCheck.message}</span>}
          </label>
        </div>
        {/* email */}
        <div className={cx("input-with-button-wrap")}>
          <label htmlFor="email">
            <input
              id="email"
              placeholder="이메일을 입력해주세요."
              {...register("email", {
                required: "이메일을 입력해주세요.",
                pattern: {
                  value:
                    /^[0-9a-zA-Z]([-_.]|[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
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
                handleSendEmail();
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
        {shouldAuthorizeEmail && (
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
              onClick={() => {
                handleCheckCertificationNum();
              }}
            >
              확인
            </button>
          </div>
        )}
        <div style={{ marginTop: 24 }}>
          <span style={{ color: "black", fontSize: 14 }}>선택</span>
          <div className={cx("input-with-button-wrap")}>
            <label htmlFor="organizationCode">
              <input
                id="organizationCode"
                placeholder="소속코드를 입력해주세요."
                {...register("organizationCode", {
                  onChange: () => {
                    if (isOrganizationNameSearched) {
                      setOrganizationName("");
                      setIsOrganizationNameSearched(false);
                    }
                  },
                })}
                style={errors.organizationCode ? { borderColor: "#FF0000" } : {}}
              />
              {organizationName && isOrganizationNameSearched && (
                <span className={cx("organization-name-text")}>소속 이름: {organizationName}</span>
              )}
              {errors.organizationCode?.message && <span>{errors.organizationCode.message}</span>}
            </label>
            <button type="button" onClick={organizationNameSearch}>
              조회
            </button>
          </div>
          <div className={cx(["agreement", "al"])}>
            <input
              type="checkbox"
              id="agreement-al"
              {...register("agreementAl", {
                required: "이용약관에 동의해주세요.",
              })}
            />
            <label htmlFor="agreement-al">
              <span>
                본 서비스를 위한{" "}
                <a href="/" onClick={alModalOpen}>
                  이용약관
                </a>
                에 동의합니다.(필수)
              </span>
            </label>
          </div>
          <div className={cx("agreement")}>
            <input
              type="checkbox"
              id="agreement-id"
              {...register("agreementId", {
                required: "개인정보약관에 동의해주세요.",
              })}
            />
            <label htmlFor="agreement-id">
              <span>
                본 서비스를 위한{" "}
                <a href="/" onClick={idModalOpen}>
                  개인정보약관
                </a>
                에 동의합니다.(필수)
              </span>
            </label>
          </div>
        </div>
        <button type="submit" className={cx("register-btn")}>
          회원가입
        </button>
      </form>
      <AgreementModal
        type="al"
        isOpen={isAlModalOpen}
        closeModal={() => setIsAlModalOpen(false)}
        agreementClick={agreementBtnClickHandler}
      />
      <AgreementModal
        type="id"
        isOpen={isIdModalOpen}
        closeModal={() => setIsIdModalOpen(false)}
        agreementClick={agreementBtnClickHandler}
      />
    </>
  );
};

export { SignUpForm };
