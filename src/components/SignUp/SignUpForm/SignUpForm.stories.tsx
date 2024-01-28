import type { Meta, StoryObj } from "@storybook/react";
import { SignUpForm } from "./SignUpForm";

const meta: Meta<typeof SignUpForm> = {
  component: SignUpForm,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof SignUpForm>;

export const Default: Story = {
  args: {},
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/profile",
        query: {
          user: "santa",
        },
      },
    },
  },
};
