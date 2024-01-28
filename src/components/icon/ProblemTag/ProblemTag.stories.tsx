import type { Meta, StoryObj } from "@storybook/react";
import { ProblemTag } from "./ProblemTag";

const meta: Meta<typeof ProblemTag> = {
  component: ProblemTag,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ProblemTag>;

export const Default: Story = {
  args: {
    tagName: "timeOut",
  },
};
