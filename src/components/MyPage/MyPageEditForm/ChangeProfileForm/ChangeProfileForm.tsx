import { reduxAppSelector, AppDispatch } from "src/redux/store";
import { useDispatch } from "react-redux";
import { setUserInfo } from "src/redux/slices/auth-slice";
import classNames from "classnames/bind";
import { BasicButton } from "@components/button/BasicButton";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { fetchCheckNickname, requestUpdateUser } from "src/api/User";
// import { DeleteUserModal } from "../DeleteUserModal";
import style from "./ChangeProfileForm.module.scss";

const cx = classNames.bind(style);

type FormValues = {
  nickname: string;
  intro?: string;
};

const ChangeProfileForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
    trigger,
    setError,
    clearErrors,
  } = useForm<FormValues>({ mode: "onChange" });

  const { userInfo } = reduxAppSelector((state) => state.authReducer.value);
  const dispatch = useDispatch<AppDispatch>();

  const [nicknameDuplicationCheck, setNicknameDuplicationCheck] = useState(true);
  // const [isDeleteUserModalOpen, setIsDeleteUserModalOpen] = useState(false);

  const onValid: SubmitHandler<FormValues> = async (data) => {
    if (!nicknameDuplicationCheck) {
      setError("nickname", { type: "duplicate", message: "중복 확인이 필요합니다." });
    } else {
      try {
        await requestUpdateUser(data);
        dispatch(setUserInfo(data));
        toast.success("프로필이 수정되었습니다.");
      } catch (e) {
        toast.error("예기치 못한 오류가 발생했습니다. 나중에 다시 시도해 주세요.");
      }
    }
  };

  const handleCheckNickname = async () => {
    const isValid = await trigger("nickname");
    if (!isValid) return;

    const nickname = getValues("nickname");
    const res = await fetchCheckNickname(nickname);

    if (res) {
      setNicknameDuplicationCheck(true);
    } else {
      setNicknameDuplicationCheck(false);
      setError("nickname", { type: "duplicate", message: "이미 사용중인 닉네임입니다." });
    }
  };

  const nicknameMsg = () => {
    const nickname = getValues("nickname");
    if (errors.nickname && nickname === "") return <span>{errors.nickname?.message}</span>;
    if (nickname !== undefined && nickname !== "") {
      if (nickname === "") return <span>{errors.nickname?.message}</span>;
      if (errors.nickname) return <span>{errors?.nickname.message}</span>;
      if (nicknameDuplicationCheck) {
        if (userInfo?.nickname === nickname) return null;
        return <span className={cx("success")}>사용가능한 닉네임입니다.</span>;
      }
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

  // const openDeleteUserModal = () => {
  //   setIsDeleteUserModalOpen(true);
  // };

  // const closeDeleteUserModal = () => {
  //   setIsDeleteUserModalOpen(false);
  // };

  return (
    <>
      <form onSubmit={handleSubmit(onValid)} className={cx("change-profile-form-wrap")}>
        <div className={cx("form-header")}>
          <span>프로필 수정</span>
        </div>
        <div className={cx("form-body")}>
          <div className={cx("form-items-wrap")}>
            {/* id */}
            <div className={cx("form-item")}>
              <p>아이디</p>
              <div className={cx("input-without-button-wrap")}>
                <label htmlFor="id">
                  <input id="id" value={userInfo?.id} disabled />
                </label>
              </div>
            </div>
            {/* email */}
            <div className={cx("form-item")}>
              <p>이메일</p>
              <div className={cx("input-without-button-wrap")}>
                <label htmlFor="email">
                  <input id="email" value={userInfo?.email} disabled />
                </label>
              </div>
            </div>
          </div>
          <div className={cx("form-items-wrap")}>
            <div className={cx("form-body-header")}>
              <span>내 정보</span>
            </div>
            {/* nickname */}
            <div className={cx("form-item")}>
              <p>닉네임</p>
              <div className={cx("input-with-button-wrap")}>
                <label htmlFor="nickname">
                  <input
                    id="nickname"
                    {...register("nickname", {
                      required: "닉네임을 입력해주세요.",
                      pattern: {
                        value: /^[가-힣a-zA-Z0-9]{4,12}$/,
                        message:
                          "닉네임은 영문 대소문자, 숫자, 또는 한글로 구성되어야 하며, 길이는 2자에서 10자 사이여야 합니다.",
                      },
                      onChange: () => {
                        if (userInfo?.nickname === getValues("nickname")) {
                          clearErrors("nickname");
                          setNicknameDuplicationCheck(true);
                          return;
                        }
                        setNicknameDuplicationCheck(false);
                        setError("nickname", {
                          type: "duplicate",
                          message: "닉네임 중복 확인이 필요합니다.",
                        });
                      },
                    })}
                    defaultValue={userInfo?.nickname}
                    style={errors.nickname ? { borderColor: "#ff0000" } : {}}
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
            </div>
            {/* intro */}
            <div className={cx("form-item")}>
              <p>소개 한마디</p>
              <div className={cx("input-without-button-wrap")}>
                <label htmlFor="intro">
                  <input id="intro" {...register("intro")} defaultValue={userInfo?.intro} />
                </label>
              </div>
            </div>
          </div>
        </div>
        <BasicButton type="submit">수정완료</BasicButton>
        {/* <div className={cx("delete-user-btn")} onClick={openDeleteUserModal}>
          회원탈퇴하기
        </div> */}
      </form>
      {/* <DeleteUserModal isOpen={isDeleteUserModalOpen} closeModal={closeDeleteUserModal} /> */}
    </>
  );
};

export { ChangeProfileForm };
