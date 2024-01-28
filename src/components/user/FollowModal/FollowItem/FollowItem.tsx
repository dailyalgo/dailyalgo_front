import { useState } from "react";
import { reduxAppSelector } from "src/redux/store";
import classNames from "classnames/bind";
import { ProfileBadge } from "@components/user/ProfileBadge";
import { BasicButton } from "@components/button/BasicButton";
import { useRouter } from "next/navigation";
import type { UserFollow } from "src/types/user";
import { requestUserFollow } from "src/api/User";
import { toast } from "react-toastify";
import style from "./FollowItem.module.scss";

const cx = classNames.bind(style);

interface Props {
  followItem: UserFollow;
  getUserInfo: () => void;
}

const FollowItem = ({ followItem, getUserInfo }: Props) => {
  const router = useRouter();

  const [isFollowed, setIsFollowed] = useState(followItem.is_following);
  const { isLogIn, userInfo } = reduxAppSelector((state) => state.authReducer.value);

  const handleFollowItemClick = () => {
    router.push(`/user/${followItem.id}`);
  };

  const handleFollowBtnClick = async () => {
    if (!isLogIn) {
      toast.warning("로그인이 필요한 서비스입니다.");
      return;
    }

    try {
      await requestUserFollow(followItem.id);
      setIsFollowed(Math.abs(isFollowed - 1));
      getUserInfo();
    } catch (e) {
      toast.error("예기치 못한 오류가 발생했습니다. 나중에 다시 시도해 주세요.");
    }
  };

  const followBtn = () => {
    if (isLogIn && followItem.id === userInfo.id) return null;
    if (isFollowed) {
      return (
        <BasicButton size="sm" buttonType="secondary" onClick={handleFollowBtnClick}>
          취소
        </BasicButton>
      );
    }
    return (
      <BasicButton size="sm" onClick={handleFollowBtnClick}>
        팔로우
      </BasicButton>
    );
  };

  return (
    <li className={cx("follow-item-wrap")}>
      <div className={cx("left")} onClick={handleFollowItemClick}>
        <ProfileBadge size={48} />
        <div className={cx("user-info")}>
          <span className={cx("name")}>{followItem.nickname}</span>
          {followItem.intro && <span className={cx("introduce")}>{followItem.intro}</span>}
        </div>
      </div>
      {followBtn()}
    </li>
  );
};

export { FollowItem };
