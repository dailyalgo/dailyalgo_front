import classNames from "classnames/bind";
import { useState } from "react";
import { SvgIcon } from "@components/icon/SvgIcon";
import { TimeAgo } from "@components/user/TimeAgo";
import { IconButton } from "@components/button/IconButton";
import Link from "next/link";
import type { QuestionComment } from "src/types/question";
import { CommentInput } from "../CommentInput";
import style from "./CommentItem.module.scss";

const cx = classNames.bind(style);

interface Props {
  comment: QuestionComment;
  handleCommentLike: (commentId: number) => void;
  handleCommentDelete: (commentId: number) => void;
  handleCommentUpdate: (commentId: number, comment: string) => void;
  isAuthor: boolean;
}

const CommentItem = ({
  comment,
  handleCommentLike,
  handleCommentDelete,
  handleCommentUpdate,
  isAuthor,
}: Props) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleUpdateCancle = () => {
    setIsEdit(false);
  };

  const handleCommentUpdateAndClose = (commentId: number, commentContent: string) => {
    handleCommentUpdate(commentId, commentContent);
    setIsEdit(false);
  };

  return (
    <div className={cx("comment-item-wrap")}>
      <div className={cx("comment-item")}>
        <SvgIcon iconName="comment-list-item" size={14} />
      </div>
      {isEdit ? (
        <CommentInput
          defaultValue={comment.content}
          handleUpdateCancle={handleUpdateCancle}
          handleCommentUpdate={handleCommentUpdateAndClose}
          commentId={comment.id}
        />
      ) : (
        <>
          <div className={cx("comment-contents")}>
            <span className={cx("comment-text")}>{comment.content}</span>
            <div className={cx("comment-info")}>
              <Link href={`/user/${comment.user_id}`} className={cx("user-nickname")}>
                {comment.user_nickname}
              </Link>
              님이
              <TimeAgo time={comment.created_time} /> 작성
              <div className={cx("like-btn")}>
                <IconButton
                  icon={<SvgIcon iconName={comment.is_like ? "heart-on" : "heart-off"} size={22} />}
                  title="좋아요"
                  size={24}
                  onClick={() => handleCommentLike(comment.id)}
                />
                <span>{comment.like_cnt}</span>
              </div>
            </div>
          </div>
          {isAuthor && (
            <div className={cx("edit-wrap")}>
              <div onClick={() => setIsEdit(true)}>수정</div>
              <div onClick={() => handleCommentDelete(comment.id)}>삭제</div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export { CommentItem };
