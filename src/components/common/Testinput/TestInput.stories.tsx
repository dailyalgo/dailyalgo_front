import type { Meta, StoryObj } from "@storybook/react";
import TestInput from "./TestInput";

const meta: Meta<typeof TestInput> = {
  title: "components/common/TestInput",
  component: TestInput,
};

export default meta;
type Story = StoryObj<typeof TestInput>;

export const Default: Story = {
  args: {
    id: "userid",
    label: "아이디",
    value: "user@email.com",
    placeholder: "아이디로 사용할 이메일을 입력하세요.",
  },
};

export const UserId: Story = {
  args: {
    id: "userid",
    label: "아이디",
    value: "user@email.com",
    placeholder: "아이디로 사용할 이메일을 입력하세요.",
  },
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};
