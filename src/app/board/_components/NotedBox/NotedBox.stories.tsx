import type { Meta, StoryObj } from "@storybook/react";
import { NotedBox } from "./NotedBox";

const meta: Meta<typeof NotedBox> = {
  component: NotedBox,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof NotedBox>;

export const Default: Story = {
  args: {},
};
