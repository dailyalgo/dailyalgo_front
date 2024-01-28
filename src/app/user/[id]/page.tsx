"use client";

import { SideTab } from "@components/MyPage/SideTab";
import { reduxAppSelector } from "src/redux/store";
import { MyPageQuestionList } from "@components/MyPage/MyPageContentForm/MyPageQuestionList";
import { MyPageTop } from "@components/MyPage/MyPageTop";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchUserInfo, requestUserFollow } from "src/api/User";
import { toast } from "react-toastify";
import type { UserInfo } from "src/types/user";

const UserPage = () => {
  const { id: userId } = useParams();
  const { isLogIn, userInfo: myUserInfo } = reduxAppSelector((state) => state.authReducer.value);
  const router = useRouter();

  const userPageTabList = [
    {
      label: "답변",
      id: "answer",
    },
    {
      label: "질문",
      id: "question",
    },
  ];

  const [userInfo, setUserInfo] = useState<UserInfo>({
    id: "",
    name: "",
    nickname: "",
    intro: "",
    email: "",
    created_time: new Date(),
    organizations: [],
    question_cnt: 0,
    answer_cnt: 0,
    view_cnt: 0,
    follower_cnt: 0,
    following_cnt: 0,
    is_following: false,
  });

  const userPageTabContent = userPageTabList.map((tab) => {
    return <MyPageQuestionList key={tab.id} tab={tab} userId={userId} pageType="user" />;
  });

  const clickFollowBtn = async () => {
    if (!isLogIn) {
      toast.warning("로그인이 필요한 서비스입니다.");
      return;
    }
    try {
      await requestUserFollow(userId);

      const newFollowerCnt = userInfo.is_following
        ? userInfo.follower_cnt - 1
        : userInfo.follower_cnt + 1;
      setUserInfo({
        ...userInfo,
        is_following: !userInfo.is_following,
        follower_cnt: newFollowerCnt,
      });
    } catch (e) {
      toast.error("예기치 못한 오류가 발생했습니다. 나중에 다시 시도해 주세요.");
    }
  };

  const getUserInfo = async () => {
    try {
      const res: UserInfo = await fetchUserInfo(userId);
      setUserInfo(res);
    } catch (e) {
      router.replace("/404");
    }
  };

  useEffect(() => {
    const getUserInfoFirstRender = async () => {
      try {
        const res: UserInfo = await fetchUserInfo(userId);
        setUserInfo(res);
      } catch (e) {
        router.replace("/404");
      }
    };

    getUserInfoFirstRender();
  }, [router, userId]);

  useEffect(() => {
    if (isLogIn && myUserInfo.id === userId) {
      router.replace("/mypage");
    }
  }, [myUserInfo, isLogIn, router, userId]);

  return (
    <>
      <MyPageTop
        clickBtnHandler={clickFollowBtn}
        isFollowing={userInfo.is_following}
        pageType="user"
        userInfo={userInfo}
        getUserInfo={getUserInfo}
      />
      <SideTab tabList={userPageTabList.map((tab) => tab.label)} tabContents={userPageTabContent} />
    </>
  );
};

export default UserPage;
