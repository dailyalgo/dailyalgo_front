"use client";

import classNames from "classnames/bind";
import { fetchQuestionDetail, requestScrapQuestion, requestLikeQuestion } from "src/api/Question";
import { reduxAppSelector } from "src/redux/store";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import type { QuestionDetail } from "src/types/question";
import { useRouter } from "next/navigation";
import { QuestionHeader } from "./components/QeustionHeader";
import { QuestionContents } from "./components/QuestionContents";
import { QuestionCoreInfoBox } from "./components/QuestionCoreInfoBox";
import { CommentBlock } from "./components/CommentBlock";
import { AnswerBlock } from "./components/AnswerBlock";
import style from "./QuestionDetailForm.module.scss";

const cx = classNames.bind(style);

const defaultQuestion: QuestionDetail = {
  id: 0,
  title: "",
  user_id: "",
  user_nickname: "",
  source: "",
  link: "",
  type: "",
  content: "",
  language: "",
  code: "",
  created_time: new Date(),
  modified_time: new Date(),
  view_cnt: 0,
  like_cnt: 0,
  answer_cnt: 0,
  comment_cnt: 0,
  tags: [],
  is_scrap: 0,
  is_like: 0,
};

const QuestionDetailForm = ({ id }: { id: number }) => {
  const router = useRouter();

  const { isLogIn } = reduxAppSelector((state) => state.authReducer.value);

  const [question, setQuestion] = useState<QuestionDetail>(defaultQuestion);

  useEffect(() => {
    const getQuestionDetail = async () => {
      try {
        const res = await fetchQuestionDetail(id);
        setQuestion(res);
      } catch (e) {
        router.replace("/404");
      }
    };

    getQuestionDetail();
  }, [id, router]);

  const clickScrapHandler = async () => {
    if (!isLogIn) {
      toast.warning("로그인이 필요한 서비스입니다.");
      return;
    }

    try {
      await requestScrapQuestion(question.id);
      setQuestion({
        ...question,
        is_scrap: Math.abs(question.is_scrap - 1),
      });
    } catch (e) {
      toast.error("예기치 못한 오류가 발생했습니다. 나중에 다시 시도해 주세요.");
    }
  };

  const clickLikeHandler = async () => {
    if (!isLogIn) {
      toast.warning("로그인이 필요한 서비스입니다.");
      return;
    }

    try {
      await requestLikeQuestion(question.id);
      setQuestion({
        ...question,
        is_like: Math.abs(question.is_like - 1),
        like_cnt: question.is_like ? question.like_cnt - 1 : question.like_cnt + 1,
      });
    } catch (e) {
      toast.error("예기치 못한 오류가 발생했습니다. 나중에 다시 시도해 주세요.");
    }
  };

  return (
    <div className={cx("question-detail-wrap")}>
      <div className={cx("question-content-wrap")}>
        <QuestionHeader
          question={question}
          onClickScrap={clickScrapHandler}
          onClickLike={clickLikeHandler}
        />
        <QuestionContents
          language={question.language}
          code={question.code}
          content={question.content}
        />
        <CommentBlock id={question.id} isLogIn={isLogIn} />
        <AnswerBlock questionId={question.id} isLogIn={isLogIn} />
      </div>
      <QuestionCoreInfoBox question={question} />
    </div>
  );
};

export { QuestionDetailForm };
