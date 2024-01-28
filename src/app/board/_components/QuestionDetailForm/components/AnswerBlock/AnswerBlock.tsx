import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import type { AnswerDetail } from "src/types/answer";
import { fetchAnswerList, deleteAnswer, requestAnswerLike } from "src/api/Answer";
import { BasicButton } from "@components/button/BasicButton";
import { reduxAppSelector } from "src/redux/store";
import Link from "next/link";
import { toast } from "react-toastify";
import { AnswerItem } from "../AnswerItem";
import style from "./AnswerBlock.module.scss";

const cx = classNames.bind(style);

interface Props {
  questionId: number;
  isLogIn: boolean;
}

const AnswerBlock = ({ questionId, isLogIn }: Props) => {
  const [answerList, setAnswerList] = useState<AnswerDetail[]>([]);

  const { userInfo } = reduxAppSelector((state) => state.authReducer.value);

  const getAnswerList = async () => {
    try {
      const res = await fetchAnswerList(questionId);
      setAnswerList(res);
    } catch (e) {
      setAnswerList([]);
    }
  };

  const onDeleteAnswer = async (answerId: number) => {
    try {
      await deleteAnswer(answerId);
      toast.success("답변이 삭제되었습니다.");
      getAnswerList();
    } catch (e) {
      toast.error("예기치 못한 오류가 발생했습니다. 나중에 다시 시도해 주세요.");
    }
  };

  const onLikeAnswer = async (answerId: number) => {
    if (!isLogIn) {
      toast.warning("로그인 후 이용해주세요.");
      return;
    }

    try {
      await requestAnswerLike(answerId);
      getAnswerList();
    } catch (e) {
      toast.error("예기치 못한 오류가 발생했습니다. 나중에 다시 시도해 주세요.");
    }
  };

  useEffect(() => {
    const getAnswerListFirstRender = async () => {
      try {
        const res = await fetchAnswerList(questionId);
        setAnswerList(res);
      } catch (e) {
        setAnswerList([]);
      }
    };

    getAnswerListFirstRender();
  }, [questionId]);

  return (
    <div className={cx("answer-block-wrap")}>
      <div className={cx("answer-block-top")}>
        <h3>{answerList.length}개의 답변</h3>
        <Link href={`/board/answer/write/${questionId}`}>
          <BasicButton>답변 업로드</BasicButton>
        </Link>
      </div>
      <div>
        {answerList.length > 0 ? (
          <ul className={cx("comment-list-wrap")}>
            {answerList.map((answer) => (
              <li key={`answer-${answer.id}`}>
                <AnswerItem
                  answer={answer}
                  isAuthor={userInfo.id === answer.user_id}
                  onDeleteAnswer={onDeleteAnswer}
                  onLikeAnswer={onLikeAnswer}
                  isLogIn={isLogIn}
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className={cx("none-answer-wrap")}>
            <span>아직 해당 질문에 대한 답변이 없습니다.</span>
          </div>
        )}
      </div>
    </div>
  );
};

export { AnswerBlock };
