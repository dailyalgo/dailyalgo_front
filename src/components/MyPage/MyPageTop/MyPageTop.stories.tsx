import type { Meta, StoryObj } from "@storybook/react";
import { MyPageTop } from "./MyPageTop";

const meta: Meta<typeof MyPageTop> = {
  component: MyPageTop,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof MyPageTop>;

export const Default: Story = {
  args: {
    clickBtnHandler: () => {},
    isEdited: false,
    isFollowing: false,
    pageType: "user",
    userInfo: {
      id: "1",
      name: "이름",
      nickname: "닉네임",
      intro: "소개",
      email: "이메일",
      created_time: new Date(),
      organizations: [],
      question_cnt: 0,
      answer_cnt: 0,
      view_cnt: 0,
      follower_cnt: 0,
      following_cnt: 0,
      is_following: false,
    },
  },
};
