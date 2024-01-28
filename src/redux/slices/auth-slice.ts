import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { WritableDraft } from "immer/dist/internal";
import type { UserInfo } from "src/types/user";

type InitialState = {
  value: AuthState;
};

type AuthState = {
  isLogIn: boolean;
  token: string | null;
  userInfo: UserInfo;
};

const initialUserInfo = {
  id: "",
  name: "",
  nickname: "",
  intro: "",
  email: "",
  created_time: new Date().toISOString(),
  organizations: [],
  question_cnt: 0,
  answer_cnt: 0,
  view_cnt: 0,
  follower_cnt: 0,
  following_cnt: 0,
};

const initialState = {
  value: {
    isLogIn: false,
    token: null,
    userInfo: initialUserInfo,
  } as AuthState,
} as InitialState;

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogIn: (State, action: PayloadAction<string>) => {
      return {
        value: {
          isLogIn: true,
          token: action.payload,
          userInfo: State.value.userInfo,
        },
      };
    },
    setLogOut: () => {
      return {
        value: {
          isLogIn: false,
          token: null,
          userInfo: initialUserInfo,
        },
      };
    },
    setUserInfo: (State, action: PayloadAction<Partial<UserInfo>>) => {
      return {
        value: {
          isLogIn: true,
          token: State.value.token,
          userInfo: {
            ...State.value.userInfo,
            ...action.payload,
          },
        },
      } as WritableDraft<InitialState>;
    },
  },
});

export const { setLogIn, setUserInfo, setLogOut } = auth.actions;
export default auth.reducer;
