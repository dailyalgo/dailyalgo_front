import type { Meta, StoryObj } from "@storybook/react";
import { CommonDropdown } from "./CommonDropdown";

const meta: Meta<typeof CommonDropdown> = {
  component: CommonDropdown,
  argTypes: {},
  render: (args) => (
    <div
      style={{
        width: "100%",
        height: 500,
      }}
    >
      <CommonDropdown {...args} />
    </div>
  ),
};

export default meta;
type Story = StoryObj<typeof CommonDropdown>;

export const Default: Story = {
  args: {
    options: [
      { id: "option1", label: "Option 1" },
      { id: "option2", label: "Option 2" },
      { id: "option3", label: "Option 3" },
    ],
    initialValue: "option1",
  },
};
