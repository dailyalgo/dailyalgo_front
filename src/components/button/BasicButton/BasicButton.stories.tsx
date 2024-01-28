import type { Meta, StoryObj } from "@storybook/react";
import { BasicButton } from "./BasicButton";

const meta: Meta<typeof BasicButton> = {
  component: BasicButton,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof BasicButton>;

export const Default: Story = {
  args: {
    children: "Button",
    disabled: true,
  },
};
