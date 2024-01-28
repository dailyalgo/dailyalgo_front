import type { Meta, StoryObj } from "@storybook/react";
import { ArticleForm } from "./ArticleForm";

const meta: Meta<typeof ArticleForm> = {
  component: ArticleForm,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ArticleForm>;

export const Default: Story = {
  args: {},
};
