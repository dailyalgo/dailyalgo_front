import type { Meta, StoryObj } from "@storybook/react";
import { CheckboxInput } from "./CheckboxInput";

const meta: Meta<typeof CheckboxInput> = {
  component: CheckboxInput,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof CheckboxInput>;

export const Default: Story = {
  args: {
    labelText: "라벨임",
    id: "id",
    onChange: () => console.log("clicked"),
    disabled: false,
  },
};
