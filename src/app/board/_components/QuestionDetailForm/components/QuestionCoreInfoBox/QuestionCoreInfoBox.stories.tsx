import type { Meta, StoryObj } from "@storybook/react";
import { QuestionCoreInfoBox } from "./QuestionCoreInfoBox";

const meta: Meta<typeof QuestionCoreInfoBox> = {
  component: QuestionCoreInfoBox,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof QuestionCoreInfoBox>;

export const Default: Story = {
  args: {},
};
