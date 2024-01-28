"use client";

import { useState } from "react";
import classNames from "classnames/bind";
import { Controller, FieldErrors, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { BasicInput } from "@components/input/BasicInput";
import { CodeEditor } from "@components/article/CodeEditor";
import { CommonDropdown } from "@components/dropdown/CommonDropdown";
import { BasicButton } from "@components/button/BasicButton";
import { requestPostQuestion } from "src/api/Question";
import { toast } from "react-toastify";
import { QuestionInfoBox } from "../QuestionInfoBox";
import { NotedBox } from "../NotedBox";

import style from "./ArticleForm.module.scss";

const cx = classNames.bind(style);

const ArticleForm = () => {
  const router = useRouter();

  const [language, setLanguage] = useState("python");
  const [tagList, setTagList] = useState<string[]>([]);

  type FormValues = {
    title: string;
    code: string;
    content: string;
    source: string;
    link: string;
    type: string;
  };

  const { register, handleSubmit, control } = useForm<FormValues>();

  const languageList = [
    { id: "python", label: "Python" },
    { id: "java", label: "Java" },
    { id: "cpp", label: "C++" },
    { id: "c", label: "C" },
    { id: "javascript", label: "JavaScript" },
    { id: "csharp", label: "C#" },
  ];

  const onValid: SubmitHandler<FormValues> = async (data) => {
    if (!data.title || !data.content || !data.source || !data.type) {
      toast.warning("출처, 질문 유형, 제목, 내용은 필수 입력사항입니다.");
      return;
    }

    const requestBody = { ...data, tags: tagList, language };

    try {
      const res = await requestPostQuestion(requestBody);
      router.push(`/board/detail/${res.question_id}`);
    } catch (e) {
      toast.error("예기치 못한 오류가 발생했습니다. 나중에 다시 시도해 주세요.");
    }
  };

  const onInValid = async (err: FieldErrors) => {
    console.log(err);
  };

  const changeLanguage = (value: string) => {
    setLanguage(value);
  };

  const handleTagAdd = (tag: string) => {
    if (tagList.includes(tag)) {
      const newTagList = tagList.filter((item) => item !== tag);
      setTagList(newTagList);
    } else {
      if (tagList.length >= 5) return;

      setTagList([...tagList, tag]);
    }
  };

  return (
    <div className={cx("article-form-wrap")}>
      <div className={cx("left")}>
        <QuestionInfoBox
          register={register}
          control={control}
          tagList={tagList}
          handleTagAdd={handleTagAdd}
          setTagList={setTagList}
        />
        <NotedBox />
      </div>
      <div className={cx("right")}>
        <h2 className={cx("title")}>질문하기</h2>
        <div className={cx("input-wrap")}>
          <h3 className={cx("title-name")}>질문 제목</h3>
          <BasicInput
            id="title"
            size="md"
            placeholder="질문 제목을 입력해 주세요"
            {...register("title")}
          />
        </div>
        <div className={cx("input-wrap")}>
          <div className={cx("title-wrap")}>
            <h3 className={cx("sub-title")}>코드</h3>
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
                <CodeEditor language={language} handleChange={field.onChange} />
              )}
            />
          </div>
        </div>
        <div className={cx("input-wrap")}>
          <h3 className={cx("sub-title")}>질문 내용</h3>
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
        {/* TODO: submit 로직 */}
        <BasicButton size="lg" onClick={handleSubmit(onValid, onInValid)}>
          질문하기
        </BasicButton>
      </div>
    </div>
  );
};

export { ArticleForm };
