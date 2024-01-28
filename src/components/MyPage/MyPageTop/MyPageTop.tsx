import { useState } from "react";
import classNames from "classnames/bind";
import { ProfileBadge } from "@components/user/ProfileBadge";
import { BasicButton } from "@components/button/BasicButton";
import { FollowModal } from "@components/user/FollowModal";
import type { UserInfo } from "src/types/user";
import style from "./MyPageTop.module.scss";

const cx = classNames.bind(style);

interface Props {
  clickBtnHandler: () => void;
  isEdited?: boolean;
  isFollowing?: boolean;
  pageType: "user" | "mypage";
  userInfo: UserInfo;
  getUserInfo: () => void;
}
const MyPageTop = ({
  clickBtnHandler,
  isEdited,
  isFollowing = false,
  pageType,
  userInfo,
  getUserInfo,
}: Props) => {
  const [isFollowerModalOpen, setIsFollowerModalOpen] = useState(false);
  const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false);

  const openFollowModal = (type: "follower" | "following") => {
    if (type === "follower") {
      if (userInfo.follower_cnt === 0) return;
      setIsFollowerModalOpen(true);
    } else {
      if (userInfo.following_cnt === 0) return;
      setIsFollowingModalOpen(true);
    }
  };

  const closeFollowModal = (type: "follower" | "following") => {
    if (type === "follower") {
      setIsFollowerModalOpen(false);
    } else {
      setIsFollowingModalOpen(false);
    }
  };

  const btnContent = () => {
    switch (pageType) {
      case "user":
        return isFollowing ? (
          <BasicButton size="sm" buttonType="secondary" onClick={clickBtnHandler}>
            취소
          </BasicButton>
        ) : (
          <BasicButton size="sm" buttonType="primary" onClick={clickBtnHandler}>
            팔로우
          </BasicButton>
        );
      case "mypage":
        return (
          <BasicButton buttonType="third" onClick={clickBtnHandler}>
            {isEdited ? "돌아가기" : "프로필 수정"}
          </BasicButton>
        );
      default:
        return null;
    }
  };

  const getElapsedTimeByCreatedDate = () => {
    const today = new Date();
    const startDate = new Date(userInfo.created_time);

    const timeDiff = today.getTime() - startDate.getTime();
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return diffDays;
  };

  return (
    <>
      <div className={cx("my-page-top-wrap")}>
        <div className={cx("my-page-top-inner")}>
          <div className={cx("user-wrap")}>
            <ProfileBadge size={168} />
            <div className={cx("info-wrap")}>
              <span className={cx("nickname")}>{userInfo.nickname}</span>
              {userInfo.intro && <span className={cx("introduce")}>{userInfo.intro}</span>}
              <ul className={cx("organization-list")}>
                {userInfo.organizations.map((organization) => (
                  <li className={cx("organization-item")} key={organization.name}>
                    @{organization.name}
                  </li>
                ))}
              </ul>
              <div className={cx("figure-info-wrap")}>
                <div>
                  <dt>가입일로부터</dt>
                  <dd>{getElapsedTimeByCreatedDate()} 일</dd>
                </div>
                <div>
                  <dt>질문수</dt>
                  <dd>{userInfo.question_cnt} 개</dd>
                </div>
                <div>
                  <dt>답변수</dt>
                  <dd>{userInfo.answer_cnt} 개</dd>
                </div>
                <div>
                  <dt>조회수</dt>
                  <dd>{userInfo.view_cnt} 개</dd>
                </div>
              </div>
              {/* TODO: 클릭 시 팝업 */}
              <div className={cx("social-wrap")}>
                <div
                  className={cx("social-item", { disabled: userInfo.follower_cnt === 0 })}
                  onClick={() => openFollowModal("follower")}
                >
                  <span className={cx("social-item-title")}>팔로워</span>
                  <span className={cx("social-item-count")}>{userInfo.follower_cnt}</span>
                </div>
                <div
                  className={cx("social-item", { disabled: userInfo.following_cnt === 0 })}
                  onClick={() => openFollowModal("following")}
                >
                  <span className={cx("social-item-title")}>팔로잉</span>
                  <span className={cx("social-item-count")}>{userInfo.following_cnt}</span>
                </div>
              </div>
            </div>
          </div>
          <div className={cx("edit-button")}>{btnContent()}</div>
        </div>
      </div>
      <FollowModal
        isOpen={isFollowerModalOpen}
        closeModal={() => closeFollowModal("follower")}
        type="follower"
        userId={userInfo.id}
        getUserInfo={getUserInfo}
      />
      <FollowModal
        isOpen={isFollowingModalOpen}
        closeModal={() => closeFollowModal("following")}
        type="following"
        userId={userInfo.id}
        getUserInfo={getUserInfo}
      />
    </>
  );
};

export { MyPageTop };
