import type { Meta, StoryObj } from "@storybook/react";
import { PlatformTag } from "./PlatformTag";

const meta: Meta<typeof PlatformTag> = {
  component: PlatformTag,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof PlatformTag>;

export const Default: Story = {
  args: {
    platform: "BOJ",
  },
};
