import type { Meta, StoryObj } from "@storybook/react";
import { QuestionInfoBox } from "./QuestionInfoBox";

const meta: Meta<typeof QuestionInfoBox> = {
  component: QuestionInfoBox,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof QuestionInfoBox>;

export const Default: Story = {
  args: {},
};
