import type { Meta, StoryObj } from "@storybook/react";
import { QuestionListItem } from "./QuestionListItem";

const meta: Meta<typeof QuestionListItem> = {
  component: QuestionListItem,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof QuestionListItem>;

export const Default: Story = {
  args: {
    question: {
      id: 1,
      title: "제목",
      user_id: "1",
      user_nickname: "닉네임",
      source: "boj",
      link: "https://www.acmicpc.net/problem/1000",
      type: "시간초과",
      content: "내용",
      language: "python",
      code: "print('hello world')",
      created_time: new Date(),
      modified_time: new Date(),
      view_cnt: 1,
      like_cnt: 1,
      answer_cnt: 1,
      comment_cnt: 1,
      tags: [{ name: "태그" }],
      is_scrap: 1,
      is_like: 1,
    },
  },
};
