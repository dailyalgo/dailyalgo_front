import type { Meta, StoryObj } from "@storybook/react";
import { QuestionHeader } from "./QuestionHeader";

const meta: Meta<typeof QuestionHeader> = {
  component: QuestionHeader,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof QuestionHeader>;

export const Default: Story = {
  args: {},
};
