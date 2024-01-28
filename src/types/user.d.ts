import { QuestionItem } from "./question";

interface UserLoginRes {
  message: string;
  token: string;
}

interface UserInfo {
  id: string;
  name: string;
  nickname: string;
  intro: string;
  email: string;
  created_time: Date | string;
  organizations: {
    name: string;
    code: string;
  }[];
  question_cnt: number;
  answer_cnt: number;
  view_cnt: number;
  follower_cnt: number;
  following_cnt: number;
  is_following?: boolean;
}

interface UserSignUpReq {
  id: string;
  name: string;
  nickname: string;
  password: string;
  email: string;
  num: string;
  organization_code?: string;
}

interface UserFollow {
  id: string;
  nickname: string;
  intro?: string;
  is_following: number;
}

interface UserQuestionsByContent {
  total_cnt: number;
  nextIndex: number;
  question_list: QuestionItem[];
}

export type { UserLoginRes, UserInfo, UserSignUpReq, UserFollow, UserQuestionsByContent };
