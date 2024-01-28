import type { Meta, StoryObj } from "@storybook/react";
import { UserProfileThumbnail } from "./UserProfileThumbnail";

const meta: Meta<typeof UserProfileThumbnail> = {
  component: UserProfileThumbnail,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof UserProfileThumbnail>;

export const Default: Story = {
  args: {
    userName: "등푸른생선",
  },
};
