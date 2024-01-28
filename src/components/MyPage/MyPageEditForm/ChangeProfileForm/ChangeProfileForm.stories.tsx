import type { Meta, StoryObj } from "@storybook/react";
import { ChangeProfileForm } from "./ChangeProfileForm";

const meta: Meta<typeof ChangeProfileForm> = {
  component: ChangeProfileForm,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ChangeProfileForm>;

export const Default: Story = {
  args: {},
};
