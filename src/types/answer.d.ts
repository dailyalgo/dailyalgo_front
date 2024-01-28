interface AnswerDetail {
  id: number;
  question_id: number;
  title: string;
  user_id: string;
  user_nickname: string;
  language: string;
  code: string;
  content: string;
  like_cnt: number;
  created_time: string;
  modified_time?: string;
  tags: {
    name: string;
  }[];
  is_like: number;
}

interface AnswerCreateReq {
  question_id: number;
  title: string;
  language: string;
  code: string;
  content: string;
  tags: string[];
}

interface AnswerUpdateReq {
  title: string;
  language: string;
  code: string;
  content: string;
  tags: string[];
}

export type { AnswerDetail, AnswerCreateReq, AnswerUpdateReq };
