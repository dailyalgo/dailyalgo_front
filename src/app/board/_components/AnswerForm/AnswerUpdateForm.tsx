"use client";

import classNames from "classnames/bind";

import { Controller, FieldErrors, SubmitHandler, useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BasicInput } from "@components/input/BasicInput";
import { CodeEditor } from "@components/article/CodeEditor";
import { CommonDropdown } from "@components/dropdown/CommonDropdown";
import { BasicButton } from "@components/button/BasicButton";
import type { QuestionDetail } from "src/types/question";
import type { AnswerDetail } from "src/types/answer";
import { toast } from "react-toastify";
import { fetchQuestionDetail } from "src/api/Question";
import { updateAnswer, fetchAnswerDetail } from "src/api/Answer";
import { QuestionCoreInfoBox } from "../QuestionDetailForm/components/QuestionCoreInfoBox";
import { AnswerQuestionContent } from "./AnswerQuestionContent";
import { AnswerTagInputForm } from "./AnswerTagInputForm";

import style from "./AnswerForm.module.scss";

const cx = classNames.bind(style);

interface Props {
  answerId: number;
  questionId: number;
}

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

const AnswerUpdateForm = ({ questionId, answerId }: Props) => {
  const router = useRouter();

  const [question, setQuestion] = useState<QuestionDetail>(defaultQuestion);
  const [answer, setAnswer] = useState<AnswerDetail>();
  const [language, setLanguage] = useState("python");
  const [tagList, setTagList] = useState<string[]>([]);

  type FormValues = {
    title: string;
    code: string;
    content: string;
  };

  const { register, handleSubmit, control, setValue } = useForm<FormValues>();

  const languageList = [
    { id: "python", label: "Python" },
    { id: "java", label: "Java" },
    { id: "cpp", label: "C++" },
    { id: "c", label: "C" },
    { id: "javascript", label: "JavaScript" },
    { id: "csharp", label: "C#" },
  ];

  const handleTagAdd = (tag: string) => {
    if (tagList.includes(tag)) {
      const newTagList = tagList.filter((item) => item !== tag);
      setTagList(newTagList);
    } else {
      if (tagList.length >= 5) return;

      setTagList([...tagList, tag]);
    }
  };

  const changeLanguage = (value: string) => {
    setLanguage(value);
  };

  const onValid: SubmitHandler<FormValues> = async (data) => {
    if (!data.title || !data.content) {
      toast.warning("제목, 내용은 필수 입력사항입니다.");
      return;
    }

    const requestBody = { ...data, tags: tagList, language };

    try {
      await updateAnswer(answerId, requestBody);
      router.push(`/board/detail/${questionId}`);
    } catch (e) {
      toast.error("예기치 못한 오류가 발생했습니다. 나중에 다시 시도해 주세요.");
    }
  };

  const onInValid = async (err: FieldErrors) => {
    console.log(err);
  };

  useEffect(() => {
    const getQuestionDetail = async () => {
      try {
        const res = await fetchQuestionDetail(questionId);
        setQuestion(res);
      } catch (e) {
        toast.error("예기치 못한 오류가 발생했습니다. 나중에 다시 시도해 주세요.");
      }
    };

    const getAnswerDetail = async () => {
      try {
        const res = await fetchAnswerDetail(answerId);
        setAnswer(res);
        setLanguage(res.language);
        setTagList(res.tags.map((tag) => tag.name));
        setValue("title", res.title);
        setValue("content", res.content);
        setValue("code", res.code);
      } catch (e) {
        toast.error("예기치 못한 오류가 발생했습니다. 나중에 다시 시도해 주세요.");
      }
    };

    getQuestionDetail();
    getAnswerDetail();
  }, [questionId, answerId, setValue]);

  return (
    <div className={cx("answer-form-wrap")}>
      <div className={cx("left")}>
        <QuestionCoreInfoBox question={question} />
      </div>
      <div className={cx("right")}>
        <AnswerQuestionContent question={question} />
        <h2 className={cx("title")}>답변하기</h2>
        {answer && (
          <>
            <div className={cx("input-wrap")}>
              <h3 className={cx("title-name")}>답변 제목</h3>
              <BasicInput
                id="title"
                size="md"
                placeholder="질문 제목을 입력해 주세요"
                {...register("title")}
              />
            </div>
            <AnswerTagInputForm handleTagAdd={handleTagAdd} tagList={tagList} />
            <div className={cx("input-wrap")}>
              <div className={cx("title-wrap")}>
                <h3 className={cx("sub-title")}>답변 내용</h3>
                <CommonDropdown
                  options={languageList}
                  initialValue={language}
                  changeHandler={changeLanguage}
                  size="sm"
                />
              </div>
              <div className={cx("code-editor-wrap")}>
                <Controller
                  name="code"
                  control={control}
                  render={({ field }) => (
                    <CodeEditor
                      language={language}
                      handleChange={field.onChange}
                      defaultValue={answer.code}
                    />
                  )}
                />
              </div>
            </div>
            <div className={cx("input-wrap")}>
              <div className={cx("markdown-wrap")}>
                {/* TODO: 마크다운 에디터 삽입 */}
                {/* <MarkDownEditor /> */}
                <textarea
                  className={cx("question-contents")}
                  id="qc"
                  cols={30}
                  rows={10}
                  {...register("content")}
                />
              </div>
            </div>
          </>
        )}

        {/* TODO: submit 로직 */}
        <BasicButton size="lg" onClick={handleSubmit(onValid, onInValid)}>
          수정하기
        </BasicButton>
      </div>
    </div>
  );
};

export { AnswerUpdateForm };
