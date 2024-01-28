import type { Meta, StoryObj } from "@storybook/react";
import { BasicInput } from "./BasicInput";

const meta: Meta<typeof BasicInput> = {
  component: BasicInput,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof BasicInput>;

export const Default: Story = {
  args: {},
};
