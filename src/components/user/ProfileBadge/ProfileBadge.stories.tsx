import type { Meta, StoryObj } from "@storybook/react";
import { ProfileBadge } from "./ProfileBadge";

const meta: Meta<typeof ProfileBadge> = {
  component: ProfileBadge,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ProfileBadge>;

export const Default: Story = {
  args: {
    size: 24,
  },
};
