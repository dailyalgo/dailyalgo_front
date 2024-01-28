import { createHttpCilent } from "src/lib/http-client";
import type {
  QuestionDetail,
  QuestionCreateRequestBody,
  HomeQuestionListRes,
  HomeQuestionListReq,
  QuestionComment,
} from "src/types/question";
import {
  API_QUESTION,
  API_QUESTION_ITEM,
  API_QUESTION_LIKE,
  API_QUESTION_SCRAP,
  API_QUESTION_COMMENT,
  API_QUESTION_COMMENT_ITEM,
  API_QUESTION_COMMENT_ITEM_LIKE,
} from "../contants";

interface QeustionPostRes {
  question_id: number;
}

const instance = createHttpCilent()
  .setBaseUrl(process.env.NEXT_PUBLIC_API_URL ?? "")
  .build();

export const requestPostQuestion = (
  requestBody: QuestionCreateRequestBody
): Promise<QeustionPostRes> => {
  return instance.post(API_QUESTION, requestBody);
};

export const fetchQuestionList = (
  requestBody: HomeQuestionListReq
): Promise<HomeQuestionListRes> => {
  return instance.get(API_QUESTION, { params: requestBody });
};

export const requestUpdateQuestion = (
  questionId: number,
  requestBody: QuestionCreateRequestBody
): Promise<any> => {
  return instance.put(API_QUESTION_ITEM(questionId), requestBody);
};

export const fetchQuestionDetail = (questionId: number): Promise<QuestionDetail> => {
  return instance.get(API_QUESTION_ITEM(questionId));
};

export const deleteQuestion = (questionId: number): Promise<any> => {
  return instance.delete(API_QUESTION_ITEM(questionId));
};

export const requestScrapQuestion = (questionId: number): Promise<any> => {
  return instance.put(API_QUESTION_SCRAP(questionId));
};

export const requestLikeQuestion = (questionId: number): Promise<any> => {
  return instance.put(API_QUESTION_LIKE(questionId));
};

export const requestPostComment = (questionId: number, content: string): Promise<any> => {
  return instance.post(API_QUESTION_COMMENT(questionId), { content });
};

export const fetchCommentList = (questionId: number): Promise<QuestionComment[]> => {
  return instance.get(API_QUESTION_COMMENT(questionId));
};

export const requestLikeComment = (commentId: number): Promise<any> => {
  return instance.put(API_QUESTION_COMMENT_ITEM_LIKE(commentId));
};

export const deleteComment = (commentId: number): Promise<any> => {
  return instance.delete(API_QUESTION_COMMENT_ITEM(commentId));
};

export const requestUpdateComment = (commentId: number, content: string): Promise<any> => {
  return instance.put(API_QUESTION_COMMENT_ITEM(commentId), { content });
};
