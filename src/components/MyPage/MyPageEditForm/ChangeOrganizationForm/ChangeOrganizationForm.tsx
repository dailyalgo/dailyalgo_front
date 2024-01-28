"use client";

import classNames from "classnames/bind";
import { SubmitHandler, useForm } from "react-hook-form";
import { reduxAppSelector, AppDispatch } from "src/redux/store";
import { useDispatch } from "react-redux";
import { setUserInfo } from "src/redux/slices/auth-slice";
import { useState } from "react";
import {
  fetchOrganizationSearch,
  requestJoinOrganization,
  requestWithdrawOrganization,
} from "src/api/Organization";
import { Tag } from "@components/icon/Tag";
import { SvgIcon } from "@components/icon/SvgIcon";
import { toast } from "react-toastify";
import style from "./ChangeOrganizationForm.module.scss";

const cx = classNames.bind(style);

type FormValues = {
  organizationCode: string;
  organizationName: string;
};

const ChangeOrganizationForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
    resetField,
  } = useForm<FormValues>({ mode: "onChange" });

  // NCN.ji

  const { userInfo } = reduxAppSelector((state) => state.authReducer.value);
  const dispatch = useDispatch<AppDispatch>();

  const [isJoinComplete, setIsJoinComplete] = useState(false);
  const [isWithdrawComplete, setIsWithdrawComplete] = useState(false);
  const [searchedOragnizationName, setSearchedOragnizationName] = useState<string>("");
  const [searchedOrganizationCode, setSearchedOrganizationCode] = useState<string>("");

  const onValid: SubmitHandler<FormValues> = async (data) => {
    try {
      const res = await fetchOrganizationSearch(data.organizationCode);
      setSearchedOragnizationName(res);
      setSearchedOrganizationCode(data.organizationCode);
    } catch (e) {
      setError("organizationCode", {
        type: "wrongOrganizationCode",
        message: "존재하지 않는 소속코드입니다.",
      });
    }
  };

  const joinOranization = async () => {
    try {
      await requestJoinOrganization(searchedOrganizationCode);
      resetField("organizationCode");
      setIsJoinComplete(true);
      setTimeout(() => {
        setIsJoinComplete(false);
      }, 1500);

      const organizationItem = {
        name: searchedOragnizationName,
        code: searchedOrganizationCode,
      };

      const newOrganization = [...userInfo.organizations, organizationItem];
      dispatch(setUserInfo({ organizations: newOrganization }));
    } catch (e) {
      setError("organizationName", {
        type: "wrongOrganizationName",
        message: "이미 소속에 가입되어있습니다.",
      });
    }
  };

  const withdrawOrganization = async (code: string, idx: number) => {
    try {
      await requestWithdrawOrganization(code);
      const newOrganization = userInfo.organizations.filter((_, i) => i !== idx);
      dispatch(setUserInfo({ organizations: newOrganization }));
      setIsWithdrawComplete(true);
      setTimeout(() => {
        setIsWithdrawComplete(false);
      }, 1500);
    } catch (e) {
      toast.error("예기치 못한 오류가 발생했습니다. 나중에 다시 시도해 주세요.");
    }
  };

  return (
    <div className={cx("form-wrap")}>
      <h1>소속 변경</h1>
      <form onSubmit={handleSubmit(onValid)} className={cx("organigation-search-wrap")}>
        <div className={cx("organigation-code-wrap")}>
          <label htmlFor="organizationCode">
            <input
              id="organizationCode"
              type="text"
              placeholder="소속코드를 입력해주세요."
              {...register("organizationCode", { required: "소속코드를 입력해주세요" })}
              style={errors.organizationCode && { borderColor: "red" }}
            />
            {errors.organizationCode?.message && (
              <span className={cx("form-msg")}>{errors.organizationCode.message}</span>
            )}
          </label>
          <button type="submit">조회</button>
        </div>
        <div className={cx("organigation-result-wrap")}>
          <label htmlFor="organizationName">
            <input
              id="organizationName"
              type="text"
              placeholder="소속코드를 조회해주세요"
              readOnly
              value={searchedOragnizationName}
              {...register("organizationName")}
              style={errors.organizationName && { borderColor: "red" }}
            />
            {errors.organizationName?.message && (
              <span className={cx("form-msg")}>{errors.organizationName.message}</span>
            )}
            <button type="button" onClick={joinOranization}>
              추가하기
            </button>
          </label>
        </div>
      </form>
      <div className={cx("organization-list-wrap")}>
        <h2>가입 중인 소속</h2>
        <div className={cx("organization-list")}>
          {userInfo.organizations.length > 0 &&
            userInfo.organizations.map((organization, idx) => (
              <div className={cx("tag-wrap")}>
                <Tag label={organization.name} key={`tag-${organization.name}`} />
                <button
                  type="button"
                  className={cx("tag-delete-btn")}
                  onClick={() => withdrawOrganization(organization.code, idx)}
                >
                  <SvgIcon iconName="close" size={14} />
                </button>
              </div>
            ))}
        </div>
      </div>
      {isJoinComplete && (
        <button type="button" className={cx("background")} onClick={() => setIsJoinComplete(false)}>
          <div className={cx("success-alarm")}>
            {searchedOragnizationName}에 가입이 완료되었습니다.
          </div>
        </button>
      )}
      {isWithdrawComplete && (
        <button
          type="button"
          className={cx("background")}
          onClick={() => setIsWithdrawComplete(false)}
        >
          <div className={cx("success-alarm")}>소속에서 탈퇴되었습니다.</div>
        </button>
      )}
    </div>
  );
};

export { ChangeOrganizationForm };
