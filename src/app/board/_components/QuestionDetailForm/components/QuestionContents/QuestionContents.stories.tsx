import type { Meta, StoryObj } from "@storybook/react";
import { QuestionContents } from "./QuestionContents";

const meta: Meta<typeof QuestionContents> = {
  component: QuestionContents,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof QuestionContents>;

export const Default: Story = {
  args: {},
};
