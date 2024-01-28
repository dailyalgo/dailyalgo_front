import type { Meta, StoryObj } from "@storybook/react";
import { CommentItem } from "./CommentItem";

const meta: Meta<typeof CommentItem> = {
  component: CommentItem,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof CommentItem>;

export const Default: Story = {
  args: {},
};
