// import { useState, useEffect } from "react";
import classNames from "classnames/bind";

import { IconButton } from "@components/button/IconButton";
import { SvgIcon } from "@components/icon/SvgIcon";
import { reduxAppSelector } from "src/redux/store";
import { UserProfileThumbnail } from "@components/user/UserProfileThumbnail";
import type { QuestionDetail } from "src/types/question";
import Link from "next/link";
import { TimeAgo } from "@components/user/TimeAgo";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { deleteQuestion } from "src/api/Question";

import style from "./QuestionHeader.module.scss";

const cx = classNames.bind(style);

interface Props {
  question: QuestionDetail;
  onClickScrap: () => void;
  onClickLike: () => void;
}

const QuestionHeader = ({ question, onClickScrap, onClickLike }: Props) => {
  const router = useRouter();

  const { userInfo } = reduxAppSelector((state) => state.authReducer.value);

  const countInfoArray = [
    {
      iconName: "eye",
      count: question.view_cnt,
    },
    {
      iconName: "like-off",
      count: question.like_cnt,
    },
    {
      iconName: "chat",
      count: question.comment_cnt,
    },
  ];

  const handleQuestionDelete = async () => {
    try {
      await deleteQuestion(question.id);
      toast.success("질문이 삭제되었습니다.");
      router.push("/");
    } catch (e) {
      toast.error("예기치 못한 오류가 발생했습니다. 나중에 다시 시도해 주세요.");
    }
  };
  return (
    <div className={cx("question-header")}>
      <div className={cx("title-wrap")}>
        <h2 className={cx("question-title")}>{question.title}</h2>
        {/* TODO: 별 아이콘 맞는지 확인, 클릭 시 on/off toggle 기능 추가 */}
        <div className={cx("action-icon-wrap")}>
          <IconButton
            icon={<SvgIcon iconName={question.is_like ? "like-on" : "like-off"} size={24} />}
            title="좋아요"
            size={24}
            onClick={onClickLike}
          />
          <IconButton
            icon={
              <SvgIcon iconName={question.is_scrap ? "solid-tag-on" : "solid-tag-off"} size={24} />
            }
            title="북마크"
            onClick={onClickScrap}
          />
        </div>
      </div>
      <div className={cx("header-info-wrap")}>
        <div className={cx("user-info-wrap")}>
          <Link href={`/user/${question.user_id}`} className={cx("author")}>
            {/* TODO: 프로필 썸네일 크기 props? */}
            <UserProfileThumbnail userName={question.user_nickname} />
            {/* TODO: n 분전 등 시간 지남 기능 */}
          </Link>
          님이 <TimeAgo time={question.created_time} /> 작성
          {userInfo?.id === question.user_id && (
            <div className={cx("edit-wrap")}>
              <Link href={`/board/update/${question.id}`} className={cx("edit-btn")}>
                수정
              </Link>
              <div onClick={handleQuestionDelete} className={cx("edit-btn")}>
                삭제
              </div>
            </div>
          )}
        </div>
        {/* TODO: 공통 컴포넌트로 교체 */}
        <div className={cx("count-info-wrap")}>
          {countInfoArray.map((countInfo) => (
            <div key={countInfo.iconName} className={cx("count-item-wrap")}>
              <SvgIcon iconName={countInfo.iconName as any} size={20} />
              <span className={cx("count")}>{countInfo.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { QuestionHeader };
