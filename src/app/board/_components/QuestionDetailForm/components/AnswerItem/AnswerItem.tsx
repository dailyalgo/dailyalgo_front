import classNames from "classnames/bind";
import type { AnswerDetail } from "src/types/answer";
import { AnswerHeader } from "../AnswerHeader";
import { QuestionContents } from "../QuestionContents";
import { AnswerCommentBlock } from "../CommentBlock";
import style from "./AnswerItem.module.scss";

const cx = classNames.bind(style);

interface Props {
  answer: AnswerDetail;
  isAuthor: boolean;
  onDeleteAnswer: (answerId: number) => void;
  onLikeAnswer: (answerId: number) => void;
  isLogIn: boolean;
}

const AnswerItem = ({ answer, isAuthor, onDeleteAnswer, onLikeAnswer, isLogIn }: Props) => {
  return (
    <div className={cx("answer-item-wrap")}>
      <AnswerHeader
        answer={answer}
        isAuthor={isAuthor}
        onDeleteAnswer={onDeleteAnswer}
        onLikeAnswer={onLikeAnswer}
      />
      <div className={cx("answer-content-wrap")}>
        <div className={cx("content-wrap")}>
          <QuestionContents
            language={answer.language}
            code={answer.code}
            content={answer.content}
          />
        </div>
        <div className={cx("comment-wrap")}>
          <AnswerCommentBlock id={answer.id} isLogIn={isLogIn} />
        </div>
      </div>
    </div>
  );
};

export { AnswerItem };
