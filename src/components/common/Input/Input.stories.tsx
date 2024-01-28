import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";

export default {
  component: Input,
  argTypes: {},
} as Meta<typeof Input>;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {},
};
