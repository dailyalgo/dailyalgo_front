"use client";

import { reduxAppSelector, AppDispatch } from "src/redux/store";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUserInfo } from "src/api/User";
import { setUserInfo } from "src/redux/slices/auth-slice";
import { MyPageEditForm } from "@components/MyPage/MyPageEditForm";
import { useSearchParams } from "next/navigation";
import { MyPageContentForm } from "@components/MyPage/MyPageContentForm";
import { MyPageTop } from "@components/MyPage/MyPageTop";
import { UserInfo } from "src/types/user";
import { toast } from "react-toastify";

const Page = () => {
  const searchParams = useSearchParams();
  const showNotification = searchParams.get("show-notification") === "true";

  const { userInfo } = reduxAppSelector((state) => state.authReducer.value);
  const dispatch = useDispatch<AppDispatch>();

  const [isEdited, setIsEdited] = useState(false);

  const clickEdit = () => {
    setIsEdited(!isEdited);
  };

  const getUserInfo = async () => {
    try {
      const res: UserInfo = await fetchUserInfo();
      dispatch(setUserInfo(res));
    } catch (e) {
      toast.error("예기치 못한 오류가 발생했습니다. 나중에 다시 시도해 주세요.");
    }
  };

  useEffect(() => {
    const getUserInfoFirstRender = async () => {
      try {
        const res: UserInfo = await fetchUserInfo();
        dispatch(setUserInfo(res));
      } catch (e) {
        toast.error("예기치 못한 오류가 발생했습니다. 나중에 다시 시도해 주세요.");
      }
    };

    getUserInfoFirstRender();
  }, [dispatch]);

  return (
    <>
      <MyPageTop
        isEdited={isEdited}
        clickBtnHandler={clickEdit}
        pageType="mypage"
        userInfo={userInfo}
        getUserInfo={getUserInfo}
      />
      {isEdited ? <MyPageEditForm /> : <MyPageContentForm showNotification={showNotification} />}
    </>
  );
};

export default Page;
