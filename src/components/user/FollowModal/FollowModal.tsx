import classNames from "classnames/bind";
import { useState, useEffect } from "react";
import { BasicModal } from "@components/modal/BasicModal";
import { fetchUserFollower, fetchUserFollowing } from "src/api/User";
import type { UserFollow } from "src/types/user";
import { toast } from "react-toastify";
import { FollowItem } from "./FollowItem";
import style from "./FollowModal.module.scss";

const cx = classNames.bind(style);

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  type: "follower" | "following";
  userId: string;
  getUserInfo: () => void;
}

const FollowModal = ({ isOpen, closeModal, type, userId, getUserInfo }: Props) => {
  const [followList, setFollowList] = useState<UserFollow[]>([]);

  useEffect(() => {
    const setFollowerList = async () => {
      try {
        const res = await fetchUserFollower(userId);
        setFollowList(res);
      } catch (e) {
        toast.error("예기치 못한 오류가 발생했습니다. 나중에 다시 시도해 주세요.");
      }
    };

    const setFollowingList = async () => {
      try {
        const res = await fetchUserFollowing(userId);
        setFollowList(res);
      } catch (e) {
        toast.error("예기치 못한 오류가 발생했습니다. 나중에 다시 시도해 주세요.");
      }
    };

    if (!userId) return;
    if (type === "follower") {
      setFollowerList();
    } else {
      setFollowingList();
    }
  }, [userId, isOpen, type, setFollowList]);

  return (
    <BasicModal isOpen={isOpen} closeModal={closeModal}>
      <div className={cx("follow-list-wrap")}>
        <strong className={cx("follow-list-title")}>
          {type === "follower" ? "팔로워" : "팔로잉"}
        </strong>
        <ul className={cx("follow-list")}>
          {followList.map((followItem) => (
            <FollowItem key={followItem.id} followItem={followItem} getUserInfo={getUserInfo} />
          ))}
        </ul>
      </div>
    </BasicModal>
  );
};

export { FollowModal };
