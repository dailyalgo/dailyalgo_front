import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import { IconButton } from "@components/button/IconButton";
import { SvgIcon } from "@components/icon/SvgIcon";
import style from "./CommentInput.module.scss";

const cx = classNames.bind(style);

interface Props {
  handleCommentSubmit?: (comment: string) => void;
  commentId?: number;
  defaultValue?: string;
  handleUpdateCancle?: () => void;
  handleCommentUpdate?: (commentId: number, comment: string) => void;
}

const CommentInput = ({
  handleCommentSubmit,
  defaultValue = "",
  handleUpdateCancle,
  commentId,
  handleCommentUpdate,
}: Props) => {
  const [comment, setComment] = useState<string>("");
  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (handleCommentSubmit) handleCommentSubmit(comment);
      if (handleCommentUpdate && commentId) handleCommentUpdate(commentId, comment);

      setComment("");
    }
  };

  const handleSubmitClick = () => {
    if (handleCommentSubmit) handleCommentSubmit(comment);
    if (handleCommentUpdate && commentId) handleCommentUpdate(commentId, comment);

    setComment("");
  };

  useEffect(() => {
    setComment(defaultValue);
  }, [defaultValue]);

  return (
    <div className={cx("comment-input-wrap")}>
      <input
        className={cx("input")}
        onChange={handleCommentChange}
        onKeyUp={handleKeyPress}
        value={comment}
      />
      <IconButton
        icon={<SvgIcon iconName="send" size={24} />}
        title="댓글 남기기"
        onClick={handleSubmitClick}
      />
      {commentId && (
        <IconButton
          title="댓글 수정 취소"
          icon={<SvgIcon iconName="close" size={24} />}
          onClick={handleUpdateCancle}
        />
      )}
    </div>
  );
};

export { CommentInput };
