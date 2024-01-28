import type { Meta, StoryObj } from "@storybook/react";
import { TimeAgo } from "./TimeAgo";

const meta: Meta<typeof TimeAgo> = {
  component: TimeAgo,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof TimeAgo>;

export const Default: Story = {
  args: {
    time: "2023-08-14 17:30:00",
  },
};
