import { useState, useEffect } from "react";
import classNames from "classnames/bind";

import type { QuestionComment } from "src/types/question";
import {
  requestPostComment,
  fetchCommentList,
  requestLikeComment,
  deleteComment,
  requestUpdateComment,
} from "src/api/Question";
import { reduxAppSelector } from "src/redux/store";
import { toast } from "react-toastify";
import { CommentInput } from "../CommentInput";
import { CommentItem } from "../CommentItem";

import style from "./CommentBlock.module.scss";

const cx = classNames.bind(style);

interface Props {
  id: number;
  isLogIn: boolean;
}

const CommentBlock = ({ id, isLogIn }: Props) => {
  const [commentList, setCommentList] = useState<QuestionComment[]>([]);
  const [commentCnt, setCommentCnt] = useState<number>(0);
  const { userInfo } = reduxAppSelector((state) => state.authReducer.value);

  const getCommentList = async () => {
    try {
      const res = await fetchCommentList(id);
      setCommentList(res);
      setCommentCnt(res.length);
    } catch (e) {
      setCommentList([]);
      setCommentCnt(0);
    }
  };

  const handleCommentSubmit = async (comment: string) => {
    if (!isLogIn) {
      toast.warning("로그인이 필요한 서비스입니다.");
      return;
    }

    if (!comment) {
      toast.warning("댓글을 입력해주세요.");
      return;
    }

    try {
      await requestPostComment(id, comment);
      getCommentList();
    } catch (e) {
      toast.error("예기치 못한 오류가 발생했습니다. 나중에 다시 시도해 주세요.");
    }
  };

  const handleCommentLike = async (commentId: number) => {
    if (!isLogIn) {
      toast.warning("로그인이 필요한 서비스입니다.");
      return;
    }

    try {
      await requestLikeComment(commentId);
      getCommentList();
    } catch (e) {
      toast.error("예기치 못한 오류가 발생했습니다. 나중에 다시 시도해 주세요.");
    }
  };

  const handleCommentDelete = async (commentId: number) => {
    try {
      await deleteComment(commentId);
      getCommentList();
    } catch (e) {
      toast.error("예기치 못한 오류가 발생했습니다. 나중에 다시 시도해 주세요.");
    }
  };

  const handleCommentUpdate = async (commentId: number, content: string) => {
    try {
      await requestUpdateComment(commentId, content);
      getCommentList();
    } catch (e) {
      toast.error("예기치 못한 오류가 발생했습니다. 나중에 다시 시도해 주세요.");
    }
  };

  useEffect(() => {
    if (id) {
      const getCommentListFirstRender = async () => {
        try {
          const res = await fetchCommentList(id);
          setCommentList(res);
          setCommentCnt(res.length);
        } catch (e) {
          setCommentList([]);
          setCommentCnt(0);
        }
      };

      getCommentListFirstRender();
    }
  }, [id]);

  return (
    <div className={cx("comment-block-wrap")}>
      <strong className={cx("comment-count-wrap")}>
        <span className={cx("comment-count")}>{commentCnt}개</span>의 댓글
      </strong>
      <CommentInput handleCommentSubmit={handleCommentSubmit} />
      {commentCnt ? (
        <ul className={cx("comment-list-wrap")}>
          {commentList.map((comment) => (
            <li key={`comment-${comment.id}`}>
              <CommentItem
                comment={comment}
                handleCommentLike={handleCommentLike}
                handleCommentDelete={handleCommentDelete}
                handleCommentUpdate={handleCommentUpdate}
                isAuthor={userInfo.id === comment.user_id}
              />
            </li>
          ))}
        </ul>
      ) : (
        <div className={cx("none-comment-wrap")}>
          <span>아직 해당 질문에 대한 댓글이 없습니다.</span>
        </div>
      )}
    </div>
  );
};

export { CommentBlock };
