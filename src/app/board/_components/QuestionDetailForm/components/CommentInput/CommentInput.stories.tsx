import type { Meta, StoryObj } from "@storybook/react";
import { CommentInput } from "./CommentInput";

const meta: Meta<typeof CommentInput> = {
  component: CommentInput,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof CommentInput>;

export const Default: Story = {
  args: {},
};
