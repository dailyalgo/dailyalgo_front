import { createHttpCilent } from "src/lib/http-client";

import type { AnswerDetail, AnswerCreateReq, AnswerUpdateReq } from "src/types/answer";
import type { QuestionComment } from "src/types/question";

import {
  API_ANSWER,
  API_QUESTION_ANSWER,
  API_ANSWER_ITEM,
  API_ANSWER_LIKE,
  API_ANSWER_COMMENT,
  API_ANSWER_COMMENT_ITEM,
  API_ANSWER_COMMENT_ITEM_LIKE,
  API_ANSWER_DETAIL,
} from "../contants";

const instance = createHttpCilent()
  .setBaseUrl(process.env.NEXT_PUBLIC_API_URL ?? "")
  .build();

export const fetchAnswerList = (questionId: number): Promise<AnswerDetail[]> => {
  return instance.get(API_QUESTION_ANSWER(questionId));
};

export const requestCreateAnswer = (requestBody: AnswerCreateReq): Promise<any> => {
  return instance.post(API_ANSWER, requestBody);
};

export const deleteAnswer = (answerId: number): Promise<any> => {
  return instance.delete(API_ANSWER_ITEM(answerId));
};

export const updateAnswer = (answerId: number, requestBody: AnswerUpdateReq): Promise<any> => {
  return instance.put(API_ANSWER_ITEM(answerId), requestBody);
};

export const requestAnswerLike = (answerId: number): Promise<any> => {
  return instance.put(API_ANSWER_LIKE(answerId));
};

export const fetchAnswerCommentList = (answerId: number): Promise<QuestionComment[]> => {
  return instance.get(API_ANSWER_COMMENT(answerId));
};

export const requestPostAnswerComment = (answerId: number, content: string): Promise<any> => {
  return instance.post(API_ANSWER_COMMENT(answerId), { content });
};

export const deleteAnswerComment = (commentId: number): Promise<any> => {
  return instance.delete(API_ANSWER_COMMENT_ITEM(commentId));
};

export const requestUpdateAnswerComment = (commentId: number, content: string): Promise<any> => {
  return instance.put(API_ANSWER_COMMENT_ITEM(commentId), { content });
};

export const requestLikeAnswerComment = (commentId: number): Promise<any> => {
  return instance.put(API_ANSWER_COMMENT_ITEM_LIKE(commentId));
};

export const fetchAnswerDetail = (answerId: number): Promise<AnswerDetail> => {
  return instance.get(API_ANSWER_DETAIL(answerId));
};
