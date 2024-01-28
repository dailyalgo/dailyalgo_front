// === User ===
export const API_UPDATE_USER = "/user/";
export const API_UPDATE_PASSWORD = "/user/password/";
export const API_CHECK_ID = "/user/check/id/";
export const API_CHECK_NICKNAME = "/user/check/nickname/";
export const API_SEND_SIGN_UP_EMAIL = "/user/sign_up/email/";
export const API_CEHCK_SIGN_UP_CERTIFICATION_NUM = "/user/sign_up/validate/";

export const API_SEND_FIND_EMAIL = "/user/find/email/";
export const API_CHECK_FIND_CERTIFICATION_NUM = "/user/find/validate/";
export const API_SEND_PASSWORD_EMAIL = "/user/password/reset/email/";
export const API_CHECK_PASSWORD_CERTIFICATION_NUM = "/user/password/reset/validate/";
export const API_RESET_PASSWORD = "/user/password/reset/";

export const API_SIGN_UP = "/user/sign_up/";
export const API_SIGN_IN = "/user/sign_in/";

export const API_FIND_ID_BY_EMAIL = (email: string) => {
  return `/user/find/${email}/`;
};

export const API_USER_INFO = (id?: string) => {
  return id ? `/user/${id}/` : "/user/";
};

export const API_USER_FOLLOWER = (id: string) => {
  return `/user/${id}/follower/`;
};

export const API_USER_FOLLOWING = (id: string) => {
  return `/user/${id}/following/`;
};

export const API_USER_FOLLOW = (id: string) => {
  return `/user/${id}/follow/`;
};

export const API_USER_QUESTIONS_BY_CONTENT = (id: string, content: string) => {
  return `/user/${id}/${content}/`;
};

export const API_USER_TOKEN = "/user/token/";

// === Organization ===
export const API_ORGANIGATION = "/organization/";
export const API_SEARCH_ORGANIZATION = "/organization/code";

export const API_JOIN_ORGANIZATION = (code: string) => {
  return `/organization/${code}/join/`;
};

export const API_WITHDRAW_ORGANIZATION = (code: string) => {
  return `/organization/${code}/withdraw/`;
};

// === Question ===
export const API_QUESTION = "/question/";

export const API_QUESTION_ITEM = (id: number) => {
  return `/question/${id}/`;
};

export const API_QUESTION_SCRAP = (id: number) => {
  return `/question/${id}/scrap/`;
};

export const API_QUESTION_LIKE = (id: number) => {
  return `/question/${id}/like/`;
};

export const API_QUESTION_COMMENT = (id: number) => {
  return `/question/${id}/comment/`;
};

export const API_QUESTION_COMMENT_ITEM = (commentId: number) => {
  return `/question/comment/${commentId}/`;
};

export const API_QUESTION_COMMENT_ITEM_LIKE = (commentId: number) => {
  return `/question/comment/${commentId}/like/`;
};

// === Answer ===
export const API_ANSWER = "/answer/";

export const API_ANSWER_ITEM = (answerId: number) => {
  return `/answer/${answerId}/`;
};

export const API_QUESTION_ANSWER = (questionId: number) => {
  return `/answer/${questionId}/`;
};

export const API_ANSWER_LIKE = (answerId: number) => {
  return `/answer/${answerId}/like/`;
};

export const API_ANSWER_COMMENT = (answerId: number) => {
  return `/answer/${answerId}/comment/`;
};

export const API_ANSWER_COMMENT_ITEM = (commentId: number) => {
  return `/answer/comment/${commentId}/`;
};

export const API_ANSWER_COMMENT_ITEM_LIKE = (commentId: number) => {
  return `/answer/comment/${commentId}/like/`;
};

export const API_ANSWER_DETAIL = (answerId: number) => {
  return `/answer/detail/${answerId}/`;
};

// === Notification ===
export const API_NOTIFICATION = "/notification/";

export const API_NOTIFICATION_ITEM = (id: number) => {
  return `/notification/${id}/`;
};

export const API_NOTIFICATION_COUNT = "/notification/count/";

export const API_NOTIFICATION_READ_ALL = "/notification/readAll/";
