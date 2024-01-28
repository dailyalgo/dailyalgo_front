import type { Meta, StoryObj } from "@storybook/react";
import { RadioInput } from "./RadioInput";

const meta: Meta<typeof RadioInput> = {
  component: RadioInput,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof RadioInput>;

export const Default: Story = {
  args: {
    labelText: "Radio Button",
  },
};
